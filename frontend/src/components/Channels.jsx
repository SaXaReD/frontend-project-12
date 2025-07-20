import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Col,
  Button,
  Spinner,
  ListGroup,
} from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { setCurrentChannel, selectActiveChannelId } from '../store/slices/activeChannelSlice.js'
import { setOpen } from '../store/slices/modalSlice.js'
import ChannelDropdown from './ChannelDropdown.jsx'
import { useGetChannelsQuery } from '../store/services/chatApi'

const Channels = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const token = useSelector(state => state.auth.token)

  const { data: channels = [], isLoading: channelsLoading } = useGetChannelsQuery(undefined, { skip: !token })

  const currentChannelId = useSelector(selectActiveChannelId)

  return (
    <Col md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <Container className="d-flex mt-1 justify-content-between mb-2 pe-2 p-4">
        <b>{t('channels.title')}</b>
        <Button type="button" variant="none" className="p-0 btn-group-vertical" onClick={() => dispatch(setOpen({ type: 'create' }))}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </Container>
      {channelsLoading
        ? (
            <Container className="d-flex justify-content-center align-items-center h-100" key="loading-spinner">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">{t('channels.loading')}</span>
              </Spinner>
            </Container>
          )
        : (
            <ListGroup className="d-flex flex-column mb-2 overflow-auto flex-nowrap h-100">
              {channels.map(channel => (
                <ListGroup.Item
                  key={channel.id}
                  className="p-0"
                >
                  {channel.removable
                    ? (
                        <ChannelDropdown
                          channelId={channel.id}
                          channelName={channel.name}
                          isActive={currentChannelId === channel.id}
                        />
                      )
                    : (
                        <Button
                          variant={currentChannelId === channel.id ? 'secondary' : 'light'}
                          className={`w-100 rounded-0 text-start text-truncate ${currentChannelId === channel.id ? 'text-white' : 'text-dark'}`}
                          onClick={() => dispatch(setCurrentChannel(channel.id))}
                        >
                          {`# ${channel.name}`}
                        </Button>
                      )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
    </Col>
  )
}

export default Channels
