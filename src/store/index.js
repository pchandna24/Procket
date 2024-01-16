/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import navigationReducer from './reducers/navigation';
import userReducer from './reducers/user';
import messageReducer from './reducers/messages';

const reducers = {
  navigation: navigationReducer,
  user: userReducer,
  message: messageReducer,
};

const middlewares = [thunk];

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares)
  // other store enhancers if any
);

const rootReducer = combineReducers(reducers);

export default createStore(rootReducer, enhancer);
