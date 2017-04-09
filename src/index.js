/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import * as reduxActions from 'redux-actions';
import { Provider } from 'react-redux';
import store from './flux/createStore';
import * as actions from './flux/entities/entitiesReducer';
import App from './App';
import './index.css';

Object.assign(window, reduxActions, { actions }); // eslint-disable-line no-undef

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
