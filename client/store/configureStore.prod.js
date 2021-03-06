import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

/**
 * Store configuration happens here
 * @return {obj} returns the object of stores
 */
export default function configureStore() {
  return createStore(rootReducer, compose(applyMiddleware(thunk)
  ));
}

