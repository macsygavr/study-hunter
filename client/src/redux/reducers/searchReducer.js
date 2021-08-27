import GET_CURRENT_SEARCH_RESULT from '../types/searchTypes';

function searchReducer(state = [], action) {
  switch (action.type) {
    case GET_CURRENT_SEARCH_RESULT:
      return action.payload;

    default:
      return state;
  }
}

export default searchReducer;
