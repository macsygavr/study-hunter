import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserListItem from '../UserListItem/UserListItem';

function UserList() {
  const currentUser = useSelector((state) => state.currentUser);

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/allusers`)
      .then((res) => setAllUsers(res.data));
  }, [currentUser]);

  return (
    <div>
      {allUsers.map((item) => <UserListItem key={item.id} {...item} />)}
    </div>
  );
}

export default UserList;
