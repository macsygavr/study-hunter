/* eslint-disable max-len */
import axios from 'axios';
import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CoursesTable from '../CoursesTable/CoursesTable';
// import FavoritesButton from '../FavoritesButton/FavoritesButton';
// import { useParams } from 'react-router';
import './organizationInfoPage.css';

function OrganizationInfoPage() {
  const { id } = useParams();
  const [currentOrganization, setCurrentOrganization] = useState([]);
  // const { currentUser } = useSelector((state) => state);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/organization/${id}`)
      .then((res) => setCurrentOrganization(res.data));
  }, []);

  console.log(currentOrganization);

  return (Object.keys(currentOrganization).length ? (
    <div className="container my-organization-container">
      <h2 className="courseInfoPageP" style={{ marginTop: '-50px' }}>{`${currentOrganization.currentOrganization.name} (${currentOrganization.currentOrganizationType.form})`}</h2>
      <p className="courseInfoPageP">
        Описание:
        &nbsp;
        {currentOrganization.currentOrganization.description}
      </p>
      <div style={{ marginLeft: '30px' }}>
        <p className="courseInfoPageP">Курсы</p>
        {currentOrganization.currentOrganizationCourses.map((item) => <CoursesTable courseName={item.name} coursePrice={item.price} courseId={item.id} />)}
      </div>
      <p className="courseInfoPageP">
        Контакты:
        &nbsp;
      </p>
      <p className="courseInfoPageP">
        Адрес:
        &nbsp;
        {currentOrganization.currentOrganization.address}
      </p>
      <p className="courseInfoPageP">
        Тел.:
        &nbsp;
        {currentOrganization.currentOrganization.phone}
      </p>
      <a href={currentOrganization.currentOrganization.site} className="courseInfoPageP postItemLink">
        Сайт:
        &nbsp;
        {currentOrganization.currentOrganization.site}
      </a>
      <p className="courseInfoPageP">
        Почта:
        &nbsp;
        {currentOrganization.currentOrganization.email}
      </p>
    </div>
  ) : (
    null
  )
  );
}

export default OrganizationInfoPage;
