import React from 'react';
import PostsItem from '../PostsItem/PostsItem';

function Posts() {
  // Будет подтягивание инфы с базы и динамическая рисовка нужного количества постов
  // map
  return (
    <div className="container">
      <div className="row justify-content-start">
        <div className="col-4 my-3 d-flex justify-content-center"><PostsItem /></div>
        <div className="col-4 my-3 d-flex justify-content-center"><PostsItem /></div>
        <div className="col-4 my-3 d-flex justify-content-center"><PostsItem /></div>
      </div>
      <div className="row justify-content-start">
        <div className="col-4 my-3 d-flex justify-content-center"><PostsItem /></div>
        <div className="col-4 my-3 d-flex justify-content-center"><PostsItem /></div>
        {/* <div className="col-4 my-3 d-flex justify-content-center"><PostsItem /></div> */}
      </div>
    </div>
  );
}

export default React.memo(Posts);
