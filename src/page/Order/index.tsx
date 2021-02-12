import React, { useEffect, useState } from 'react';
import './index.scss';

import { useSelector } from 'react-redux';
import { RootState } from '@redux';
import { Redirect } from 'react-router-dom';

interface props {}

const OrderPage: React.FC<props> = (props) => {
  const [remaining, setRemaining] = useState('');

  const isTimestampValid = useSelector(
    (state: RootState) => state.Auth.guest.isTimestampValid
  );

  const timestamp = useSelector(
    (state: RootState) => state.Auth.guest.timestamp
  );

  const calcRemaining = () => {
    const now = new Date();
    const ts = new Date(timestamp);
    const until = ts.getTime() + 0.5 * 60000;
    setRemaining(`${(until - now.getTime()) / 1000} 초 남음`);
  };

  useEffect(() => {
    const id = setInterval(calcRemaining, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <>
      {isTimestampValid ? (
        <div className="OrderPage">
          OrderPage
          <div>
            <h3>timer</h3>
            <p>{remaining}</p>
          </div>
        </div>
      ) : (
        <Redirect to={{ pathname: '/explore' }} />
      )}
    </>
  );
};

export default OrderPage;
