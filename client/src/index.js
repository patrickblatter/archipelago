import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import App from './App';
import { saveState } from './localStorage';
import throttle from 'lodash/throttle';

import rootReducer from './reducers/rootReducer';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, middleware);

store.subscribe(throttle(() => {
  saveState({
    user: store.getState().user,
  });
}, 1000));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
