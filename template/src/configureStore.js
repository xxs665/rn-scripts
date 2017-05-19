import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducer from './reducers';

export function configureStore(initState) {
  const enhancer = compose(applyMiddleware(ReduxThunk, createLogger()));

  const store = createStore(reducer, initState, enhancer);
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('./reducers').default);
    });
  }
  return store;
}

export default configureStore;
