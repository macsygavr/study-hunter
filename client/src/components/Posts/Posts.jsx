import React from 'react';
import PostsItem from '../PostsItem/PostsItem';

function Posts() {
  // Сделана временная имитация результата поиска
  // Будет подтягивание инфы с базы и динамическая рисовка нужного количества постов

  const dbImitation = [{
    id: 1,
    name: 'MGU',
    location: 'Moscow',
    type: 'University',
    photo: 'https://memepedia.ru/wp-content/uploads/2020/09/68esjoi4sja-%E2%80%94-kopija.jpg',
    priceRange: '100000-150000',
  },
  {
    id: 2,
    name: 'MGTU',
    location: 'Moscow',
    type: 'University',
    photo: 'https://memepedia.ru/wp-content/uploads/2020/09/68esjoi4sja-%E2%80%94-kopija.jpg',
    priceRange: '100000-150000',
  },
  {
    id: 3,
    name: 'MPU',
    location: 'Moscow',
    type: 'College',
    photo: 'https://memepedia.ru/wp-content/uploads/2020/09/68esjoi4sja-%E2%80%94-kopija.jpg',
    priceRange: '100000-150000',
  },
  {
    id: 4,
    name: 'PGU',
    location: 'Moscow',
    type: 'University',
    photo: 'https://memepedia.ru/wp-content/uploads/2020/09/68esjoi4sja-%E2%80%94-kopija.jpg',
    priceRange: '100000-150000',
  },
  {
    id: 5,
    name: 'MTGU',
    location: 'Moscow',
    type: 'University',
    photo: 'https://memepedia.ru/wp-content/uploads/2020/09/68esjoi4sja-%E2%80%94-kopija.jpg',
    priceRange: '100000-150000',
  },
  {
    id: 6,
    name: 'MGUP',
    location: 'Moscow',
    type: 'College',
    photo: 'https://memepedia.ru/wp-content/uploads/2020/09/68esjoi4sja-%E2%80%94-kopija.jpg',
    priceRange: '100000-150000',
  }];

  const renderPosts = () => dbImitation.map((post) => (
    <div key={post.id}><PostsItem {...post} /></div>
  ));

  return (
    <div className="d-flex flex-wrap justify-content-start">
      {renderPosts()}
    </div>
  );
}

export default React.memo(Posts);
