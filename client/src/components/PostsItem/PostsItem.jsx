import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './postItem.module.css';
import FavoritesButton from '../FavoritesButton/FavoritesButton';

function PostsItem(props) {
  // PostsItem - карточка для отрисовки превью курса
  // props - для того, чтобы компонент отрисовывал определенный курс
  const {
    id, name, price, type,
  } = props;

  const { currentUser } = useSelector((state) => state);

  return (
    <div className="card-body" style={{ border: '1px solid #000', height: '100%' }}>
      {Object.keys(currentUser).length
        ? <FavoritesButton userId={currentUser.id} courseId={id} />
        : null}
      <Link className={style.postItemLink} to={`/course/${id}`}>
        <h5 className="card-title">
          <span className="mx-1">{name}</span>
        </h5>
        <p className="card-text">
          Цена:
          &nbsp;
          {price}
          {' '}
          руб.
        </p>
        <p className="card-text">
          Форма обучения:
          &nbsp;
          {type}
        </p>
      </Link>
    </div>
  );
}

export default React.memo(PostsItem);
