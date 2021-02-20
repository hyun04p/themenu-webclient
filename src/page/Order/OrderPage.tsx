import React, { useEffect, useState } from 'react';
import './OrderPage.scss';

import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store';
import { Footer } from 'component';
import { OrderAction } from '@store/actions';
import OrderRow from './OrderRow';

interface props {}

const OrderPage: React.FC<props> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [remaining, setRemaining] = useState('');

  const isOrdererValid = useSelector(
    (state: RootState) => state.Order.orderer.isValid
  );
  const store = useSelector((state: RootState) => state.Order.store);
  // const timestamp = useSelector(
  //   (state: RootState) => state.Auth.guest.timestamp
  // );

  // const calcRemaining = () => {
  //   const now = new Date();
  //   setRemaining(`${Math.floor((timestamp - now.getTime()) / 1000)} 초 남음`);
  // };

  // useEffect(() => {
  //   const id = setInterval(calcRemaining, 1000);
  //   return () => {
  //     clearInterval(id);
  //   };
  // }, [timestamp]);

  useEffect(() => {
    if (!isOrdererValid) history.push('/explore');
  }, [isOrdererValid]);

  useEffect(() => {
    dispatch(OrderAction.fetchStore());
    // dispatch(OrderAction.)
  }, []);

  useEffect(() => {
    console.log('[OrderPage] store: ', store);
  }, [store]);

  return (
    <div className="OrderPage hide-scrollbar">
      <div className="header">{' ' + store.information.name}</div>
      <div className="posterContainer">
        <img src="https://pds.joins.com/news/component/htmlphoto_mmdata/201907/19/htm_20190719173652371223.jpg" />
        <div className="infoFilterContainer">
          <div
            style={{
              width: '150px',
              height: '50px',
              backgroundColor: '#fff',
              marginBottom: '20px',
              color: '#000',
            }}
          >
            바로 주문
          </div>
        </div>
      </div>
      <div className="contentContainer">
        {store.menu.categories.map((cat) => {
          return <OrderRow key={cat} category={cat} items={store.menu.items} />;
        })}
      </div>

      <Footer />
    </div>
  );
};

export default OrderPage;
