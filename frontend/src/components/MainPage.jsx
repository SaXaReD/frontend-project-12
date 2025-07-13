import { Container, Row, Tab } from 'react-bootstrap'
import Channels from './Channels'
import Messages from './Messages'

const MainPage = () => (
  <Container className="container h-100 my-4 overflow-hidden rounded shadow">
    <Tab.Container defaultActiveKey="1" className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Tab.Container>
  </Container>
)

export default MainPage
