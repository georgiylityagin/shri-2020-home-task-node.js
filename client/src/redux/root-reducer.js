import { combineReducers } from 'redux';

import { settingsReducer } from './reducers/settings-reducer';
import { historyReducer } from './reducers/history-reducer';
import { detailsReducer } from './reducers/details-reducer';
import { adaptivityReducer } from './reducers/adaptivity-reducer';

const rootReducer = combineReducers({
  settings: settingsReducer,
  history: historyReducer,
  details: detailsReducer,
  adaptivity: adaptivityReducer,
});

export default rootReducer;
