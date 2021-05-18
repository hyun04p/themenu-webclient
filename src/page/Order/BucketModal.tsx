import React, { useState } from 'react';
import './BucketModal.scss';

import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@store';

interface props {}

const BucketModal: React.FC<props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const bucket = useSelector((state: RootState) => state.Order.order.bucket);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const renderBucket = (bucket: any) => {
    const ret = Object.keys(bucket).map((id) => {
      return (
        <div key={bucket[id].id}>
          <div>{bucket[id].itemId}</div>
          <div>{bucket[id].count}</div>
          <div>{JSON.stringify(bucket[id].options)}</div>
        </div>
      );
    });
    return ret;
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={onClose}
        overlayClassName="BucketModalOverlay"
        className="BucketModal disable-selection"
      >
        <div>{renderBucket(bucket)}</div>
        <div onClick={onClose}>닫기</div>
      </Modal>
      <div onClick={onOpen}>장바구니</div>
    </>
  );
};

export default BucketModal;
