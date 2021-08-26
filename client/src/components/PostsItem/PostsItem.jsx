import React from 'react';
// import { Link } from 'react-router-dom';

function PostsItem() {
  // PostsItem - карточка для отрисовки превью заведения или курса
  // Изображение заведения, заголовок, краткое описание, ссылка на страницу заведения/курса
  return (
    <div className="card p-3" style={{ width: '18rem' }}>
      <img src="https://memepedia.ru/wp-content/uploads/2020/09/68esjoi4sja-%E2%80%94-kopija.jpg" className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Название курса/заведения</h5>
        <p className="card-text">Описание курса/заведения</p>
        {/* <Link to="/organization/id" className="btn btn-primary">Подробнее</Link> */}
        {/* Link для перехода на подробную страницу заведения/курса */}
      </div>
    </div>
  );
}

export default React.memo(PostsItem);
