import {
  GET_ALL,
  GET_ALL_ERROR,
  GET_ONE,
  GET_ONE_ERROR,
  CLEAR_ONE,
} from '../actions/boatActions';

const initialState = {
  boats: [],
  boat: {},
  boatLoaded: false,
  boatsLoaded: false,
  // boatsLoadedAt: null,
};


export function boatReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        boats: action.data,
        boatsLoaded: true,
        // boatsLoadedAt: new Date(),
      };

    case GET_ONE:
      return {
        ...state,
        boatLoaded: true,
        boat: action.data,
      };

    case CLEAR_ONE:
      return {
        ...state,
        boat: {},
        boatLoaded: false,
      };

    default:
      return state;
  }
}
