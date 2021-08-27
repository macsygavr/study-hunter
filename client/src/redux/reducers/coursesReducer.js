import GET_CURRENT_COURSE from '../types/coursesTypes';

function coursesReducer(state = {}, action) {
  switch (action.type) {
    case GET_CURRENT_COURSE:
      return action.payload;

    default:
      return state;
  }
}

export default coursesReducer;
