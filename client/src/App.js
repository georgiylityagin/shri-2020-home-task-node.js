import React, { useState, useEffect } from 'react';
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

const getData = async (url = '') => {
  const response = await fetch(url);
  return await response.json();
}

export const App = () => {
  const isMobile = useMediaQuery({ maxWidth: mobileMaxWidth });

  const [settingsData, setSettingsData] = useState(null);
  
  useEffect(() => {
    getData('http://127.0.0.1:3000/api/settings')
    .then(res => {
      setSettingsData(res.data);
    });
  });

  return (
    <Router>
      <Switch>
        <Route path='/' exact><StartPage isMobile={isMobile}/></Route>
        <Route path='/settings'><SettingsPage isMobile={isMobile}/></Route>
        <Route path='/history'><HistoryPage isMobile={isMobile} repoName={'georgiylityagin/my-repo'}/></Route>
        <Route path='/build'><DetailsPage isMobile={isMobile} repoName={'georgiylityagin/my-repo'}/></Route>
      </Switch>
    </Router>
  );
}
