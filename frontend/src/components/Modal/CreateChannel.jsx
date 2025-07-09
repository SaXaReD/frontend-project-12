import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Button,
  Spinner,
  Modal,
  Form,
} from 'react-bootstrap';
import {
  addChannel,
  setCurrentChannel,
  selectors as channelSelectors,
} from '../../store/channelSlice.js';
import { selectToken } from '../../store/authSlice.js';
import { setClose } from '../../store/modalSlice.js';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';

const CreateChannel = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const channels = useSelector(channelSelectors.selectAll);
  const token = useSelector(selectToken);
  const existingNames = Object.values(channels).map((el) => el.name);
  const { type } = useSelector((state) => state.modal);

    const validationSchema = yup.object().shape({
      name: yup
        .string()
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .required('Обязательное поле')
        .notOneOf(existingNames, 'Должно быть уникальным'),
    });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post('/api/v1/channels', values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(addChannel(response.data));
        dispatch(setCurrentChannel(response.data.id));
        formik.resetForm();
      } catch (error) {
        if (error.response && error.response.status === 500) {
          console.log(error, 'Нет соединения с сервером');
        } else {
          console.log(error, 'Произошла ошибка при загрузке каналов');
        }
      } finally {
        setSubmitting(false);
        dispatch(setClose());
      }
    }
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleModal = () => {
    formik.resetForm();
    dispatch(setClose());
  };

  return (
    <Modal centered show={type === 'create'} onHide={() => dispatch(setClose())}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Control
                ref={inputRef}
                className='mb-2'
                onChange={formik.handleChange}
                value={formik.values.name}
                name="name"
                id="name"
                aria-label="name"
                type="text"
                isInvalid={formik.touched.name && formik.errors.name}
              />
              <Form.Label hidden htmlFor="name">Имя канала</Form.Label>
              <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
              <Container className='d-flex justify-content-end p-0'>
                <Button type='button' variant="secondary" className='me-2' onClick={handleModal}>
                  Отменить
                </Button>
                <Button type='submit' variant="primary" onClick={formik.handleSubmit} disabled={formik.isSubmitting}>
                  {formik.isSubmitting && <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden='true'
                  />
                  }
                  {!formik.isSubmitting ? 'Отправить' : 'Загрузка...'}
                </Button>
              </Container>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
  )
}

export default CreateChannel;