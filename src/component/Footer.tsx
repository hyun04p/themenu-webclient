import React from 'react';
import './Footer.scss';

interface props {}

const Footer: React.FC<props> = (props) => {
  return (
    <div className="Footer">
      <h3>{'(주)더MENU'}</h3>
      <p>
        더Menu는 통신판매중개자이며 통신판매의 당사자가 아닙니다. 따라서
        더MENU는 상품, 거래 정보 및 거래에 책임을 지지 않습니다.
      </p>
    </div>
  );
};

export default Footer;
