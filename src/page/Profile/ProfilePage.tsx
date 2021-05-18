import { OrderAction } from '@store/actions';
import React from 'react';
import { useDispatch } from 'react-redux';
import './ProfilePage.scss';

interface props {}

const ProfilePage: React.FC<props> = (props) => {
  const dispatch = useDispatch();

  let m1 = {
    id: '',
    itemId: '삼겹살',
    count: 1,
    options: [{ name: '[음료] 사이다', price: 1000 }],
  };

  let m2 = {
    id: '',
    itemId: '오겹살',
    count: 1,
    options: [{ name: '[음료] 사이다', price: 1000 }],
  };

  const onClick = () => {
    dispatch(
      OrderAction.putItemToBucket(m1.id, m1.itemId, m1.count, m1.options)
    );
    dispatch(
      OrderAction.putItemToBucket(m2.id, m2.itemId, m2.count, m2.options)
    );
  };

  return (
    <div className="ProfilePage">
      <div onClick={onClick}>회원가입해라!</div>
    </div>
  );
};

export default ProfilePage;
