import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Posts from '../Posts/Posts';

export default function Lk() {
  const [file, setFile] = useState(null);
  console.log(file);
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

  async function onDropHandler(event) {
    event.preventDefault();
    // const files = [...event.dataTransfer.files];
    // const [userPhoto] = files;
    const formData = new FormData();
    // formData.append('file', userPhoto);

    console.log(formData.get('file'));
    axios.post(`${process.env.REACT_APP_SERVER_URL}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setDrag(false);
  }
  // const clickHandler = () => {
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     setFile(reader.result);
  //     console.log(reader.result);
  //   };
  // };
  const fileSend = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const imagefile = document.querySelector('#file');

    formData.append('filedata', imagefile.files[0]);
    console.log('formData--- >', formData);
    const response = await axios.post('http://localhost:3005/upload', formData);
    setFile(`http://localhost:3005/${response.data}`);
  };
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
      <form onSubmit={(event) => fileSend(event)}>
        <input type="file" name="filedata" id="file" />
        <input type="submit" value="Send" />
        {/* <button type="button" onClick={clickHandler}>Click</button> */}
        <img src={file} alt="userPhoto" />
      </form>
    </div>
  );
}
