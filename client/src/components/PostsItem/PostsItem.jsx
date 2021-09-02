import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './postItem.css';
import FavoritesButton from '../FavoritesButton/FavoritesButton';
import RequestsButton from '../RequestsButton/RequestsButton';

function PostsItem(props) {
  // PostsItem - карточка для отрисовки превью курса
  // props - для того, чтобы компонент отрисовывал определенный курс
  const {
    id, name, price, type,
  } = props;

  const { currentUser } = useSelector((state) => state);

  return (currentUser?.superadmin ? (
    <>
      <div className="card-body card-my-style">
        <Link className="postItemHomeLink" to={`/course/${id}`}>
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
    </>
  )
    : (
      <>
        <div className="card-body card-my-style">
          <div>
            {currentUser
              ? (
                <div className="favoriteButtonDiv">
                  <FavoritesButton userId={currentUser.id} courseId={id} />
                </div>
              )
              : null}
            <Link className="postItemHomeLink" to={`/course/${id}`}>
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
          <div>
            <RequestsButton userId={currentUser?.id} courseId={id} courseName={name} />
          </div>
        </div>
      </>
    )
  );
}

export default React.memo(PostsItem);
