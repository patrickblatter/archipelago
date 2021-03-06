export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};


export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error) {
    console.log(error);
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem('token');
  } catch (error) {
    console.log(error);
  }
};

export const saveToken = (token) => {
  try {
    localStorage.setItem('token', token);
  } catch (error) {
    console.log(error);
  }
};

export const getToken = () => {
  try {
    const { token } = loadState().user;
    return token;
  } catch (error) {
    return undefined;
  }
};

export const getId = () => {
  try {
    const { _id } = loadState().user;
    return _id;
  } catch (error) {
    return undefined;
  }
};
