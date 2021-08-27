import { GET_CURRENT_USER, REGISTER_USER_FAIL, REGISTER_USER_SUCCESS } from '../types/usersTypes';

function usersReducer(state = {}, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return action.payload;

    case REGISTER_USER_SUCCESS:
      return action.payload;

    case REGISTER_USER_FAIL:
      return {};

    default:
      return state;
  }
}

export default usersReducer;
