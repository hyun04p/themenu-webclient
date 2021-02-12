import React from 'react';
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

  const isTimestampValid = useSelector(
    (state: RootState) => state.Auth.guest.isTimestampValid
  );

  console.log(queryString);

  if (queryString.cRed !== undefined) {
    dispatch(AuthAction.authenticateGuest({ info: queryString.cRed }));
    setTimeout(() => {}, 3000);
  } else {
  }

  return (
    <>
      {isTimestampValid ? (
        <Redirect to={{ pathname: '/order' }} />
      ) : (
        <Redirect to={{ pathname: '/explore' }} />
      )}
    </>
  );
};

export default AuthRouter;
