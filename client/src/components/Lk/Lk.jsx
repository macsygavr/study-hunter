import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Posts from '../Posts/Posts';

export default function Lk() {
  const [drag, setDrag] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);

  function dragStartHandler(e) {
    e.preventDefault();
    setDrag(true);
  }

  function dragLeaveHandler(e) {
    e.preventDefault();
    setDrag(false);
  }

  function onDropHandler(e) {
    e.preventDefault();
    const files = [...e.dataTransfer.files];
    const [uploadFile] = files;
    const formData = new FormData();
    formData.file = uploadFile;
    axios.post('http://192.168.1.38:3005', formData);
    console.log(formData, files);
    setDrag(false);
  }

  return (
    <div className="lk">
      <h4 style={{ marginBottom: '40px', width: '1000px' }}>Личный кабинет</h4>
      <div className="lk__content">
        <div className="lk__photo">
          {/* <img src="https://www.ucheba.ru/img/userpic-empty-big.png" alt="pic" /> */}
          {drag
            ? (
              <div
                className="drop-area"
                onDragStart={(e) => dragStartHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragOver={(e) => dragStartHandler(e)}
                onDrop={(e) => onDropHandler(e)}
              >
                Отпусти
              </div>
            )
            : (
              <div
                style={{
                  width: '135px', height: '135px', borderRadius: '50%', border: '1px solid black',
                }}
                onDragStart={(e) => dragStartHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragOver={(e) => dragStartHandler(e)}
              >
                &nbsp;
              </div>
            )}
          {/* <input id="input_file" type="file" size="1" name="avatarFile" /> */}
        </div>
        <div>
          <div className="container d-flex flex-column align-items-start">
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
      <h3 style={{ textAlign: 'left' }}>Избранное</h3>
      <hr style={{ marginBottom: '40px' }} />
      <Posts resultToRender={currentUser.favorites} />
    </div>
  );
}
