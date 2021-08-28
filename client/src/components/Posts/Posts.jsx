import React from 'react';
import PostsItem from '../PostsItem/PostsItem';

function Posts({ resultToRender }) {
  // через props компонент Posts будет получать массив постов, который ему нужно будет отрисовать
  // если прилетает пустой пропс, от рисуем, что постов нет или можно вообще ничего не рисовать

  const renderPosts = () => (resultToRender && resultToRender.length
    ? resultToRender.map((post) => (
      <div key={post.id}><PostsItem {...post} /></div>
    ))
    : <div>Здесь пока нет постов</div>);
  return (
    <div className="d-flex flex-wrap justify-content-around" style={{ width: '80vw' }}>
      {renderPosts()}
    </div>
  );
}

export default React.memo(Posts);
