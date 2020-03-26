import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { mobileMaxWidth } from './breakpoints';

import { StartPage } from './components/StartPage/StartPage';
import { HistoryPage } from './components/HistoryPage/HistoryPage';
import { SettingsPage } from './components/SettingsPage/SettingsPage';
import { DetailsPage } from './components/DetailsPage/DetailsPage';

export const App = () => {
  const isMobile = useMediaQuery({ maxWidth: mobileMaxWidth });

  return (
    <Router>
      <Switch>
        <Route path='/' exact><StartPage isMobile={isMobile}/></Route>
        <Route path='/settings'><SettingsPage isMobile={isMobile}/></Route>
        <Route path='/history'><HistoryPage isMobile={isMobile}/></Route>
      </Switch>
    </Router>
  );
}
