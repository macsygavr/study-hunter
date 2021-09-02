/* eslint-disable max-len */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import FavoritesButton from '../FavoritesButton/FavoritesButton';
import RequestsButton from '../RequestsButton/RequestsButton';
import './courseInfoPage.css';

function CourseInfoPage() {
  const { id } = useParams();
  const [currentCourse, setCurrentCourse] = useState(null);
  const { currentUser } = useSelector((state) => state);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/course/${id}`)
      .then((res) => setCurrentCourse(res.data));
  }, []);

  return currentCourse ? (
    <div className="container my-container">
      <div className="avatarContainer2">
        {currentCourse.organizationLogo
          ? <img src={`${process.env.REACT_APP_SERVER_URL}${currentCourse.organizationLogo}`} alt="pic" className="avatar2" />
          : <img src="https://www.ucheba.ru/img/userpic-empty-big.png" alt="pic" className="avatar2" />}
      </div>
      <h2 className="courseInfoPageP0" style={{ marginTop: '15px' }}>
        <span>
          {currentCourse.dataValues.name}
        </span>
        {currentUser && <FavoritesButton userId={currentUser.id} courseId={currentCourse.dataValues.id} />}
      </h2>
      <h4 className="courseInfoPageP">
        Стоимость обучения:
        &nbsp;
        {currentCourse.dataValues.price}
        &nbsp;
        руб.
      </h4>
      <p className="courseInfoPageP">
        Форма обучения:
        &nbsp;
        {currentCourse.form}
      </p>
      <p className="courseInfoPageP">
        Учебное заведение:
        &nbsp;
        <Link className="postItemLink" to={`/organization/${currentCourse.dataValues?.OrganizationId}`}>
          {currentCourse.organizationName}
        </Link>
      </p>
      <div className="courseInfoPageP2">
        <h3 style={{ textAlign: 'left' }}>Описание</h3>
        <hr style={{ marginTop: 0 }} />
        <div className="courseInfoPageP3">
          <p style={{ textAlign: 'start' }}>
            &nbsp;
            {currentCourse.dataValues.description}
          </p>
        </div>
        <div>
          <RequestsButton userId={currentUser?.id} courseId={currentCourse.dataValues?.id} />
        </div>
      </div>
    </div>
  ) : (
    null
  );
}

export default React.memo(CourseInfoPage);
