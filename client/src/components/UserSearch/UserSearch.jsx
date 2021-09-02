import axios from 'axios';
import React, { useState } from 'react';
import UserListItem from '../UserListItem/UserListItem';

function UserSearch() {
  const [targetUser, setTargetUser] = useState([]);

  const userSearchHandler = (e) => {
    e.preventDefault();
    const email = e.target.userSearch.value;
    axios.post(`${process.env.REACT_APP_SERVER_URL}/admin/usersearch`, {
      email,
    })
      .then((res) => setTargetUser(res.data));
  };
  console.log(targetUser);
  return (
    <div>
      <form className="d-flex align-items-center justify-content-center" onSubmit={userSearchHandler}>
        <input style={{ width: '340px', marginRight: '6px' }} type="text" className="form-control" placeholder="email пользователя" id="userSearch" />
        <button className="myLinkButton" type="submit">Найти</button>
      </form>
      <div className="my-3">
        {targetUser.map((item) => <UserListItem key={item.id} {...item} />)}
      </div>
    </div>
  );
}

export default React.memo(UserSearch);
