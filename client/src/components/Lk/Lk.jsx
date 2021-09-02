/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import './lk.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Posts from '../Posts/Posts';
import UserList from '../UserList/UserList';
import RegisterList from '../RegisterList/RegisterList';
import UserSearch from '../UserSearch/UserSearch';

export default function Lk() {
  const [file, setFile] = useState(null);
  const currentUser = useSelector((state) => state.currentUser);
  const [currentFavorites, setCurrentFavorites] = useState([]);
  const [isUser, setIsUser] = useState(false);
  const [toggleState, setToogleState] = useState(currentUser.superadmin ? 3 : 1);
  useEffect(() => {
    setCurrentFavorites(currentUser.favorites);
  }, [isUser]);

  useEffect(() => {
    if (Object.keys(currentUser).length) setIsUser(true);
  }, [currentUser]);

  useEffect(() => {
    setFile(currentUser.logo);
  }, [currentUser.logo]);
  const fileSend = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const imagefile = document.querySelector('#file');

    formData.append('userPhotoId', currentUser.id);
    formData.append('filedata', imagefile.files[0]);

    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/upload`, formData, { withCredentials: true });
    // setFile(`${process.env.REACT_APP_SERVER_URL}${response.data}`);
    if (response.data) {
      setFile(response.data);
    }
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
        <div className="courseInfoPageP3">
          <h2 className="title-name">
            {`${currentUser.firstName} ${currentUser.lastName}`}
            <span>
              &nbsp;
              <span style={{ color: 'orange', fontSize: '15px' }}>{(currentUser.admin && currentUser.superadmin) ? 'superadmin' : currentUser.admin ? 'admin' : ''}</span>
            </span>
          </h2>
          <p>{currentUser.phone}</p>
          <p>{currentUser.email}</p>
        </div>
      </div>
      <div className="courseInfoPageP2">
        <div className="tabs">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              {currentUser.superadmin ? (
                <>
                  <button className={toggleState === 3 ? 'nav-link active postItemLink2' : 'nav-link postItemLink2'} onClick={() => setToogleState(3)} type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Заявки учебных заведений</button>
                  <button className={toggleState === 4 ? 'nav-link active postItemLink2' : 'nav-link postItemLink2'} onClick={() => setToogleState(4)} type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Администраторы</button>
                  <button className={toggleState === 5 ? 'nav-link active postItemLink2' : 'nav-link postItemLink2'} onClick={() => setToogleState(5)} type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Поиск пользователей</button>
                </>
              ) : (
                currentUser.admin ? (
                  <>
                    <button className={toggleState === 1 ? 'nav-link active postItemLink2' : 'nav-link postItemLink2'} onClick={() => setToogleState(1)} type="button" role="tab" aria-controls="nav-home" aria-selected="true">Избранное</button>
                    <button className={toggleState === 2 ? 'nav-link active postItemLink2' : 'nav-link postItemLink2'} onClick={() => setToogleState(2)} type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Отклики</button>
                    <button className={toggleState === 3 ? 'nav-link active postItemLink2' : 'nav-link postItemLink2'} onClick={() => setToogleState(3)} type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Заявки учебных заведений</button>
                  </>
                ) : (
                  <>
                    <button className={toggleState === 1 ? 'nav-link active postItemLink2' : 'nav-link postItemLink2'} onClick={() => setToogleState(1)} type="button" role="tab" aria-controls="nav-home" aria-selected="true">Избранное</button>
                    <button className={toggleState === 2 ? 'nav-link active postItemLink2' : 'nav-link postItemLink2'} onClick={() => setToogleState(2)} type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Отклики</button>
                  </>
                )
              )}
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div className={toggleState === 1 ? 'tab-pane fade show active' : 'tab-pane fade'} id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
              <div className="courseInfoPageP2">
                <h3 style={{ textAlign: 'left' }}>Избранное</h3>
                <hr style={{ marginTop: 0 }} />
                {currentUser.favorites ? (
                  currentUser.favorites.length ? (
                    <div className="courseInfoPageP3">
                      <Posts resultToRender={currentFavorites} />
                    </div>
                  )
                    : (
                      <div className="ButtonDreamSearchDiv">
                        <Link to="/">
                          <button type="button" className="myLinkButton">Найти курс мечты!</button>
                        </Link>
                      </div>
                    )
                ) : null }
              </div>
            </div>
            <div className={toggleState === 2 ? 'tab-pane fade show active' : 'tab-pane fade'} id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
              <div className="courseInfoPageP2">
                <h3 style={{ textAlign: 'left' }}>Отклики</h3>
                <hr style={{ marginTop: 0 }} />
                {currentUser.requests ? (
                  currentUser.requests.length ? (
                    <div className="courseInfoPageP3">
                      <Posts resultToRender={currentUser.requests} />
                    </div>
                  )
                    : (
                      <div className="ButtonDreamSearchDiv">
                        <Link to="/">
                          <button type="button" className="myLinkButton">Найти курс мечты!</button>
                        </Link>
                      </div>
                    )
                ) : null }
              </div>
            </div>
            <div className={toggleState === 3 ? 'tab-pane fade show active' : 'tab-pane fade'} id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
              <div className="courseInfoPageP2">
                { currentUser.admin ? <RegisterList /> : ''}
              </div>
            </div>
            <div className={toggleState === 4 ? 'tab-pane fade show active' : 'tab-pane fade'} id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
              <div className="courseInfoPageP2">
                <h3 style={{ textAlign: 'left' }}>Администраторы</h3>
                <hr style={{ marginTop: 0 }} />
                <div>
                  <UserList />
                </div>
              </div>
            </div>
            <div className={toggleState === 5 ? 'tab-pane fade show active' : 'tab-pane fade'} id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
              <div>
                <div className="courseInfoPageP2">
                  <h3 style={{ textAlign: 'left' }}>Поиск пользователей</h3>
                  <hr style={{ marginTop: 0, marginBottom: '30px' }} />
                  <div>
                    <UserSearch />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
