import React, { useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { detectDevice } from './redux/actions/adaptivity-actions';
import { getConfig } from './redux/actions/settings-actions';

import { StartPage } from './pages/StartPage';
import { ConnectedHistoryPage } from './pages/HistoryPage';
import { ConnectedSettingsPage } from './pages/SettingsPage';
import { ConnectedDetailsPage } from './pages/DetailsPage';

export const App = ({ detectDevice, getConfig, isConfig, isMobile }) => {
  const handlePageResize = useCallback(() => {
    detectDevice(window.innerWidth);
  }, [detectDevice]);

  useEffect(() => {
    window.addEventListener('resize', handlePageResize);

    getConfig();

    return () => {
      window.removeEventListener('resize', handlePageResize);
    };
  }, [handlePageResize, getConfig]);

  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          {isConfig ? (
            <ConnectedHistoryPage isMobile={isMobile} />
          ) : (
            <StartPage isMobile={isMobile} />
          )}
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

const mapStateToProps = ({ adaptivity, settings }) => ({
  isMobile: adaptivity.isMobile,
  isConfig: settings.isConfig
});

export const ConnectedApp = connect(mapStateToProps, {
  detectDevice,
  getConfig
})(App);
