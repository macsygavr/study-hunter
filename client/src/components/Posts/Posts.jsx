import React from 'react';
import PostsItem from '../PostsItem/PostsItem';

function Posts({ resultToRender }) {
  // console.log('result--->', resultOnRequest);
  // через props компонент Posts будет получать массив постов, который ему нужно будет отрисовать
  // если прилетает пустой пропс, то рисуем, что постов нет или можно вообще ничего не рисовать
  const renderPosts = () => (resultToRender && resultToRender.length
    ? resultToRender.map((post) => (
      <div className="col-12 col-sm-6 col-md-4 mb-4" key={post.id}><PostsItem {...post} /></div>
    ))
    : (<div>Здесь пока нет постов</div>));

  return (
    <div className="container mb-5 p-0">
      <div className="row">
        {renderPosts()}
      </div>
    </div>
  );
}

export default React.memo(Posts);
