import React, { useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { detectDevice } from './redux/actions/adaptivity-actions';

import { ConnectedStartPage } from './pages/StartPage';
import { ConnectedHistoryPage } from './pages/HistoryPage';
import { ConnectedSettingsPage } from './pages/SettingsPage';
import { ConnectedDetailsPage } from './pages/DetailsPage';

export const App = ({ detectDevice, isMobile }) => {
  const handlePageResize = useCallback(
    () => {
      detectDevice(window.innerWidth);
    },
    [detectDevice]
  );

  useEffect(() => {
    window.addEventListener('resize', handlePageResize);

    return () => {
      window.removeEventListener('resize', handlePageResize);
    };
  }, [handlePageResize]);

  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <ConnectedStartPage isMobile={isMobile} />
        </Route>
        <Route path='/settings' exact>
          <ConnectedSettingsPage isMobile={isMobile} />
        </Route>
        <Route path='/history' exact>
          <ConnectedHistoryPage isMobile={isMobile} />
        </Route>
        <Route path='/build/:id'>
          <ConnectedDetailsPage isMobile={isMobile} />
        </Route>
      </Switch>
    </Router>
  );
};

const mapStateToProps = ({ adaptivity }) => ({
  isMobile: adaptivity.isMobile
});

export const ConnectedApp = connect(mapStateToProps, { detectDevice })(App);
