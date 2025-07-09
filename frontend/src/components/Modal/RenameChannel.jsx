import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Button,
  Spinner,
  Modal,
  Form,
} from 'react-bootstrap';
import { selectors as channelSelectors } from '../../store/channelSlice.js';
import { selectToken } from '../../store/authSlice.js';
import { setClose } from '../../store/modalSlice.js';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';

const RenameChannel = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const channels = useSelector(channelSelectors.selectAll);
  const token = useSelector(selectToken);
  const { type, ChannelId } = useSelector((state) => state.modal);

  const channelToRename = channels.find((c) => c.id === ChannelId);
  const existingNames = channels.map((c) => c.name);
  const initialChannelName = channelToRename ? channelToRename.name : '';

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле')
      .notOneOf(existingNames, 'Должно быть уникальным'), // Проверяем уникальность
  });

  const formik = useFormik({
    initialValues: {
      name: initialChannelName,
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await axios.patch(`/api/v1/channels/${ChannelId}`, { name: values.name.trim() }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        formik.resetForm();
        dispatch(setClose());

      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 500) {
            console.error('Ошибка сети или сервера:', error);
          } else if (error.response.status === 409) {
            formik.setErrors({ name: 'Такой канал уже существует' });
          } else {
            console.error('Произошла ошибка при переименовании канала:', error);
          }
        } else {
          console.error('Неизвестная ошибка:', error);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  const handleModalClose = () => {
    formik.resetForm();
    dispatch(setClose());
  };

  return (
    <Modal centered show={type === 'rename'} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Control
                ref={inputRef}
                onChange={formik.handleChange}
                value={formik.values.name}
                name="name"
                id="name"
                aria-label="Имя канала"
                type="text"
                isInvalid={formik.touched.name && !!formik.errors.name}
              />
              <Form.Label hidden htmlFor="name">Имя канала</Form.Label>
              <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Container className='d-flex justify-content-end p-0'>
              <Button type='button' variant="secondary" className='me-2' onClick={handleModalClose} disabled={formik.isSubmitting}>
                Отменить
              </Button>
              <Button type='submit' variant="primary" onClick={formik.handleSubmit} disabled={formik.isSubmitting}>
                {formik.isSubmitting && (
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden='true'
                    className="me-1"
                  />
                )}
                {formik.isSubmitting ? 'Переименование...' : 'Отправить'}
              </Button>
            </Container>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;