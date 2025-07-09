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

const ConfirmDelete = () => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

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

    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 500) {
        console.error('Нет соединения с сервером:', error);
        alert('Ошибка: Нет соединения с сервером.');
      } else {
        console.error('Произошла ошибка при удалении канала:', error);
        alert('Ошибка: Не удалось удалить канал.');
      }
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
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Вы уверены, что хотите удалить этот канал?</p>
        <Container className='d-flex justify-content-end'>
          <Button type='button' variant="secondary" className='me-2' onClick={handleModal} disabled={isDeleting}>
            Отменить
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
            {isDeleting ? 'Удаление...' : 'Удалить'}
          </Button>
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default ConfirmDelete;