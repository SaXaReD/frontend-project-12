import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setInitialMessages,
  getMessagesForChannel,
  getMessageCountForChannel,
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

import axios from 'axios';

const Messages = () => {
  const redir = useNavigate();
  const dispatch = useDispatch();
  const messagesBoxRef = useRef(null);
  const messageFocusRef = useRef(null);
  const [messageText, setMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const currentChannelId = useSelector((state) => state.channels.currentChannel.id);
  const allChannels = useSelector(channelSelectors.selectAll);
  const currentChannel = allChannels.find((c) => c.id === currentChannelId);

  const messagesForCurrentChannel = useSelector((state) =>
    getMessagesForChannel(state, currentChannelId)
  );

  const messagesCount = useSelector((state) =>
    getMessageCountForChannel(state, currentChannelId)
  );

  const username = useSelector(selectUsername);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  }, [messagesForCurrentChannel]);

  useEffect(() => {
    if (messageFocusRef.current) {
      messageFocusRef.current.focus();
    }
  }, [currentChannelId]);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/v1/messages', {
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
        if (error.response && error.response.status === 401) {
          redir('/login');
        } else if (error.response && error.response.status === 500) {
          console.error('Нет соединения с сервером:', error);
        } else {
          console.error('Произошла ошибка при загрузке сообщений:', error);
        }
      });
  }, [token, dispatch, redir]);

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

    const newMessageData = {
      body: trimmedMessage,
      channelId: currentChannelId,
      username: username,
    };

    axios.post('/api/v1/messages', newMessageData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => setMessageText(''))
      .catch((error) => console.error('Ошибка при отправке сообщения:', error));
  };

  return (
    <Col className='p-0 h-100 d-flex flex-column'>
      <Container className="bg-light p-3 mb-4 shadow-sm small">
        <p className="m-0">
          <b># {currentChannel ? currentChannel.name : 'general'}</b>
        </p>
        <span className="text-muted">{messagesCount} сообщений</span>
      </Container>
      {isLoading ? (
        <Container className="d-flex justify-content-center align-items-center h-100">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Загрузка сообщений...</span>
          </Spinner>
        </Container>
      ) : (
        <Container
          className="overflow-auto px-5"
          ref={messagesBoxRef}
        >
          {messagesForCurrentChannel.map((message) => (
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
              placeholder="Введите сообщение..."
              className='border-0 p-0 ps-2'
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <Button variant='none' type="submit" className="btn-group-vertical" disabled={!messageText.trim()}>
              <Image src='/images/svg/send.svg' />
              <span className="visually-hidden">Отправить</span>
            </Button>
          </InputGroup>
        </Form>
      </Container>
    </Col>
  );
};

export default Messages;