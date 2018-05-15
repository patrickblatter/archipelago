import { combineReducers } from 'redux';
import { navReducer } from './navReducer';
import { userReducer } from './userReducer';
import { boatReducer } from './boatReducer';


export default combineReducers({
  nav: navReducer,
  user: userReducer,
  boat: boatReducer,
});

