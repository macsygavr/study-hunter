/* eslint-disable max-len */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CoursesTable from '../CoursesTable/CoursesTable';
import './organizationInfoPage.css';

function OrganizationInfoPage() {
  const { id } = useParams();
  const [currentOrganization, setCurrentOrganization] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/organization/${id}`)
      .then((res) => setCurrentOrganization(res.data));
  }, []);

  return (Object.keys(currentOrganization).length ? (
    <div className="container my-organization-container">
      <h2 className="courseInfoPageP">{`${currentOrganization.currentOrganization.name} (${currentOrganization.currentOrganizationType.form})`}</h2>
      <p className="courseInfoPageP2">
        <h3 style={{ textAlign: 'left' }}>Описание</h3>
        <hr style={{ marginTop: 0 }} />
        <div className="courseInfoPageP3">
          <p style={{ textAlign: 'start' }}>
            &nbsp;
            {currentOrganization.currentOrganization.description}
          </p>
        </div>
      </p>
      <div className="courseInfoPageP2">
        <h3 style={{ textAlign: 'left' }}>Курсы</h3>
        <hr style={{ marginTop: 0 }} />
        {currentOrganization.currentOrganizationCourses.map((item) => <CoursesTable key={item.id} courseName={item.name} coursePrice={item.price} courseId={item.id} />)}
      </div>
      <div className="courseInfoPageP2">
        <h3 style={{ textAlign: 'left' }}>Контакты</h3>
        <hr style={{ marginTop: 0 }} />
        <div className="courseInfoPageP3">
          <p>
            Адрес:
            &nbsp;
            {currentOrganization.currentOrganization.address}
          </p>
          <p>
            Тел.:
            &nbsp;
            {currentOrganization.currentOrganization.phone}
          </p>
          <p>
            Сайт:
            <a href={currentOrganization.currentOrganization.site} className="postItemLink">
              &nbsp;
              {currentOrganization.currentOrganization.site}
            </a>
          </p>
          <p>
            Почта:
            &nbsp;
            {currentOrganization.currentOrganization.email}
          </p>
        </div>
      </div>
    </div>
  ) : (
    null
  )
  );
}

export default OrganizationInfoPage;
