import { Link } from 'react-router-dom';

export default function Lk() {
  return (
    <div className="lk">
      <h4 style={{ marginBottom: '40px', width: '1000px' }}>Личный кабинет</h4>
      <div className="lk__content">
        <div className="lk__photo">
          <img style={{ margin: '20px' }} src="https://www.ucheba.ru/img/userpic-empty-big.png" alt="pic" width="135px" />
          <input id="input_file" type="file" size="1" name="avatarFile" />
        </div>
        <div style={{ marginLeft: '-165px' }}>
          <h2 className="title-name">Имя пользователя</h2>
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
