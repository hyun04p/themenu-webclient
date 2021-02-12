import React from 'react';
import './index.scss';

import { Redirect } from 'react-router-dom';

interface props {}

const HomeRouter: React.FC<props> = (props) => {
  return (
    <>
      <Redirect to={{ pathname: '/explore' }} />
    </>
  );
};

export default HomeRouter;
