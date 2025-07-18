import {
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react'
import { useSelector } from 'react-redux'
import {
  Container,
  Col,
  Form,
  Button,
  InputGroup,
  Spinner,
} from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import leoProfanity from 'leo-profanity'
import { selectUsername } from '../store/slices/authSlice.js'
import { useGetMessagesQuery, useAddMessageMutation, useGetChannelsQuery } from '../store/services/chatApi'
import { selectActiveChannelId } from '../store/slices/activeChannelSlice.js'

const Messages = () => {
  const { t } = useTranslation()
  const messagesBoxRef = useRef(null)
  const messageFocusRef = useRef(null)
  const [messageText, setMessageText] = useState('')
  const token = useSelector(state => state.auth.token)

  const {
    data: allMessages,
    isLoading: messagesLoading,
  } = useGetMessagesQuery(undefined, { skip: !token })

  const { data: allChannels = [] } = useGetChannelsQuery()

  const [addMessage, { isLoading: isSendingMessage }] = useAddMessageMutation()

  const currentChannelId = useSelector(selectActiveChannelId)

  const currentChannel = useMemo(() => (
    allChannels.find(c => c.id === currentChannelId)
  ), [allChannels, currentChannelId])

  const currentMessages = useMemo(() => {
    if (!allMessages) return []
    return allMessages.filter(message => message.channelId === currentChannelId)
  }, [allMessages, currentChannelId])

  const count = currentMessages.length
  const messagesCountText = t('messageCounter', { count })

  const username = useSelector(selectUsername)

  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight
    }
  }, [currentMessages])

  useEffect(() => {
    if (messageFocusRef.current) {
      messageFocusRef.current.focus()
    }
  }, [currentChannelId])

  const handleSendMessage = async (e) => {
    e.preventDefault()

    const trimmedMessage = messageText.trim()
    if (!trimmedMessage) {
      return
    }

    const filteredName = leoProfanity.clean(trimmedMessage)

    const newMessageData = {
      body: filteredName,
      channelId: currentChannelId,
      username,
    }

    try {
      await addMessage(newMessageData).unwrap()
      setMessageText('')
    }
    catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  return (
    <Col className="p-0 h-100 d-flex flex-column">
      <Container className="bg-light p-3 mb-4 shadow-sm small">
        <p className="m-0">
          <span># </span>
          <b>{currentChannel ? currentChannel.name : t('channelName')}</b>
        </p>
        <span className="text-muted">{t(messagesCountText)}</span>
      </Container>
      {messagesLoading
        ? (
            <Container className="d-flex justify-content-center align-items-center h-100">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">{t('messages.loading')}</span>
              </Spinner>
            </Container>
          )
        : (
            <Container
              className="overflow-auto px-5"
              ref={messagesBoxRef}
            >
              {currentMessages.map(message => (
                <Container key={message.id} className="text-break mb-2">
                  <b>{message.username}</b>
                  {': '}
                  {message.body}
                </Container>
              ))}
            </Container>
          )}
      <Container className="mt-auto px-5 py-3">
        <Form onSubmit={handleSendMessage} className="py-1 border rounded-2">
          <InputGroup hasValidation>
            <Form.Control
              ref={messageFocusRef}
              name="body"
              type="text"
              placeholder={t('messages.placeholder')}
              className="border-0 p-0 ps-2"
              value={messageText}
              aria-label={t('messages.label')}
              onChange={e => setMessageText(e.target.value)}
            />
            <Button
              variant="none"
              type="submit"
              className="btn-group-vertical"
              disabled={!messageText.trim() || isSendingMessage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-square" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
              </svg>
              <span className="visually-hidden">{t('messages.send')}</span>
            </Button>
          </InputGroup>
        </Form>
      </Container>
    </Col>
  )
}

export default Messages
