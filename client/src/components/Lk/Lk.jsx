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

export default function Lk() {
  const [file, setFile] = useState(null);
  const currentUser = useSelector((state) => state.currentUser);
  useEffect(() => {
    setFile(currentUser.logo);
  }, [currentUser.logo]);
  const fileSend = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const imagefile = document.querySelector('#file');

    formData.append('userPhotoId', currentUser.id);
    formData.append('filedata', imagefile.files[0]);

    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/admin/upload`, formData, { withCredentials: true });
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
            ? <img className="avatar" src={`${process.env.REACT_APP_SERVER_URL}${file}`} alt="pic" />
            : <img className="avatar" src="https://www.ucheba.ru/img/userpic-empty-big.png" alt="pic" />}
          <input type="file" name="filedata" id="file" onChange={(e) => fileSend(e)} />
        </div>
        <div className="courseInfoPageP3">
          <p style={{ color: 'blue' }}>{(currentUser.admin && currentUser.superadmin) ? 'superadmin' : currentUser.admin ? 'admin' : ''}</p>
          <h2 className="title-name">
            {`${currentUser.firstName} ${currentUser.lastName}`}
            <span>
              &nbsp;
              <Link to="/editUser">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe0-ruYIVTiRizPu8o-RjjR1KrGv-mqXJgLQ&usqp=CAU" alt="" width="40px" />
              </Link>
            </span>
          </h2>
          <p>{currentUser.phone}</p>
          <p>{currentUser.email}</p>
        </div>
      </div>
      {currentUser.superadmin ? (
        <div className="courseInfoPageP2">
          { currentUser.admin ? <RegisterList /> : ''}
          <h3 style={{ textAlign: 'left', marginTop: '20px' }}>Назначить админа</h3>
          <hr style={{ marginTop: 0 }} />
          <div>
            <UserList />
          </div>
        </div>
      ) : (
        <>
          <div className="courseInfoPageP2">
            <h3 style={{ textAlign: 'left' }}>Избранное</h3>
            <hr style={{ marginTop: 0 }} />
            {currentUser.favorites ? (
              currentUser.favorites.length ? (
                <div className="courseInfoPageP3">
                  <Posts resultToRender={currentUser.favorites} />
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
          <div className="courseInfoPageP2">
            <h3 style={{ textAlign: 'left' }}>Отклики</h3>
            <hr style={{ marginTop: 0 }} />
            <div className="courseInfoPageP3">
              <Posts resultToRender={currentUser.requests} />
            </div>
            { currentUser.admin ? <RegisterList /> : ''}
          </div>
        </>
      )}
    </div>
  );
}
