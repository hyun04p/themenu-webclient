import React, { useEffect, useLayoutEffect } from 'react';
import './index.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useQueryString } from 'util/Location';
import { AuthAction } from '@redux/actions';
import { Redirect } from 'react-router-dom';
import { RootState } from '@redux';

interface props {}

const AuthRouter: React.FC<props> = (props) => {
  const dispatch = useDispatch();
  const queryString = useQueryString();

  const auth = useSelector((state: RootState) => state.Auth);

  useEffect(() => {
    console.log(auth);
  });

  useEffect(() => {
    if (queryString.cRed !== undefined) {
      dispatch(AuthAction.authenticateGuest({ info: queryString.cRed }));
    } else {
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
