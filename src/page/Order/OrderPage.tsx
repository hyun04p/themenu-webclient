import React, { useEffect, useState } from 'react';
import './OrderPage.scss';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@redux';

interface props {}

const OrderPage: React.FC<props> = (props) => {
  const [remaining, setRemaining] = useState('');

  const timestamp = useSelector(
    (state: RootState) => state.Auth.guest.timestamp
  );

  const calcRemaining = () => {
    const now = new Date();
    setRemaining(`${Math.floor((timestamp - now.getTime()) / 1000)} 초 남음`);
  };

  useEffect(() => {
    const id = setInterval(calcRemaining, 1000);
    return () => {
      clearInterval(id);
    };
  }, [timestamp]);

  return (
    <div className="OrderPage hide-scrollbar">
      <div className="header">OrderPage</div>
      <div className="posterContainer">
        <img src="https://pds.joins.com/news/component/htmlphoto_mmdata/201907/19/htm_20190719173652371223.jpg" />
        <div className="infoFilterContainer"></div>
      </div>
      <h3>timer</h3>
      <p>{remaining}</p>
      <br />
      <Link to="/explore">explore</Link>
      <div className="footer">footer</div>
    </div>
  );
};

export default OrderPage;
