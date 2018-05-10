import { LOGIN, LOGOUT } from '../actions/userActions';
import { loadState } from '../localStorage';

const persistedState = loadState();

const initialState = {
  isLoggedIn: persistedState.user.isLoggedIn,
};


export function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: !state.isLoggedIn,
      };

    case LOGOUT:
      return {
        ...state,
        isLoggedIn: !state.isLoggedIn,
      };

    default: return state;
  }
}
