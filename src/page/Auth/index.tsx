import React, { useEffect, useLayoutEffect, useState } from 'react';
import './index.scss';

import { useDispatch, useSelector } from 'react-redux';
import { Location, Notifications } from '@util';
import { AuthAction, OrderAction, UIAction } from '@redux/actions';
import { useHistory } from 'react-router-dom';
import { RootState } from '@redux';

interface props {}

const AuthRouter: React.FC<props> = (props) => {
  const dispatch = useDispatch();
  const qs = Location.useQueryString();
  const history = useHistory();

  const auth = useSelector((state: RootState) => state.Auth);

  const validateQueryString = (qs: any, paramNames: string[]) => {
    let isValid = true;
    paramNames.forEach((el) => {
      if (!qs[el]) {
        isValid = false;
      }
    });
    return isValid;
  };

  useEffect(() => {
    if (validateQueryString(qs, ['cRed', 'tBn', 'sn'])) {
      let { cRed, tBn, sn } = qs;
      cRed = '' + cRed;
      dispatch(AuthAction.registerGuestTimestamp());
      history.push('/order');
    } else {
      // qs invalid
      dispatch(UIAction.queueNotification(Notifications.INVALID_ORDER_URL));
      history.push('/explore');
    }
  }, []);

  return <div className="AuthIndex">loading</div>;
};

export default AuthRouter;
