import { forwardRef } from 'react';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setOpen } from '../store/modalSlice.js';
import { setCurrentChannel } from '../store/channelSlice.js';

const ChannelDropdown = forwardRef(({ channelId, channelName, isActive }, ref) => {
  const dispatch = useDispatch();

  const handleRename = () => {
    dispatch(setOpen({ type: 'rename', channelId }));
  };

  const handleDelete = () => {
    dispatch(setOpen({ type: 'delete', channelId }));
  };

  const handleChannelClick = () => {
    dispatch(setCurrentChannel(channelId));
  };

  return (
    <Dropdown as={ButtonGroup} ref={ref} className='position-static w-100'>
      <Button
        variant={isActive ? 'secondary' : 'light'}
        className={`w-100 rounded-0 text-start text-truncate ${isActive ? 'text-white' : 'text-dark'}`}
        onClick={handleChannelClick}
      >
        {`# ${channelName}`}
      </Button>

      <Dropdown.Toggle
        split
        variant={isActive ? 'secondary' : 'light'}
        id={`dropdown-split-channel-${channelId}`}
        className={`flex-grow-0 rounded-0 ${isActive ? 'text-white' : 'text-dark'}`}
      />

      <Dropdown.Menu className='position-fixed'>
        <Dropdown.Item onClick={handleDelete}>Удалить</Dropdown.Item>
        <Dropdown.Item onClick={handleRename}>Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
});

export default ChannelDropdown;