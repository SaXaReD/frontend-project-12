import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setInitialMessages,
  getMessagesForChannel,
  getMessageCountForChannel,
} from '../store/messageSlice.js';
import { selectors as channelSelectors } from '../store/channelSlice.js';
import {
  Container,
  Col,
  Form,
  Button,
  Image,
  InputGroup
} from 'react-bootstrap';

import axios from 'axios';

const Messages = ({ token }) => {
  const redir = useNavigate();
  const dispatch = useDispatch();
  const messagesBoxRef = useRef(null);

  const currentChannelId = useSelector((state) => state.channels.currentChannel.id);
  const allChannels = useSelector(channelSelectors.selectAll);
  const currentChannel = allChannels.find((c) => c.id === currentChannelId);

  const messagesForCurrentChannel = useSelector((state) =>
    getMessagesForChannel(state, currentChannelId)
  );

  const messagesCount = useSelector((state) =>
    getMessageCountForChannel(state, currentChannelId)
  );

  useEffect(() => {
    if (messagesForCurrentChannel.length > 0 && messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  }, [messagesForCurrentChannel]);

  useEffect(() => {
    if (!token) {
      redir('/login');
      return;
    }

    axios.get('/api/v1/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        dispatch(setInitialMessages(response.data));
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          redir('/login');
        } else if (error.response && error.response.status === 500) {
          console.error('Нет соединения с сервером:', error);
        } else {
          console.error('Произошла ошибка при загрузке сообщений:', error);
        }
      });
  }, [token, dispatch, redir]);

  return (
    <Col className='p-0 h-100 d-flex flex-column'>
      <Container className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b># {currentChannel ? currentChannel.name : 'general'}</b>
        </p>
        <span className="text-muted">{messagesCount} сообщений</span>
      </Container>
      <Container
        className="mt-auto px-5 py-3"
        ref={messagesBoxRef}
      >
        {messagesForCurrentChannel.map((message) => (
          <div key={message.id} className="text-break mb-2">
            <b>{message.username}</b>: {message.body}
          </div>
        ))}
        <Form className='py-1 border rounded-2' >
          <InputGroup hasValidation>
            <Form.Control name='body' type="text" placeholder="Введите сообщение..." className='border-0 p-0 ps-2' />
            <Button variant='none' type="button" className="btn-group-vertical" disabled>
              <Image src='/images/svg/send.svg'/>
              <span className="visually-hidden">Отправить</span>
            </Button>
          </InputGroup>
        </Form>
      </Container>
    </Col>
  );
};

export default Messages;