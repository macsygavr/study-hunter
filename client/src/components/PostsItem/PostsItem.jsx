import React from 'react';
// import { Link } from 'react-router-dom';

function PostsItem(props) {
  // PostsItem - карточка для отрисовки превью заведения или курса
  // Изображение заведения, заголовок, краткое описание, ссылка на страницу заведения/курса
  const {
    name, price, type, description,
  } = props;
  return (
    <div className="m-5 d-flex justify-content-center">
      <div className="card p-3" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{type}</p>
          <p className="card-text">{price}</p>
          <p className="card-text">{description}</p>
          {/* Все это завернуто в линк на подробную страницу организации
          <Link to="/course/${id}" /> */}
        </div>
      </div>
    </div>
  );
}

export default React.memo(PostsItem);
