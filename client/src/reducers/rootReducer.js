import { combineReducers } from 'redux';
import { navReducer } from './navReducer';
import { userReducer } from './userReducer';
import { boatReducer } from './boatReducer';
import { rentalReducer } from './rentalReducer';


export default combineReducers({
  nav: navReducer,
  user: userReducer,
  boat: boatReducer,
  rental: rentalReducer,
});

