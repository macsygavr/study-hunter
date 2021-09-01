import {
  GET_CURRENT_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  ADD_TO_FAV_USER_SUCCESS,
  ADD_TO_FAV_USER_FAIL,
  REMOVE_FROM_FAV_USER_SUCCESS,
  REMOVE_FROM_FAV_USER_FAIL,
  ADD_REQUEST_USER_SUCCESS,
  ADD_REQUEST_USER_FAIL,
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

    case ADD_TO_FAV_USER_SUCCESS:
      return {
        ...state,
        favorites: action.payload,
      };

    case ADD_TO_FAV_USER_FAIL:
      return {
        ...state,
      };

    case REMOVE_FROM_FAV_USER_SUCCESS:
      return {
        ...state,
        favorites: action.payload,
      };

    case REMOVE_FROM_FAV_USER_FAIL:
      return {
        ...state,
      };

    case ADD_REQUEST_USER_SUCCESS:
      return {
        ...state,
        requests: action.payload,
      };

    case ADD_REQUEST_USER_FAIL:
      return state;

    default:
      return state;
  }
}

export default usersReducer;
