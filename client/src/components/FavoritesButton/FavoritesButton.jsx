import React from 'react';
import { useDispatch } from 'react-redux';
import renderStarIconEmpty from './renderStarIconEmpty';
import { addToFavUserStart } from '../../redux/actions/usersAC';

function FavotiresButton({ userId, courseId }) {
  const dispatch = useDispatch();

  const addToFavHandler = () => {
    dispatch(addToFavUserStart(userId, courseId));
  };

  return (
    <button onClick={addToFavHandler} type="button" className="btn btn-light m-1 position-absolute top-0 end-0">
      {renderStarIconEmpty()}
    </button>
  );
}

export default React.memo(FavotiresButton);
