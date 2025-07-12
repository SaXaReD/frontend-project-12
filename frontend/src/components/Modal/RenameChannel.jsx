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
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const RenameChannel = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const notifySuccess = () => toast.success(t('toast.success.channelRenamed'));
  const notifyError = () => toast.error(t('toast.error.network'));

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
      .min(3, t('error.minLengthUsername'))
      .max(20, t('error.maxLength'))
      .required(t('error.requiredField'))
      .notOneOf(existingNames, t('error.uniqueName')),
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
        notifySuccess();
      } catch (error) {
        notifyError();
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
        <Modal.Title>{t('modal.renameChannel.title')}</Modal.Title>
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
                aria-label={t('modal.renameChannel.body')}
                type="text"
                isInvalid={formik.touched.name && !!formik.errors.name}
              />
              <Form.Label hidden htmlFor="name">{t('modal.renameChannel.body')}</Form.Label>
              <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Container className='d-flex justify-content-end p-0'>
              <Button type='button' variant="secondary" className='me-2' onClick={handleModalClose} disabled={formik.isSubmitting}>
                {t('modal.renameChannel.cancelBtn')}
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
                {formik.isSubmitting ? t('modal.renameChannel.loading') : t('modal.renameChannel.confirmBtn')}
              </Button>
            </Container>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;