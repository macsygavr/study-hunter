import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserListItem from '../UserListItem/UserListItem';

function UserList() {
  const currentUser = useSelector((state) => state.currentUser);

  const [allAdmins, setAllAdmins] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/alladmins`)
      .then((res) => setAllAdmins(res.data));
  }, [currentUser]);

  return (
    <div>
      {allAdmins.map((item) => <UserListItem key={item.id} {...item} />)}
    </div>
  );
}

export default React.memo(UserList);
