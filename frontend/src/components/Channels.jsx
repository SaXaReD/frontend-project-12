import { useNavigate } from 'react-router-dom'
import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Col,
  Button,
  Image,
  Spinner,
  ListGroup,
} from 'react-bootstrap'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { selectToken } from '../store/authSlice.js'
import {
  addChannels,
  addChannel,
  setCurrentChannel,
  removeChannel,
  updateChannelName,
  selectors as channelSelectors,
} from '../store/channelSlice.js'
import { removeMessagesByChannelId } from '../store/messageSlice.js'
import { setOpen } from '../store/modalSlice.js'
import ChannelDropdown from './ChannelDropdown.jsx'
import socket from '../socket.js'
import API_ROUTES from '../routes/routes.js'

const Channels = () => {
  const dispatch = useDispatch()
  const redir = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useTranslation()

  const channels = useSelector(channelSelectors.selectAll)
  const currentChannelId = useSelector((state) => state.channels.currentChannel.id)
  const token = useSelector(selectToken)

  const lastChannelItemRef = useRef({})

  const scrollToLastChannelItem = useCallback((id) => {
    const element = lastChannelItemRef.current[id]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [])

  useEffect(() => {
    setIsLoading(true)
    axios.get(API_ROUTES.channels.list(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      dispatch(setCurrentChannel(response.data[0].id))
      dispatch(addChannels(response.data))
      setIsLoading(false)
    }).catch((error) => {
      setIsLoading(false)
      if (error.response?.status === 401) {
        redir('/login')
      }
    })
  }, [token, dispatch, redir, t])

  const handleNewChannel = useCallback((payload) => {
    dispatch(addChannel(payload))
    setTimeout(() => {
      scrollToLastChannelItem()
    }, 0)
  }, [dispatch, scrollToLastChannelItem])

  const handleRemoveChannel = useCallback((payload) => {
    const { id: removedChannelId } = payload
    dispatch(removeChannel({ id: removedChannelId }))
    dispatch(removeMessagesByChannelId(removedChannelId))
    if (currentChannelId === removedChannelId) {
      const nextChannel = channels.find((channel) => channel.id !== removedChannelId)
      if (nextChannel) {
        dispatch(setCurrentChannel(nextChannel.id))
      }
    }
  }, [dispatch, channels, currentChannelId])

  const handleRenameChannel = useCallback((payload) => {
    const { id, name } = payload
    dispatch(updateChannelName({ id, name }))
  }, [dispatch])

  useEffect(() => {
    socket.on('newChannel', handleNewChannel)
    socket.on('removeChannel', handleRemoveChannel)
    socket.on('renameChannel', handleRenameChannel)

    return () => {
      socket.off('newChannel', handleNewChannel)
      socket.off('removeChannel', handleRemoveChannel)
      socket.off('renameChannel', handleRenameChannel)
    }
  }, [handleNewChannel, handleRemoveChannel, handleRenameChannel])

  useEffect(() => {
    if (!isLoading && currentChannelId) {
      scrollToLastChannelItem(currentChannelId)
    }
  }, [currentChannelId, isLoading, scrollToLastChannelItem])

  return (
    <Col md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <Container className="d-flex mt-1 justify-content-between mb-2 pe-2 p-4">
        <b>{t('channels.title')}</b>
        <Button type="button" variant="none" className="p-0 btn-group-vertical" onClick={() => dispatch(setOpen({ type: 'create' }))}>
          <Image src="/images/svg/plus.svg" />
          <span className="visually-hidden">+</span>
        </Button>
      </Container>
      {isLoading ? (
        <Container className="d-flex justify-content-center align-items-center h-100" key="loading-spinner">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">{t('channels.loading')}</span>
          </Spinner>
        </Container>
      ) : (
        <ListGroup className="d-flex flex-column mb-2 overflow-auto flex-nowrap h-100">
          {channels.map((channel) => (
            <ListGroup.Item
              key={channel.id}
              className="p-0"
              ref={(el) => {
                if (el) {
                  lastChannelItemRef.current[channel.id] = el
                } else {
                  lastChannelItemRef.current[channel.id] = null
                }
              }}
            >
              {channel.removable ? (
                <ChannelDropdown
                  channelId={channel.id}
                  channelName={channel.name}
                  isActive={currentChannelId === channel.id}
                />
              ) : (
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
