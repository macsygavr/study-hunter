import {
  GET_CURRENT_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
} from '../types/usersTypes';

function usersReducer(state = {}, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return action.payload;

    case REGISTER_USER_SUCCESS:
      return action.payload;

    case REGISTER_USER_FAIL:
      return {};

    case LOGOUT_USER_SUCCESS:
      return {};

    case LOGOUT_USER_FAIL:
      return state;

    case LOGIN_USER_SUCCESS:
      return action.payload;

    case LOGIN_USER_FAIL:
      return {};

    default:
      return state;
  }
}

export default usersReducer;
