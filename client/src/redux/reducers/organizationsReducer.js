import {
  LOGIN_ORGANIZATION_FAIL,
  LOGIN_ORGANIZATION_SUCCESS,
  LOGOUT_ORGANIZATION_FAIL,
  LOGOUT_ORGANIZATION_SUCCESS,
  REGISTER_ORGANIZATION_FAIL,
  REGISTER_ORGANIZATION_SUCCESS,
} from '../types/organizationsTypes';

function organizationsReducer(state = {}, action) {
  switch (action.type) {
    case REGISTER_ORGANIZATION_SUCCESS:
      return { ...action.payload, error: false };

    case REGISTER_ORGANIZATION_FAIL:
      return { ...state, error: true };

    case LOGIN_ORGANIZATION_SUCCESS:
      return { ...action.payload, error: false };

    case LOGIN_ORGANIZATION_FAIL:
      return { ...state, error: true };

    case LOGOUT_ORGANIZATION_SUCCESS:
      return {};

    case LOGOUT_ORGANIZATION_FAIL:
      return state;

    default:
      return state;
  }
}

export default organizationsReducer;
