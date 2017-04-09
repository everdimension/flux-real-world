/* global window */
import { middleware as packMiddleware } from 'redux-pack';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { storeReducer } from './namespacedReducer';
import reducer from './entities/entitiesReducer';

const logger = () => next => (action) => {
  console.log('action', action); // eslint-disable-line no-console
  return next(action);
};

/* eslint-disable no-undef, no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable no-undef */

export default createStore(
  combineReducers({
    stargazers: storeReducer(reducer, 'stargazers'),
    repos: storeReducer(reducer, 'repos'),
  }),
  undefined,
  composeEnhancers(
    applyMiddleware(packMiddleware, logger),
  ),
);
