import axios from 'axios';
import GET_CURRENT_SEARCH_RESULT from '../types/searchTypes';

export const getCurrentSearchResultStart = (speciality, price, type) => (dispatch) => {
    // axios.get(`http://localhost:3005/rooms/${id}`)
    //   .then(res => dispatch(getCurrentRoomDevices(res.data)));
};

export function getCurrentSearchResult(currentSearchResult) {
  return {
    type: GET_CURRENT_SEARCH_RESULT,
    payload: currentSearchResult,
  };
}
