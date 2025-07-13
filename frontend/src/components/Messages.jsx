import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setInitialMessages,
  getMessagesForChannel,
  addOneMessage,
} from '../store/messageSlice.js';
import { selectors as channelSelectors } from '../store/channelSlice.js';
import { selectToken, selectUsername } from '../store/authSlice';
import socket from '../socket.js';
import {
  Container,
  Col,
  Form,
  Button,
  Image,
  InputGroup,
  Spinner
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import API_ROUTES from '../routes/routes.js';

const Messages = () => {
  const redir = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const messagesBoxRef = useRef(null);
  const messageFocusRef = useRef(null);
  const [messageText, setMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const notifyError = () => toast.error(t('toast.error.network'));

  const currentChannelId = useSelector((state) => state.channels.currentChannel.id);
  const allChannels = useSelector(channelSelectors.selectAll);
  const currentChannel = allChannels.find((c) => c.id === currentChannelId);

  const currentMessages = useSelector((state) =>
    getMessagesForChannel(state, currentChannelId)
  );

  const messagesCount = useMemo(() => {
    const count = currentMessages.length;
    const getEndOfMessage = (n) => {
      const lastTwo = n % 100;
      const lastOne = n % 10;

      if (lastTwo >= 11 && lastTwo <= 14) return 'many_messages';
      if (lastOne === 1) return 'one_message';
      if (lastOne >= 2 && lastOne <= 4) return 'few_messages';
      return 'many_messages';
    };
    return t(`messageCounter.${getEndOfMessage(count)}`, { count });
  }, [currentMessages, t]);

  const username = useSelector(selectUsername);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  }, [currentMessages]);

  useEffect(() => {
    if (messageFocusRef.current) {
      messageFocusRef.current.focus();
    }
  }, [currentChannelId]);

  useEffect(() => {
    setIsLoading(true);
    axios.get(API_ROUTES.messages.list(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        dispatch(setInitialMessages(response.data));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response.status === 401) {
          redir('/login');
        }
      });
  }, [token, dispatch, redir, t]);

  const handleNewMessage = useCallback((payload) => {
    dispatch(addOneMessage(payload));
  }, [dispatch]);

  useEffect(() => {
    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [handleNewMessage]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const trimmedMessage = messageText.trim();
    if (!trimmedMessage) {
      return;
    }

    const filteredName = leoProfanity.clean(trimmedMessage);

    if (filteredName !== trimmedMessage) {
      toast.error(t('messages.error.profanity'));
      return;
    }

    const newMessageData = {
      body: trimmedMessage,
      channelId: currentChannelId,
      username: username,
    };

    axios.post(API_ROUTES.messages.list(), newMessageData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => setMessageText(''))
      .catch(() => {
        notifyError();
      });
  };

  return (
    <Col className='p-0 h-100 d-flex flex-column'>
      <Container className="bg-light p-3 mb-4 shadow-sm small">
        <p className="m-0">
          <b># {currentChannel ? currentChannel.name : t('channelName')}</b>
        </p>
        <span className="text-muted">{messagesCount}</span>
      </Container>
      {isLoading ? (
        <Container className="d-flex justify-content-center align-items-center h-100">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">{t('messages.loading')}</span>
          </Spinner>
        </Container>
      ) : (
        <Container
          className="overflow-auto px-5"
          ref={messagesBoxRef}
        >
          {currentMessages.map((message) => (
            <Container key={message.id} className="text-break mb-2">
              <b>{message.username}</b>: {message.body}
            </Container>
          ))}
        </Container>
      )}
      <Container className="mt-auto px-5 py-3">
        <Form onSubmit={handleSendMessage} className='py-1 border rounded-2'>
          <InputGroup hasValidation>
            <Form.Control
              ref={messageFocusRef}
              name='body'
              type="text"
              placeholder={t('messages.placeholder')}
              className='border-0 p-0 ps-2'
              value={messageText}
              aria-label={t('messages.label')}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <Button variant='none' type="submit" className="btn-group-vertical" disabled={!messageText.trim()}>
              <Image src='/images/svg/send.svg' />
              <span className="visually-hidden">{t('messages.send')}</span>
            </Button>
          </InputGroup>
        </Form>
      </Container>
    </Col>
  );
};

export default Messages;