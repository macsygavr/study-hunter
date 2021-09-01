import './userListItem.css';
import axios from 'axios';
import React, { useState } from 'react';

function UserListItem(item) {
  const {
    id, firstName, lastName, email, admin, superadmin,
  } = item;
  const [isAdmin, setIsAdmin] = useState(admin);

  const adminHandler = () => {
    axios.patch(`${process.env.REACT_APP_SERVER_URL}/admin/changestatus`, {
      id,
    })
      .then((res) => {
        setIsAdmin(res.data);
      });
  };

  return superadmin ? null : (
    <div>
      <p className="userListItemP">
        <span>
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
        </span>
        <span>
          <span>
            {isAdmin ? 'Админ' : 'Не админ'}
              &nbsp;
              &nbsp;
              &nbsp;
          </span>
          <button type="button" className="myLinkButton" onClick={adminHandler}>
            {isAdmin ? 'Забрать' : 'Выдать'}
            {' '}
            права админа
          </button>
        </span>
      </p>
      <hr style={{ marginTop: '-15px', color: 'rgb(198, 198, 198)' }} />
    </div>
  );
}

export default React.memo(UserListItem);
