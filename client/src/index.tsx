import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ConnectedApp } from './App';

import './styles/index.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js', { scope: '/'})
      .then(() => {
        console.log('Service worker registration successful');
      })
      .catch(err => console.error(err));
  })
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
