import axios from 'axios';
import GET_CURRENT_COURSE from '../types/coursesTypes';

export const getCurrentCourseStart = () => (dispatch) => {
  // axios.get(`http://localhost:3005/rooms/${id}`)
  //   .then(res => dispatch(getCurrentRoomDevices(res.data)));
};

export function getCurrentCourse(currentCourse) {
  return {
    type: GET_CURRENT_COURSE,
    payload: currentCourse,
  };
}
