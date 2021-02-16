import React from 'react';
import './Navbar.scss';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UIAction } from '@redux/actions';

interface props {}

interface btnProps {
  to: string;
}
const NavBtn: React.FC<btnProps> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const location = useLocation();

  const navigate = () => {
    // history.push(props.to);
    dispatch(UIAction.routeTo(props.to, history));
  };

  return <div onClick={navigate}>{props.children}</div>;
};

const Navbar: React.FC<props> = (props) => {
  return (
    <div className="Navbar">
      <NavBtn to="/explore">맛집 찾기</NavBtn>
      <NavBtn to="/order">주문</NavBtn>
      <NavBtn to="/">프로필</NavBtn>
    </div>
  );
};

export default Navbar;
