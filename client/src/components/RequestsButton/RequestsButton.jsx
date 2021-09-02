/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import './requestButton.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addRequestUserStart } from '../../redux/actions/usersAC';
import PopUp from '../PopUp/PopUp';

function RequestsButton({ userId, courseId }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state);
  const [popupActive, setPopupActive] = useState(false);
  const [isRequested, setIsRequested] = useState(null);

  const requestHandler = () => {
    dispatch(addRequestUserStart(userId, courseId));
  };

  useEffect(() => {
    if (Object.keys(currentUser).length) {
      axios.post(`${process.env.REACT_APP_SERVER_URL}/isrequested`, { userId, courseId }, { withCredentials: true })
        .then((response) => setIsRequested(response.data));
    }
  }, [currentUser.requests]);

  return (
    <>
      {isRequested ? (
        <div className="alert alert-primary mt-3 mb-0 w-50 mx-auto">Отклик отправлен</div>
      ) : Object.keys(currentUser).length
        ? (
          <button onClick={requestHandler} type="button" className="btn btn-my-primary mt-3">Хочу здесь учиться!</button>
        ) : (
          <button onClick={() => setPopupActive(true)} type="button" className="btn btn-my-primary mt-3">Откликнуться!</button>
        )}
      <PopUp active={popupActive} setActive={setPopupActive} />
    </>
  );
}

export default React.memo(RequestsButton);
