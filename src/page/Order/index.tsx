import React, { useEffect, useState } from 'react';
import './index.scss';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store';
import { useHistory } from 'react-router-dom';
import OrderPage from './OrderPage';
import { UIAction } from '@store/actions';
import { Notifications } from '@util';
import Modal from 'react-modal';
import ShowDetailModal from './ShowDetailModal';

interface props {}

const OrderRouter: React.FC<props> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const isTimestampValid = useSelector(
    (state: RootState) => state.Auth.guest.isTimestampValid
  );

  useEffect(() => {
    if (!isTimestampValid) {
      dispatch(UIAction.queueNotification(Notifications.INVALID_ORDER_URL));
      history.push('/explore');
    }
    setLoading(false);
  }, [isTimestampValid]);

  console.log('rendering order router');

  return loading ? <div></div> : <OrderPage />;
};

export default OrderRouter;
