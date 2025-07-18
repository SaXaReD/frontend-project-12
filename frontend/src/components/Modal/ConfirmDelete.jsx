import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Spinner,
  Modal,
  Container,
} from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { setClose } from '../../store/slices/modalSlice.js'
import { useRemoveChannelMutation, useRemoveMessageMutation, useGetMessagesQuery } from '../../store/services/chatApi'

const ConfirmDelete = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const notifySuccess = () => toast.success(t('toast.success.channelRemoved'))
  const notifyError = () => toast.error(t('toast.error.network'))

  const { type, ChannelId } = useSelector(state => state.modal)

  const [removeChannel, { isLoading: isDeleting }] = useRemoveChannelMutation()
  const [removeMessage] = useRemoveMessageMutation()

  const { data: allMessages = [] } = useGetMessagesQuery()

  const handleDeleteConfirmed = async () => {
    try {
      await removeChannel({ id: ChannelId })
      const messagesToDeleteIds = allMessages
        .filter(message => message.channelId === ChannelId)
        .map(message => message.id)
      if (messagesToDeleteIds.length > 0) {
        await Promise.allSettled(
          messagesToDeleteIds.map(id => removeMessage({ id }).unwrap(),
          ),
        )
      }
      dispatch(setClose())
      notifySuccess()
    }
    catch (error) {
      console.error('Error deleting channel:', error)
      notifyError()
    }
  }

  const handleModal = () => {
    dispatch(setClose())
  }

  return (
    <Modal centered show={type === 'delete'} onHide={() => dispatch(setClose())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.removeChannel.body')}</p>
        <Container className="d-flex justify-content-end">
          <Button type="button" variant="secondary" className="me-2" onClick={handleModal} disabled={isDeleting}>
            {t('modal.removeChannel.cancelBtn')}
          </Button>
          <Button type="submit" variant="danger" onClick={handleDeleteConfirmed} disabled={isDeleting}>
            {isDeleting && (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
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

export default ConfirmDelete
