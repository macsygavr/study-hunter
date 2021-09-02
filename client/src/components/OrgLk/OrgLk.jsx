/* eslint-disable no-nested-ternary */
import './orgLk.css';
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
    <div className="container my-container">
      <div className="lkContainer">
        <div className="avatarContainer">
          {file
            ? <img src={`${process.env.REACT_APP_SERVER_URL}${file}`} alt="pic" className="avatar" />
            : <img src="https://www.ucheba.ru/img/userpic-empty-big.png" alt="pic" className="avatar" />}
          <div>
            <label htmlFor="file" className="btn btn-my-primary my-2">
              Обновить фото
              <input className="input-file form-control" type="file" name="filedata" id="file" onChange={(e) => fileSend(e)} style={{ width: '108px', margin: 'auto', display: 'none' }} />
            </label>
          </div>
        </div>
        <div>
          <div className="courseInfoPageP3">
            <div className="title-name moderationSpan">
              <span>
                <h4>
                  {`${currentOrganization.name} (${currentOrganization.OrganizationForm})`}
                  <span>
                    &nbsp;
                    <Link to="/editUser">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe0-ruYIVTiRizPu8o-RjjR1KrGv-mqXJgLQ&usqp=CAU" alt="" width="40px" />
                    </Link>
                  </span>
                </h4>
              </span>
              <span>
                {currentOrganization.is_checked
                  ? null
                  : <span style={{ color: 'orange', fontSize: '15px' }}>Заявка находится на рассмотрении модератора</span>}
              </span>
            </div>
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
      <div className="courseInfoPageP2">
        <h3 style={{ textAlign: 'left' }}>
          {currentOrganization.is_checked && currentOrganization.is_allowed
            ? (
              <div className="addCoursesTitleDiv">
                {' '}
                <span>Текущие направления</span>
                <button onClick={addCourseButtonHandler} type="button" className="btn btn-my-primary">Добавить направление</button>
              </div>
            )
            : <span>Статус регистрации</span>}
        </h3>
        {isModalOpened ? (
          <Modal setIsModalOpened={setIsModalOpened} orgId={currentOrganization.id} />
        ) : null}
        <hr style={{ marginTop: 0 }} />
        {currentOrganization.is_allowed
          ? (
            <div>
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
              <div>
                <div>Отклики пользователей</div>
                <hr />
              </div>
            </div>
          ) : currentOrganization.is_checked ? 'Заявка отклонена модератором' : 'Заявка находится на рассмотрении модератора'}
      </div>
    </div>
  );
}

export default React.memo(OrgLk);
