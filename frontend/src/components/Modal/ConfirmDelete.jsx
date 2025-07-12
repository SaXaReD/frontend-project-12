import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Spinner,
  Modal,
  Container,
} from 'react-bootstrap';
import { selectToken } from '../../store/authSlice.js';
import { setClose } from '../../store/modalSlice.js';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const ConfirmDelete = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isDeleting, setIsDeleting] = useState(false);
  const notifySuccess = () => toast.success(t('toast.success.channelRemoved'));
  const notifyError = () => toast.error(t('toast.error.network'));

  const token = useSelector(selectToken);
  const { type, ChannelId } = useSelector((state) => state.modal);

  const handleDeleteConfirmed = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/api/v1/channels/${ChannelId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setClose());
      notifySuccess();
    } catch (error) {
      notifyError();
    } finally {
      setIsDeleting(false);
    }
  };

  const handleModal = () => {
    dispatch(setClose());
  };

  return (
    <Modal centered show={type === 'delete'} onHide={() => dispatch(setClose())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.removeChannel.body')}</p>
        <Container className='d-flex justify-content-end'>
          <Button type='button' variant="secondary" className='me-2' onClick={handleModal} disabled={isDeleting}>
          {t('modal.removeChannel.cancelBtn')}
          </Button>
          <Button type='submit' variant="danger" onClick={handleDeleteConfirmed} disabled={isDeleting}>
            {isDeleting && (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden='true'
                className="me-1"
              />
            )}
            {isDeleting ? t('modal.removeChannel.loading') : t('modal.removeChannel.confirmBtn')}
          </Button>
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default ConfirmDelete;