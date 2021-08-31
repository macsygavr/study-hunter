import { combineReducers } from 'redux';
import coursesReducer from './coursesReducer';
import searchReducer from './searchReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  currentUser: usersReducer,
  currentCourse: coursesReducer,
  searchResult: searchReducer,
});

export default rootReducer;
