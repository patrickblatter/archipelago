import { GET_ALL } from '../actions/boatActions';

const initialState = {
  boats: [],
  boat: {},
  isLoaded: false,
  boatsLoadedAt: null,
};


export function boatReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        boats: action.data,
        isLoaded: true,
        boatsLoadedAt: new Date(),
      };

    default:
      return state;
  }
}
