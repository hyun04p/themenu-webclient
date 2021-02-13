import React, { useEffect, useLayoutEffect } from 'react';
import './index.scss';

import { useDispatch, useSelector } from 'react-redux';
import { Location } from '@util';
import { AuthAction, OrderAction } from '@redux/actions';
import { Redirect } from 'react-router-dom';
import { RootState } from '@redux';

interface props {}

const AuthRouter: React.FC<props> = (props) => {
  const dispatch = useDispatch();
  const queryString = Location.useQueryString();

  const auth = useSelector((state: RootState) => state.Auth);

  useEffect(() => {
    console.log(auth);
  });

  useEffect(() => {
    if (
      queryString.cRed !== undefined &&
      queryString.tBn !== undefined &&
      queryString.sn !== undefined &&
      queryString.cRed !== null &&
      queryString.tBn !== null &&
      queryString.sn !== null
    ) {
      const storeId = queryString.cRed.toString();
      const tableNum = parseInt(queryString.tBn.toString());
      const seatNum = parseInt(queryString.sn.toString());
      dispatch(
        OrderAction.fetchStore({
          orderer: { storeId: storeId, tableNum: tableNum, seatNum: seatNum },
        })
      );

      dispatch(AuthAction.authenticateGuest({ info: queryString.cRed }));
    } else {
      dispatch(OrderAction.setLoading(false));
      dispatch(AuthAction.setLoading({ loading: false }));
    }
  }, []);

  return (
    <>
      {auth.loading ? (
        <div>loading</div>
      ) : auth.guest.isTimestampValid ? (
        <Redirect to={{ pathname: '/order' }} />
      ) : (
        <Redirect to={{ pathname: '/explore' }} />
      )}
    </>
  );
};

export default AuthRouter;
