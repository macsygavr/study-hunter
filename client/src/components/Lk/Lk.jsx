import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Lk() {
  const currentUser = useSelector((state) => state.currentUser);
  console.log('from lk component', currentUser);

  return (
    <div className="lk">
      <h4 style={{ marginBottom: '40px', width: '1000px' }}>Личный кабинет</h4>
      <div className="lk__content">
        <div className="lk__photo">
          <img style={{ marginBottom: '20px' }} src="https://www.ucheba.ru/img/userpic-empty-big.png" alt="pic" width="135px" />
          <input id="input_file" type="file" size="1" name="avatarFile" />
        </div>
        <div style={{ marginLeft: '-165px' }}>
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
    </div>
  );
}
