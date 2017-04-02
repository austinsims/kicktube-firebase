import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import {Provider} from 'react-redux';
import store from './store';

const provider = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(
  provider,
  document.getElementById('root')
);
