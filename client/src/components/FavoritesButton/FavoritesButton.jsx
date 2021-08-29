import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import renderStarIconEmpty from './renderStarIconEmpty';
import { addToFavUserStart, removeFromFavUserStart } from '../../redux/actions/usersAC';
import renderStarIconFilled from './renderStarIconFilled';

function FavoritesButton({ userId, courseId }) {
  const dispatch = useDispatch();

  const { favorites } = useSelector((state) => state.currentUser);
  const [currentFavorite] = favorites.filter((course) => course.id === courseId);

  const addToFavHandler = () => {
    dispatch(addToFavUserStart(userId, courseId));
  };

  const removeFromFavHandler = () => {
    dispatch(removeFromFavUserStart(userId, courseId));
  };

  const renderButton = () => {
    if (currentFavorite) {
      return (
        <button onClick={removeFromFavHandler} type="button" className="btn btn-light m-1 position-absolute top-0 end-0">
          {renderStarIconFilled()}
        </button>
      );
    } return (
      <button onClick={addToFavHandler} type="button" className="btn btn-light m-1 position-absolute top-0 end-0">
        {renderStarIconEmpty()}
      </button>
    );
  };

  return (
    <>
      {renderButton()}
    </>
  );
}

export default React.memo(FavoritesButton);
