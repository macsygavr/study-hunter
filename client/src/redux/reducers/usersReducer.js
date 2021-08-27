import GET_CURRENT_USER from '../types/usersTypes';

function usersReducer(state = {}, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return action.payload;

    default:
      return state;
  }
}

export default usersReducer;
