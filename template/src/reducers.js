import { combineReducers } from 'redux';
import { navReducer } from './containers/App/reducer';

const rootReducer = combineReducers({
  nav: navReducer,
});


export default rootReducer;
