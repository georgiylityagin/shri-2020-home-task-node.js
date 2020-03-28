import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import app from './reducers';

export const store = createStore(app, applyMiddleware(thunk));