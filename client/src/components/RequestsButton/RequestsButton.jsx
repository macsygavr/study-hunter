/* eslint-disable no-nested-ternary */
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import PopUp from '../PopUp/PopUp';

function RequestsButton({ userId, courseId }) {
  const { currentUser } = useSelector((state) => state);
  const [flag, setFlag] = useState(false);
  const [popupActive, setPopupActive] = useState(false);

  const requestHandler = () => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/request`, {
      userId,
      courseId,
    });
    setFlag((prev) => !prev);
  };

  return (
    <>
      {flag ? (
        <p className="btn btn-success mt-3 mb-0">Отклик отправлен</p>
      ) : (Object.keys(currentUser).length
        ? (
          <button onClick={requestHandler} type="button" className="btn btn-primary mt-3">Хочу здесь учиться!</button>
        ) : (
          <button onClick={() => setPopupActive(true)} type="button" className="btn btn-primary mt-3 open-btn">Откликнуться!</button>
        )
      )}
      <PopUp active={popupActive} setActive={setPopupActive} />
    </>
  );
}

export default RequestsButton;
