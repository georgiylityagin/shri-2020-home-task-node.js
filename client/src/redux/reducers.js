import { combineReducers } from 'redux';

import { settingsReducer } from './Settings/settings-reducer';
import { historyReducer } from './History/history-reducer';
import { detailsReducer } from './Details/details-reducer';

const app = combineReducers({
  settings: settingsReducer,
  history: historyReducer,
  details: detailsReducer
});

export default app;