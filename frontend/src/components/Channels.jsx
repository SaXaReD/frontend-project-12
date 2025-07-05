import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addChannels,
  setCurrentChannel,
  selectors as channelSelectors
} from '../store/channelSlice.js';
import {
  Container,
  Col,
  Button,
  Image,
  Nav
} from 'react-bootstrap';
import axios from 'axios';

const Channels = ({ token }) => {
  const lastChannelItemRef = useRef(null);
  const dispatch = useDispatch();
  const redir = useNavigate();

  const channels = useSelector(channelSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannel.id);

  const scrollToLastChannelItem = () => {
    if (lastChannelItemRef.current) {
      lastChannelItemRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToLastChannelItem();
    if (channels.length > 0 && !channels.some(channel => channel.id === currentChannelId)) {
      dispatch(setCurrentChannel(channels[0].id));
    }
  }, [channels, currentChannelId, dispatch]);

  useEffect(() => {
    axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      dispatch(addChannels(response.data));
    }).catch((error) => {
      if (error.response && error.response.status === 401) {
        redir('/login');
      } else if (error.response && error.response.status === 500) {
        console.log(error, 'Нет соединения с сервером');
      } else {
        console.log(error, 'Произошла ошибка при загрузке каналов');
      }
    });
  }, [token, dispatch, redir]);

  return (
    <Col md={2} className='border-end px-0 bg-light flex-column h-100 d-flex'>
      <Container className='d-flex mt-1 justify-content-between mb-2 pe-2 p-4'>
        <b>Каналы</b>
        <Button type="button" variant='none' className="p-0 btn-group-vertical">
          <Image src='/images/svg/plus.svg' />
        </Button>
      </Container>
      <Nav variant='pills' fill className='d-flex flex-column mx-2' activeKey={currentChannelId} onSelect={(selectedKey) => dispatch(setCurrentChannel(selectedKey))}>
        {channels.map((channel, index) => (
          <Nav.Item key={channel.id}>
            <Nav.Link
              className={`
                text-start rounded-0
                ${currentChannelId === channel.id ? 'bg-secondary text-white' : 'bg-transparent text-dark'}
                `}
              eventKey={channel.id}
              ref={index === channels.length - 1 ? lastChannelItemRef : null}
            >
              {channel.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  );
}

export default Channels;