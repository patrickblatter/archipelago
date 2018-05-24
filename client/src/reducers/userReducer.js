import { LOGIN, LOGOUT } from '../actions/userActions';
import { loadState } from '../localStorage';

const persistedState = loadState();

const initialState = {
  isLoggedIn: persistedState.user.isLoggedIn,
  token: persistedState.user.token,
  _id: persistedState.user._id,
};


export function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: !state.isLoggedIn,
        token: action.data.token,
        _id: action.data._id,
      };

    case LOGOUT:
      return {
        ...state,
        isLoggedIn: !state.isLoggedIn,
        token: undefined,
        _id: undefined,
      };

    default: return state;
  }
}
