import React, { useEffect, useState } from 'react';
import './index.scss';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux';
import { Redirect } from 'react-router-dom';
import OrderPage from './OrderPage';
import { UIAction } from '@redux/actions';
import { Notifications } from '@util';

interface props {}

const OrderRouter: React.FC<props> = (props) => {
  const dispatch = useDispatch();
  const [remaining, setRemaining] = useState('');

  const isTimestampValid = useSelector(
    (state: RootState) => state.Auth.guest.isTimestampValid
  );

  const isOrdererValid = useSelector(
    (state: RootState) => state.Order.orderer.isValid
  );

  const isOrdererLoading = useSelector(
    (state: RootState) => state.Order.orderer.loading
  );

  const timestamp = useSelector(
    (state: RootState) => state.Auth.guest.timestamp
  );

  const calcRemaining = () => {
    const now = new Date();
    const ts = new Date(timestamp);
    const until = ts.getTime() + 0.5 * 60000;
    setRemaining(`${Math.floor((until - now.getTime()) / 1000)} 초 남음`);
  };

  useEffect(() => {
    const id = setInterval(calcRemaining, 1000);
    return () => {
      clearInterval(id);
    };
  }, [timestamp]);

  useEffect(() => {
    if (!isTimestampValid) {
      dispatch(UIAction.queueNotification(Notifications.INVALID_ORDER_URL));
    }
  }, []);

  return (
    <>
      {isOrdererLoading ? (
        <div>loading</div>
      ) : isTimestampValid && isOrdererValid ? (
        // <div className="OrderPage">
        //   OrderPage
        //   <div>
        //     <h3>timer</h3>
        //     <p>{remaining}</p>
        //   </div>
        //   <Link to="/explore">explore</Link>
        // </div>
        <OrderPage />
      ) : (
        <Redirect to={{ pathname: '/explore' }} />
      )}
    </>
  );
};

export default OrderRouter;
