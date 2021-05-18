import React, { useEffect, useState } from 'react';
import './OrderPage.scss';

import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store';
import { Footer } from 'component';
import { OrderAction } from '@store/actions';
import OrderRow from './OrderRow';
import ShowDetailModal from './ShowDetailModal';
import BucketModal from './BucketModal';

interface props {}

const OrderPage: React.FC<props> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [detailModalId, setDetailModalId] = useState<string | undefined>(
    undefined
  );

  const isOrdererValid = useSelector(
    (state: RootState) => state.Order.orderer.isValid
  );
  const store = useSelector((state: RootState) => state.Order.store);

  useEffect(() => {
    if (!isOrdererValid) history.push('/explore');
  }, [isOrdererValid]);

  useEffect(() => {
    dispatch(OrderAction.fetchStore());
    // dispatch(OrderAction.)
  }, []);

  useEffect(() => {
    // console.log('[OrderPage] store: ', store);
  }, [store]);

  const handleOnSelectItem = (itemId: string) => {
    if (!detailModalId) setDetailModalId(itemId);
  };

  return (
    <>
      <div className="OrderPage hide-scrollbar">
        <div className="header">
          <h3>{' ' + store.information.name}</h3>
          <BucketModal />
        </div>
        <div className="posterContainer">
          <img src="https://pds.joins.com/news/component/htmlphoto_mmdata/201907/19/htm_20190719173652371223.jpg" />
          <div className="infoFilterContainer">
            <div
              style={{
                width: '90px',
                height: '40px',
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
            return <OrderRow key={cat} category={cat} />;
          })}
        </div>

        <Footer />
      </div>
      <ShowDetailModal />
    </>
  );
};

export default OrderPage;
