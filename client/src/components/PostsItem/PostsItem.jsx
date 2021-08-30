import React from 'react';
import { useSelector } from 'react-redux';
import FavoritesButton from '../FavoritesButton/FavoritesButton';
// import { Link } from 'react-router-dom';

function PostsItem(props) {
  // PostsItem - карточка для отрисовки превью курса
  // props - для того, чтобы компонент отрисовывал определенный курс
  const {
    id, name, price, type, description,
  } = props;

  const { currentUser } = useSelector((state) => state);

  return (
    <div className="m-5 d-flex justify-content-center">
      <div
        className="card p-3"
        style={{
          width: '18rem', height: '25rem', overflowY: 'auto',
        }}
      >
        <div className="card-body">
          <h5 className="card-title">
            <span className="mx-1">{name}</span>
          </h5>
          {Object.keys(currentUser).length
            ? <FavoritesButton userId={currentUser.id} courseId={id} />
            : null}
          <p className="card-text">{type}</p>
          <p className="card-text">
            Цена:
            &nbsp;
            {price}
            {' '}
            руб.
          </p>
          <p className="card-text">{description}</p>
          {/* Все это завернуто в линк на подробную страницу курса
          <Link to="/course/${id}" /> */}
        </div>
      </div>
    </div>
  );
}

export default React.memo(PostsItem);
