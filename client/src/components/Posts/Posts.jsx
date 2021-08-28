import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PostsItem from '../PostsItem/PostsItem';

function Posts() {
  // Сделана временная имитация результата поиска
  // Будет подтягивание инфы с базы и динамическая рисовка нужного количества постов

  // const dbImitation = [{
  //   id: 1,
  //   organization_id: 1,
  //   name: 'Имя курса',
  //   speciality_id: 1,
  //   price: '100000',
  //   type: 'очное',
  //   description: 'Описание курса',
  // }, {
  //   id: 2,
  //   organization_id: 1,
  //   name: 'Имя курса22',
  //   speciality_id: 12,
  //   price: '120000',
  //   type: 'очное',
  //   description: 'Описание курса',
  // }, {
  //   id: 1,
  //   organization_id: 1,
  //   name: 'Имя курса',
  //   speciality_id: 1,
  //   price: '100000',
  //   type: 'очное',
  //   description: 'Описание курса',
  // }, {
  //   id: 1,
  //   organization_id: 1,
  //   name: 'Имя курса',
  //   speciality_id: 1,
  //   price: '100000',
  //   type: 'очное',
  //   description: 'Описание курса',
  // }, {
  //   id: 1,
  //   organization_id: 1,
  //   name: 'Имя курса',
  //   speciality_id: 1,
  //   price: '100000',
  //   type: 'очное',
  //   description: 'Описание курса',
  // }];

  const [dbImitation, setBdimitation] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3005/')
      .then((res) => setBdimitation(res.data.arrOfCourses));
  }, []);

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
