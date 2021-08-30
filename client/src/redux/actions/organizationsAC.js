import axios from 'axios';
import {
  LOGIN_ORGANIZATION_FAIL,
  LOGIN_ORGANIZATION_SUCCESS,
  REGISTER_ORGANIZATION_FAIL,
  REGISTER_ORGANIZATION_SUCCESS,
} from '../types/organizationsTypes';

// organization registration
export const registerOrganizationSuccess = (currentOrganization) => ({
  type: REGISTER_ORGANIZATION_SUCCESS,
  payload: currentOrganization,
});

export const registerOrganizationFail = () => ({
  type: REGISTER_ORGANIZATION_FAIL,
});

// eslint-disable-next-line max-len
export const registerOrganizationStart = (name, phone, email, form, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/signup/organization`, {
      name, phone, email, form, password,
    }, { withCredentials: true });
    console.log(response.data);
    dispatch(registerOrganizationSuccess(response.data));
  } catch {
    console.log('unable to register organization');
    dispatch(registerOrganizationFail());
  }
};

// organization login
export const loginOrganizationSuccess = (currentOrganization) => ({
  type: LOGIN_ORGANIZATION_SUCCESS,
  payload: currentOrganization,
});

export const loginOrganizationFail = () => ({
  type: LOGIN_ORGANIZATION_FAIL,
});

export const loginOrganizationStart = (email, password) => async (dispatch) => {
  try {
    const response = axios.post(`${process.env.REACT_APP_SERVER_URL}/signin/organization`, {
      email, password,
    }, { withCredentials: true });
    dispatch(loginOrganizationSuccess(response.data));
  } catch {
    console.log('unable to login as organization');
    dispatch(loginOrganizationFail());
  }
};
