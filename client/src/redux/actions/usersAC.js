import axios from 'axios';
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  ADD_TO_FAV_USER_SUCCESS,
  ADD_TO_FAV_USER_FAIL,
  REMOVE_FROM_FAV_USER_SUCCESS,
  REMOVE_FROM_FAV_USER_FAIL,
} from '../types/usersTypes';

// logout ACs
export const logoutUserSuccess = () => ({
  type: LOGOUT_USER_SUCCESS,
});

export const logoutUserFail = () => ({
  type: LOGOUT_USER_FAIL,
});

export const logoutUserStart = () => (dispatch) => {
  axios.get(`${process.env.REACT_APP_SERVER_URL}/logout`, { withCredentials: true })
    .then((res) => {
      if (res.status === 200) {
        dispatch(logoutUserSuccess());
      }
    });
};

// register ACs
export const registerUserSuccess = (currentUser) => ({
  type: REGISTER_USER_SUCCESS,
  payload: currentUser,
});

export const registerUserFail = () => ({
  type: REGISTER_USER_FAIL,
});

// eslint-disable-next-line max-len
export const registerUserStart = (firstName, lastName, phone, email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/signup/user`, {
      firstName, lastName, phone, email, password,
    }, { withCredentials: true });
    dispatch(registerUserSuccess(response.data));
  } catch {
    console.log('Unable to register');
    dispatch(registerUserFail());
  }
};

// login ACs
export const loginUserSuccess = (currentUser) => ({
  type: LOGIN_USER_SUCCESS,
  payload: currentUser,
});

export const loginUserFail = () => ({
  type: LOGIN_USER_FAIL,
});

export const loginUserStart = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/signin/user`, {
      email, password,
    }, { withCredentials: true });
    console.log('responseeeee', response.data);
    dispatch(loginUserSuccess(response.data));
  } catch {
    console.log('Unable to login');
    dispatch(loginUserFail());
  }
};

// adding to favorites
export const addToFavUserSuccess = (userFavorites) => ({
  type: ADD_TO_FAV_USER_SUCCESS,
  payload: userFavorites, // array
});

export const addToFavUserFail = () => ({
  type: ADD_TO_FAV_USER_FAIL,
});

export const addToFavUserStart = (userId, courseId) => async (dispatch) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/favorites`, { userId, courseId }, { withCredentials: true });
    // принимаю обновленный массив любимых курсов пользователя
    // console.log(response.data.userFavorites);
    dispatch(addToFavUserSuccess(response.data.userFavorites));
  } catch {
    console.log('couldn\'t add the course to favorites');
    dispatch(addToFavUserFail());
  }
};

// removing from favorites
export const removeFromFavUserSuccess = (userFavorites) => ({
  type: REMOVE_FROM_FAV_USER_SUCCESS,
  payload: userFavorites,
});

export const removeFromFavUserFail = () => ({
  type: REMOVE_FROM_FAV_USER_FAIL,
});

export const removeFromFavUserStart = (userId, courseId) => async (dispatch) => {
  try {
    const response = await axios(`${process.env.REACT_APP_SERVER_URL}/favorites`, {
      method: 'delete',
      data: { userId, courseId },
    }, { withCredentials: true });
    dispatch(removeFromFavUserSuccess(response.data.userFavorites));
  } catch {
    console.log('couldn\'t remove the course from favorites');
    dispatch(removeFromFavUserFail());
  }
};
