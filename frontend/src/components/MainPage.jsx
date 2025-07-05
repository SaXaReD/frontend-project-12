import { Container, Row, Col, Tab } from 'react-bootstrap';
import Channels from './Channels';
import Messages from './Messages';

const MainPage = () => {
  const token = localStorage.getItem('token');

  return (
    <Container className='container h-100 my-4 overflow-hidden rounded shadow'>
      <Tab.Container defaultActiveKey="1" className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className='h-100 bg-white flex-md-row'>
          <Channels token={token} />
          <Messages token={token} />
        </Row>
      </Tab.Container>
    </Container>
  )
};

export default MainPage;

