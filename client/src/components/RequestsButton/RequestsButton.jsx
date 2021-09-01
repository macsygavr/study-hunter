/* eslint-disable no-nested-ternary */
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function RequestsButton({ userId, courseId }) {
  const { currentUser } = useSelector((state) => state);
  const [flag, setFlag] = useState(false);

  const requestHandler = () => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/request`, {
      userId,
      courseId,
    });
    setFlag((prev) => !prev);
  };

  return (
    flag ? (
      <p className="btn btn-success mt-3 mb-0">Отклик отправлен</p>
    ) : (Object.keys(currentUser).length
      ? (
        <button onClick={requestHandler} type="button" className="btn btn-primary mt-3">Хочу здесь учиться!</button>
      ) : (
        <p className="mt-3 mb-2" style={{ fontStyle: 'italic', fontSize: '13px', color: 'gray' }}>Для возможности отправки заявки - войдите</p>
      )
    )
  );
}

export default React.memo(RequestsButton);
