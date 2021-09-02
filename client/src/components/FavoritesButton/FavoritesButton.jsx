import './favoritesButton.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import renderStarIconEmpty from './renderStarIconEmpty';
import { addToFavUserStart, removeFromFavUserStart } from '../../redux/actions/usersAC';
import renderStarIconFilled from './renderStarIconFilled';

function FavoritesButton({ userId, courseId, styleProp }) {
  const dispatch = useDispatch();

  const { favorites } = useSelector((state) => state.currentUser);
  // eslint-disable-next-line max-len
  const [currentFavorite] = favorites ? favorites.filter((course) => course.id === courseId) : null;

  const addToFavHandler = () => {
    dispatch(addToFavUserStart(userId, courseId));
  };

  const removeFromFavHandler = () => {
    dispatch(removeFromFavUserStart(userId, courseId));
  };

  const renderButton = () => {
    if (currentFavorite) {
      return (
        <button onClick={removeFromFavHandler} type="button" className={styleProp || 'favoriteButton'}>
          {renderStarIconFilled()}
        </button>
      );
    } return (
      <button onClick={addToFavHandler} type="button" className={styleProp || 'favoriteButton'}>
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
