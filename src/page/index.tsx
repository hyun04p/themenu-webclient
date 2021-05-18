import React from 'react';
import './index.scss';

import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import OrderRouter from 'page/Order';
import ExporePage from 'page/Explore';
import HomeRouter from 'page/Home';
import AuthRouter from 'page/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { AuthAction } from '@store/actions';
import { GlobalNotificationModal, Navbar } from 'component';
import ProfileRouter from 'page/Profile';

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
        <div id="contentContainer" className="hide-scrollbar">
          <Route exact path="/" component={HomeRouter} />
          <Route
            path="/order"
            render={(routeProps) => {
              console.log('about to render order router');

              // return <Redirect to={{ pathname: '/explore' }} />;
              return <OrderRouter />;
            }}
          />
          <Route path="/explore" component={ExporePage} />
          <Route path="/auth" component={AuthRouter} />
          <Route path="/profile" component={ProfileRouter} />
        </div>
        <Navbar />
        <GlobalNotificationModal />
      </Router>
    </div>
  );
};

export default RootRouter;
