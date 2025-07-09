import { useSelector } from 'react-redux';
import CreateChannel from './modal/CreateChannel.jsx';
import RenameChannel from './Modal/RenameChannel.jsx';
import ConfirmDelete from './Modal/ConfirmDelete.jsx';

const Modal = () => {
  const { type } = useSelector((state) => state.modal);

  const renderModal = () => {
    switch (type) {
      case 'rename':
        return <RenameChannel />;
      case 'delete':
        return <ConfirmDelete />;
      case 'create':
        return <CreateChannel />;
      default:
        return null;
    }
  };

  return renderModal();
};

export default Modal;