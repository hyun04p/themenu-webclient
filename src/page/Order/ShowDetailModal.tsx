import React, { useReducer, useState } from 'react';
import './ShowDetailModal.scss';

import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store';
import { OrderAction } from '@store/actions';
import OptionSelector from './OptionSelector';

interface props {}

const ShowDetailModal: React.FC<props> = (props) => {
  const dispatch = useDispatch();

  const [stage, setStage] = useState<'detail' | 'order'>('detail');

  const items = useSelector((state: RootState) => state.Order.store.menu.items);
  const optionGroups = useSelector(
    (state: RootState) => state.Order.store.menu.option_groups
  );
  const itemId = useSelector(
    (state: RootState) => state.Order.order.detailModalId
  );

  const closeModal = () => {
    dispatch(OrderAction.hideMenuDetailModal());
  };

  const afterOpen = () => {
    setStage('detail');
  };

  const onClickOrder = () => {
    setStage('order');
  };

  const onClickCancel = () => {
    dispatch(OrderAction.hideMenuDetailModal());
  };

  const AddToBucketButton = (
    <div
      className={`orderBtn`}
      onClick={stage === 'order' ? onClickCancel : onClickOrder}
    >
      장바구니에 담기
    </div>
  );

  if (!itemId) return null;

  return (
    <Modal
      isOpen={!!itemId}
      overlayClassName="ShowDetailModalOveraly"
      className={`ShowDetailModal disable-selection ${stage}`}
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
      appElement={document.getElementById('root') as HTMLElement}
      onAfterOpen={afterOpen}
    >
      <div className="detailContainer">
        <div className="imgContainer">img</div>
        <div className="infoContainer">
          <h3>{itemId}</h3>
          <p>{'' + items.byId[itemId].description}</p>
        </div>
      </div>

      <div
        className={`optionGroupSelector ${stage === 'detail' ? 'hide' : ''}`}
      >
        <div className="optionGroups">
          <OptionSelector />
        </div>
      </div>
      {AddToBucketButton}
    </Modal>
  );
};

export default ShowDetailModal;
