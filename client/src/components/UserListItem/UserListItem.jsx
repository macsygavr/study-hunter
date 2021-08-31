import axios from 'axios';
import { useState } from 'react';

function UserListItem(item) {
  const {
    id, firstName, lastName, email, admin, superadmin,
  } = item;
  const [isAdmin, setIsAdmin] = useState(admin);

  const adminHandler = () => {
    axios.patch(`${process.env.REACT_APP_SERVER_URL}/changestatus`, {
      id,
    })
      .then((res) => {
        setIsAdmin(res.data);
      });
  };

  return superadmin ? null : (
    <div>
      <p>
        <span>
          {firstName}
          &nbsp;
        </span>
        <span>
          {lastName}
          &nbsp;
        </span>
        <span>
          {email}
          &nbsp;
        </span>
        <span>
          {isAdmin ? 'Админ' : 'Не админ'}
          &nbsp;
        </span>
        <button type="button" onClick={adminHandler}>
          {isAdmin ? 'Забрать' : 'Выдать'}
          {' '}
          права админа
        </button>
      </p>
    </div>
  );
}

export default UserListItem;
