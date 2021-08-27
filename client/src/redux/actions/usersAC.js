import axios from 'axios';
import {
  GET_CURRENT_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_USER,
} from '../types/usersTypes';

// export const getCurrentUserStart = () => (dispatch) => {
//   // axios.get(`http://localhost:3005/rooms/${id}`)
//   //   .then(res => dispatch(getCurrentRoomDevices(res.data)));
// };

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const logoutUserStart = () => (dispatch) => {
  axios.get('http://192.168.1.38:3005/logout')
    .then((res) => {
      if (res.data === 'OK') {
        dispatch(logoutUser());
      }
    });
};

export const getCurrentUser = (currentUser) => ({
  type: GET_CURRENT_USER,
  payload: currentUser,
});

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
    const response = await axios.post('http://192.168.1.38:3005/signup/user', {
      firstName, lastName, phone, email, password,
    });
    console.log(response.data);
    dispatch(registerUserSuccess(response.data));
  } catch {
    console.log('Unable to register');
    dispatch(registerUserFail());
  }
};
