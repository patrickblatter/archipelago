import { CREATE_RENTAL_FAILED, CREATE_RENTAL_SUCCESS } from '../actions/rentalAction';

const initialState = {
  success: undefined,
  failure: undefined,
};

export function rentalReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case CREATE_RENTAL_SUCCESS:
      return {
        success: action.data,
        failure: undefined,
      };

    case CREATE_RENTAL_FAILED:
      return {
        sucess: undefined,
        failure: action.data,
      };

    default: return state;
  }
}
