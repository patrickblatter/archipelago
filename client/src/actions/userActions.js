import axios from 'axios';

export const LOGIN = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';

export function login(email, password) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/users/login',
        {
          email,
          password,
        },
      );

      if (response.status === 200) {
        dispatch({
          type: 'LOGIN',
          data: {
            token: response.data.token,
            _id: response.data._id,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'LOGIN_FAILED',
      });
    }
  };
}


export function logout() {
  return {
    type: 'LOGOUT',
  };
}
