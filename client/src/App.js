import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { useMediaQuery } from 'react-responsive';
import { mobileMaxWidth } from './breakpoints';

import { ConnectedStartPage } from './pages/StartPage';
import { ConnectedHistoryPage } from './pages/HistoryPage';
import { ConnectedSettingsPage } from './pages/SettingsPage';
import { ConnectedDetailsPage } from './pages/DetailsPage';

export const App = () => {
  const isMobile = useMediaQuery({ maxWidth: mobileMaxWidth });

  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <Route path='/' exact><ConnectedStartPage isMobile={isMobile}/></Route>
          <Route path='/settings' exact><ConnectedSettingsPage isMobile={isMobile}/></Route>
          <Route path='/history' exact><ConnectedHistoryPage isMobile={isMobile}/></Route>
          <Route path='/build/:id'><ConnectedDetailsPage isMobile={isMobile}/></Route>
        </Switch>
      </Provider>
    </Router>
  );
}




    // api.getConfig().then(config => console.log('Config:', config.data));

    // api.getBuildsList().then(list => console.log('Build list:', list));

    // api.getBuildDetails('38e3b0c9-2aae-4911-b9f8-d5311a958e70').then(build => console.log('Build details: ', build));

    // api.getBuildLogs('38e3b0c9-2aae-4911-b9f8-d5311a958e70').then(logs => console.log('logs: ', logs));

    // let config = {
    //   repoName: "georgiylityagin/github-finder",
    //   buildCommand: "npm run build",
    //   mainBranch: "master",
    //   period: 0
    // };

    // let buildDetails = {
    //   commitMessage: "New commit",
    //   commitHash: "dskjklhasdfhadsf",
    //   branchName: "master",
    //   authorName: "SuperUser"
    // }

    // api.postConfig(config)
    //   .then(res => console.log('Config saved', res))
    //   .catch(err => console.error('Something got wrong', err))

    // api.postAddBuild(buildDetails)
    //   .then(res => console.log('Добавлено в очередь', res))
    //   .catch(err => console.error('Не добавлено в очередь', err))