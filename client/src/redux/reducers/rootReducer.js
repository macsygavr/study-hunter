import { combineReducers } from 'redux';
import coursesReducer from './coursesReducer';
import searchReducer from './searchReducer';
import usersReducer from './usersReducer';
import organizationsReducer from './organizationsReducer';

const rootReducer = combineReducers({
  currentUser: usersReducer,
  currentOrganization: organizationsReducer,
  currentCourse: coursesReducer,
  searchResult: searchReducer,
});

export default rootReducer;
