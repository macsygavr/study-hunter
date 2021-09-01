/* eslint-disable no-nested-ternary */
import './requestButton.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addRequestUserStart } from '../../redux/actions/usersAC';

function RequestsButton({ userId, courseId }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state);
  const [flag, setFlag] = useState(false);
  const [isRequested, setIsRequested] = useState(null);

  const requestHandler = () => {
    dispatch(addRequestUserStart(userId, courseId));
    setFlag((prev) => !prev);
  };

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/isrequested`, { userId, courseId }, { withCredentials: true })
      .then((response) => setIsRequested(response.data));
  }, []);

  return (
    flag || isRequested ? (
      <p className="btn btn-success mt-3 mb-0">Отклик отправлен</p>
    ) : (Object.keys(currentUser).length
      ? (
        <button onClick={requestHandler} type="button" className="btn btn-my-primary mt-3">Хочу здесь учиться!</button>
      ) : (
        <p className="mt-3 mb-2" style={{ fontStyle: 'italic', fontSize: '13px', color: 'gray' }}>Для возможности отправки заявки - войдите</p>
      )
    )
  );
}

export default React.memo(RequestsButton);
