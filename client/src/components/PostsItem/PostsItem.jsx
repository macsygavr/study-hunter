import React from 'react';
// import { Link } from 'react-router-dom';

function PostsItem(props) {
  // PostsItem - карточка для отрисовки превью заведения или курса
  // Изображение заведения, заголовок, краткое описание, ссылка на страницу заведения/курса
  const {
    photo, name, type, priceRange,
  } = props;
  return (
    <div className="m-5 d-flex justify-content-center">
      <div className="card p-3" style={{ width: '18rem' }}>
        <img src={photo} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{type}</p>
          <p className="card-text">{priceRange}</p>
          {/* <Link to={`/organization/${id}`} className="btn btn-primary">Подробнее</Link> */}
          {/* Link для перехода на подробную страницу заведения/курса */}
        </div>
      </div>
    </div>
  );
}

export default React.memo(PostsItem);
