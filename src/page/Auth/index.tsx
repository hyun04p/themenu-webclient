import React, { useEffect, useLayoutEffect, useState } from 'react';
import './index.scss';

import { useDispatch, useSelector } from 'react-redux';
import { Location, Notifications } from '@util';
import { AuthAction, OrderAction, UIAction } from '@store/actions';
import { useHistory } from 'react-router-dom';
import { RootState } from '@store';

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
    const qsExists = validateQueryString(qs, ['cRed', 'tBn', 'sn']);
    let { cRed, tBn, sn } = qs;
    cRed = '' + cRed;
    tBn = parseInt('' + tBn);
    sn = parseInt('' + sn);

    if (qsExists && !isNaN(sn) && !isNaN(tBn)) {
      dispatch(AuthAction.registerGuestTimestamp());
      dispatch(OrderAction.setOrderer(cRed, tBn, sn));
      dispatch(UIAction.routeTo('/order', history));
    } else {
      // qs invalid
      dispatch(AuthAction.unregisterGuestTimestamp());
      dispatch(UIAction.queueNotification(Notifications.INVALID_ORDER_URL));
      dispatch(UIAction.routeTo('/explore', history));
    }
  }, []);

  return <div className="AuthIndex">loading</div>;
};

export default AuthRouter;
