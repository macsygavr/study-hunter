import axios from 'axios';
import GET_CURRENT_USER from '../types/usersTypes';

export const getCurrentUserStart = () => (dispatch) => {
    // axios.get(`http://localhost:3005/rooms/${id}`)
    //   .then(res => dispatch(getCurrentRoomDevices(res.data)));
};

export function getCurrentUser(currentUser) {
  return {
    type: GET_CURRENT_USER,
    payload: currentUser,
  };
}
