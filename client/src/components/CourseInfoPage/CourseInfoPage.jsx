import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import FavoritesButton from '../FavoritesButton/FavoritesButton';
import './courseInfoPage.css';

function CourseInfoPage() {
  const { id } = useParams();
  const [currentCourse, setCurrentCourse] = useState([]);
  const { currentUser } = useSelector((state) => state);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/course/${id}`)
      .then((res) => setCurrentCourse(res.data));
  }, []);

  return (Object.keys(currentCourse).length ? (
    <div className="container my-container">
      <h2 className="courseInfoPageP" style={{ marginTop: '-50px', display: 'flex', justifyContent: 'space-between' }}>
        {currentCourse.dataValues.name}
        {Object.keys(currentUser).length
          ? <FavoritesButton styleProp="btn btn-light" userId={currentUser.id} courseId={currentCourse.dataValues.id} />
          : null}
      </h2>
      <h4 className="courseInfoPageP">
        Цена обучения:
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
        <Link className="postItemLink" to={`/organization/${currentCourse.dataValues.OrganizationId}`}>
          {currentCourse.organization}
        </Link>
      </p>
      <p className="courseInfoPageP">
        Описание:
        &nbsp;
        {currentCourse.dataValues.description}
      </p>
    </div>
  ) : (
    null
  )
  );
}

export default CourseInfoPage;
