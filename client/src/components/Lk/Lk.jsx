/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Posts from '../Posts/Posts';

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

    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/upload`, formData, { withCredentials: true });
    // setFile(`${process.env.REACT_APP_SERVER_URL}${response.data}`);
    if (response.data) {
      setFile(response.data);
    }
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
            <p style={{ color: 'blue' }}>{(currentUser.admin && currentUser.superadmin) ? 'superadmin' : currentUser.admin ? 'admin' : ''}</p>
            <h2 className="title-name">{`${currentUser.firstName} ${currentUser.lastName}`}</h2>
            <p>{currentUser.phone}</p>
            <p>{currentUser.email}</p>
          </div>
          <p>
            <Link to="/editUser">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe0-ruYIVTiRizPu8o-RjjR1KrGv-mqXJgLQ&usqp=CAU" alt="" width="7%" />
              Редактировать профиль
            </Link>
          </p>
        </div>
      </div>
      {currentUser.superadmin ? (
        <div>
          <h3 style={{ textAlign: 'left' }}>Назначить админа</h3>
          <hr style={{ marginBottom: '40px' }} />
        </div>
      ) : (
        <div>
          <h3 style={{ textAlign: 'left' }}>Избранное</h3>
          <hr style={{ marginBottom: '40px' }} />
          <Posts resultToRender={currentUser.favorites} />
        </div>
      )}

    </div>
  );
}
