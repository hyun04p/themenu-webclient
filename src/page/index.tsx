import React from 'react';
import './index.scss';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import OrderRouter from 'page/Order';
import ExporePage from 'page/Explore';
import HomeRouter from 'page/Home';
import AuthRouter from 'page/Auth/indx';
import { useDispatch } from 'react-redux';
import { AuthAction } from '@redux/actions';
import { GlobalNotificationModal } from 'component';

interface props {}

const RootRouter: React.FC<props> = (props) => {
  const dispatch = useDispatch();

  // init app
  dispatch(AuthAction.populateAuth());

  const handleOnTouchStart = () => {
    dispatch(AuthAction.renewGuestTimestamp());
  };

  const TestPage = () => {
    return <div>test page</div>;
  };

  return (
    <div id="AppContainer" onTouchStart={handleOnTouchStart}>
      <Router>
        <Route exact path="/" component={HomeRouter} />
        <Route path="/order" component={OrderRouter} />
        <Route path="/explore" component={ExporePage} />
        <Route path="/auth" component={AuthRouter} />
        <Route path="/test" component={TestPage} />
      </Router>
      <GlobalNotificationModal />
    </div>
  );
};

export default RootRouter;
