/* eslint-disable no-nested-ternary */
import './orgLk.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CoursesTable from '../CoursesTable/CoursesTable';
import Modal from '../Modal/Modal';
import Requests from '../Requests/Requests';
import phoneMask from '../../utils/phoneMask';

function OrgLk() {
  const [file, setFile] = useState(null);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [toggleState, setToogleState] = useState(1);

  const { currentOrganization } = useSelector((state) => state);
  useEffect(() => {
    if (currentOrganization?.logo) {
      setFile(currentOrganization.logo);
    }
  }, [currentOrganization]);

  const fileSend = async (e) => {
    if (!currentOrganization) return;
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

  if (!currentOrganization) {
    return null;
  }

  return (
    <div className="container my-container">
      <div className="lkContainer">
        <div className="avatarContainer">
          <img src={file ? `${process.env.REACT_APP_SERVER_URL}${file}` : 'https://www.ucheba.ru/img/userpic-empty-big.png'} alt="pic" className="avatar" />
          <div>
            <label htmlFor="file" className="btn btn-my-primary my-2">
              Обновить фото
              <input className="input-file form-control" type="file" name="filedata" id="file" onChange={(e) => fileSend(e)} style={{ width: '108px', margin: 'auto', display: 'none' }} />
            </label>
          </div>
        </div>
        <div className="courseInfoPageP3">
          <div className="title-name moderationSpan">
            <span>
              <h4>
                {`${currentOrganization.name} (${currentOrganization.OrganizationForm})`}
              </h4>
            </span>
            &nbsp;
            &nbsp;
            <span>
              {currentOrganization.is_checked
                ? null
                : <span style={{ color: 'orange', fontSize: '15px' }}>Заявка на регистрацию на рассмотрении у модератора</span>}
            </span>
          </div>
          <p style={{ textAlign: 'start' }}>Описание:</p>
          <p style={{ textAlign: 'start' }}>{`${currentOrganization.description ? currentOrganization.description : 'Не указано'}`}</p>
          <div style={{ textAlign: 'start' }}>
            <p>Контакты:</p>
            <p>{`Адрес: ${currentOrganization.address ? currentOrganization.address : 'Не указано'}`}</p>
            <p>{`Телeфон: ${phoneMask(currentOrganization.phone)}`}</p>
            <p>{`Сайт: ${currentOrganization.site ? currentOrganization.site : 'Не указано'}`}</p>
            <p>{`Почта: ${currentOrganization.email}`}</p>
          </div>
        </div>
      </div>
      {currentOrganization.is_allowed && currentOrganization.is_checked ? (
        <div className="courseInfoPageP2">
          <div className="tabs">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <>
                  <button className={toggleState === 1 ? 'nav-link active postItemLink2' : 'nav-link postItemLink2'} onClick={() => setToogleState(1)} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Текущие направления</button>
                  <button className={toggleState === 2 ? 'nav-link active postItemLink2' : 'nav-link postItemLink2'} onClick={() => setToogleState(2)} id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Отклики пользователей</button>
                </>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div className={toggleState === 1 ? 'tab-pane fade show active' : 'tab-pane fade'} id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <div className="courseInfoPageP2">
                  <div className="addCoursesTitleDiv">
                    <h3 style={{ textAlign: 'left' }}>Текущие направления</h3>
                    <button onClick={addCourseButtonHandler} type="button" className="btn btn-my-primary">Добавить направление</button>
                  </div>
                  <hr style={{ marginTop: '5px' }} />
                </div>
                <div className="courseInfoPageP2">
                  {isModalOpened ? (
                    <Modal setIsModalOpened={setIsModalOpened} orgId={currentOrganization.id} />
                  ) : null}
                  <div style={{ marginTop: '-28px' }}>
                    {currentOrganization
                      ? currentOrganization.OrganizationCourses?.map((course) => (
                        <CoursesTable
                          key={course.id}
                          courseName={course.name}
                          coursePrice={course.price}
                          courseId={course.id}
                        />
                      )) : 'Здесь пока ничего нет' }
                  </div>
                </div>
              </div>
              <div className={toggleState === 2 ? 'tab-pane fade show active' : 'tab-pane fade'} id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                <div className="courseInfoPageP2">
                  <div className="courseInfoPageP1">
                    <h3 style={{ textAlign: 'left' }}>Отклики пользователей</h3>
                    <hr style={{ marginTop: '13px', marginBottom: '20px' }} />
                    <div>
                      <Requests requestsToRender={currentOrganization.OrganizationRequests} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        null
      )}
      {currentOrganization.is_checked && !currentOrganization.is_allowed ? (
        <div style={{ paddingBottom: '30px' }}>
          <span>Заявка отклонена модератором</span>
          <br />
          <span>
            <a className="postItemLink" href="email:sa@sh.ru">sa@sh.ru</a>
            {' '}
            - для связи с модератором
          </span>
        </div>
      ) : null}
    </div>
  );
}

export default React.memo(OrgLk);
