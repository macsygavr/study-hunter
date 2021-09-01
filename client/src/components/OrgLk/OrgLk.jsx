/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CoursesTable from '../CoursesTable/CoursesTable';
import Modal from '../Modal/Modal';

function OrgLk() {
  const [file, setFile] = useState(null);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const { currentOrganization } = useSelector((state) => state);
  console.log(currentOrganization);
  useEffect(() => {
    setFile(currentOrganization.logo);
  }, [currentOrganization.logo]);

  const fileSend = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const imagefile = document.querySelector('#file');

    formData.append('orgPhotoId', currentOrganization.id);
    formData.append('filedata', imagefile.files[0]);

    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/upload`, formData, { withCredentials: true });
    if (response.data) {
      setFile(response.data);
    }
  };

  const addCourseButtonHandler = () => {
    setIsModalOpened((state) => !state);
  };

  return (
    <div className="lk">
      <h4 style={{ marginBottom: '40px', width: '1000px' }}>Личный кабинет</h4>
      <div className="lk__content">
        <div className="lk__photo">
          {file
            ? <img src={`${process.env.REACT_APP_SERVER_URL}${file}`} alt="pic" style={{ borderRadius: '50%', height: '100%' }} />
            : <img src="https://www.ucheba.ru/img/userpic-empty-big.png" alt="pic" />}
          <input className="input-file" type="file" name="filedata" id="file" onChange={(e) => fileSend(e)} />
        </div>
        <div>
          <div className="container d-flex flex-column align-items-start">
            {currentOrganization.is_checked
              ? null
              : <p style={{ color: 'red' }}>Еще не одобрено</p>}
            <h2 className="title-name">
              {`${currentOrganization.name} (${currentOrganization.OrganizationForm})`}
              <span>
                &nbsp;
                <Link to="/editUser">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe0-ruYIVTiRizPu8o-RjjR1KrGv-mqXJgLQ&usqp=CAU" alt="" width="40px" />
                </Link>
              </span>
            </h2>
            <p style={{ textAlign: 'start' }}>Описание:</p>
            <p style={{ textAlign: 'start' }}>{`${currentOrganization.description ? currentOrganization.description : 'Не указано'}`}</p>
            <div style={{ textAlign: 'start' }}>
              <p>Контакты:</p>
              <p>{`Адрес: ${currentOrganization.address ? currentOrganization.address : 'Не указано'}`}</p>
              <p>{`Тел.: ${currentOrganization.phone}`}</p>
              <p>{`Сайт: ${currentOrganization.site ? currentOrganization.site : 'Не указано'}`}</p>
              <p>{`Почта: ${currentOrganization.email}`}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="d-flex justify-content-between">
          { currentOrganization.is_checked && currentOrganization.is_allowed
            ? (
              <div>
                {' '}
                <span>Текущие направления</span>
                <button onClick={addCourseButtonHandler} type="button" className="btn btn-primary">Добавить направление</button>
              </div>
            )
            : <span>Статус регистрации</span> }
        </h3>
        {isModalOpened ? (
          <Modal setIsModalOpened={setIsModalOpened} orgId={currentOrganization.id} />
        ) : null}
        <hr style={{ marginBottom: '40px' }} />
        { currentOrganization.is_allowed
          ? (
            <div style={{ marginLeft: '30px' }}>
              {Object.keys(currentOrganization).length
                ? currentOrganization.OrganizationCourses.map((course) => (
                  <CoursesTable
                    key={course.id}
                    courseName={course.name}
                    coursePrice={course.price}
                    courseId={course.id}
                  />
                )) : 'Здесь пока ничего нет' }
            </div>
          ) : currentOrganization.is_checked ? 'Заявка отклонена модератором' : 'Заявка находится на рассмотрении модератора'}
      </div>
    </div>
  );
}

export default React.memo(OrgLk);
