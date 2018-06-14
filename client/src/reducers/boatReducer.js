import { loadState } from '../localStorage';

import {
  GET_ALL,
  GET_ALL_ERROR,
  GET_ONE,
  GET_ONE_ERROR,
  CLEAR_ONE,
  GET_LIMIT,
  GET_LIMIT_ERROR,
} from '../actions/boatActions';

const persistedState = loadState();

const initialState = {
  boat: {},
  boatLoaded: false,
};

if (persistedState === undefined) {
  initialState.boats = [],
  initialState.boatsLoaded = false;
} else {
  initialState.boats = persistedState.boat.boats;
  initialState.boatsLoaded = persistedState.boat.boatsloaded;
}


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

    case GET_LIMIT:
      return {
        ...state,
        boatsLoaded: true,
        boats: action.data,
      };

    case CLEAR_ONE:
      return {
        ...state,
        boat: {},
        boatLoaded: false,
      };

    case GET_ALL_ERROR:
      return {
        ...state,
        boats: [],
        boatsloaded: false,
      };

    default:
      return state;
  }
}
