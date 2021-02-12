import React from 'react';
import './index.scss';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import OrderPage from 'page/Order';
import ExporePage from 'page/Explore';
import HomeRouter from 'page/Home';
import AuthRouter from 'page/Auth/indx';
import { useDispatch } from 'react-redux';
import { AuthAction } from '@redux/actions';

interface props {}

const RootRouter: React.FC<props> = (props) => {
  const dispatch = useDispatch();

  // init app
  dispatch(AuthAction.populateAuth());

  const handleOnTouchStart = () => {
    dispatch(AuthAction.renewGuestTimestamp());
  };

  return (
    <div id="AppContainer" onTouchStart={handleOnTouchStart}>
      <Router>
        <Route exact path="/" component={HomeRouter} />
        <Route path="/order" component={OrderPage} />
        <Route path="/explore" component={ExporePage} />
        <Route path="/auth" component={AuthRouter} />
      </Router>
    </div>
  );
};

export default RootRouter;
