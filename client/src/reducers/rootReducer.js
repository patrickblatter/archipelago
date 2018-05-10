import { combineReducers } from 'redux';
import { navReducer } from './navReducer';
import { userReducer } from './userReducer';


export default combineReducers({
  nav: navReducer,
  user: userReducer,
});

