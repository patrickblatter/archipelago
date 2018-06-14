import axios from 'axios';

export const GET_ALL = 'GET_ALL';
export const GET_ALL_ERROR = 'GET_ALL_ERROR';
export const GET_ONE = 'GET_ONE';
export const GET_ONE_ERROR = 'GET_ONE_ERROR';
export const CLEAR_ONE = 'CLEAR_ONE';
export const GET_LIMIT = 'GET_LIMIT';
export const GET_LIMIT_ERROR = 'GET_LIMIT_ERROR';

// get-boats-request
// get-boats-success
// get-boats-fail

export function getAll() {
  return async (dispatch) => {
    try {
      const result = await axios.get('http://localhost:3001/boats');
      dispatch({
        type: 'GET_ALL',
        data: result.data.boats,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'GET_ALL_ERROR',
        data: 'Couldn\'t get boats',
      });
    }
  };
}

export function getLimit(page) {
  return async (dispatch) => {
    try {
      const result = await axios.get(`http://localhost:3001/boats/limit?page=${page}`);
      dispatch({
        type: 'GET_LIMIT',
        data: result.data.boats,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'GET_LIMIT_ERROR',
        data: 'Couldn\'t get boats',
      });
    }
  };
}
export function getOne(_id) {
  return async (dispatch) => {
    try {
      const result = await axios.get(`http://localhost:3001/boats/${_id}`);
      dispatch({
        type: 'GET_ONE',
        data: result.data.boat,
      });
    } catch (error) {
      dispatch({
        type: 'GET_ONE_ERROR',
        data: 'Couldn\'t get boat',
      });
    }
  };
}

export function clearOne() {
  return {
    type: 'CLEAR_ONE',
  };
}
