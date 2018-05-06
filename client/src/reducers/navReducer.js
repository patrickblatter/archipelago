import { TOGGLE_NAV } from '../actions/navActions';

const initialState = {
  isOpen: false,
};

export function navReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_NAV:
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    default:
      return state;
  }
}
