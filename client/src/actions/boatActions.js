import axios from 'axios';


export const GET_ALL = 'GET_ALL';

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
