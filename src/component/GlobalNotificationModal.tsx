import React from 'react';
import './GlobalNotificationModal.scss';

import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux';
import { UIAction } from '@redux/actions';

interface props {}

const GlobalNotificationModal: React.FC<props> = (props) => {
  const dispatch = useDispatch();

  const notificationQueue = useSelector(
    (state: RootState) => state.UI.notificationQueue
  );

  const closeModal = () => {
    dispatch(UIAction.popNotification());
  };

  return (
    <>
      <Modal
        isOpen={notificationQueue.length !== 0}
        className={`container`}
        overlayClassName="overlay"
        appElement={document.getElementById('root') as HTMLElement}
        shouldCloseOnOverlayClick={true}
        onRequestClose={closeModal}
      >
        {(() => {
          const notification = notificationQueue.slice(-1)[0];
          if (notification === undefined) return null;
          else
            return (
              <>
                <h3>{notification.title}</h3>
                <p>{notification.content}</p>
              </>
            );
        })()}
        <div onClick={closeModal} className="closeBtn">
          확인
        </div>
      </Modal>
    </>
  );
};

export default GlobalNotificationModal;
