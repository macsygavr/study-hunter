/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import './requestButton.css';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
// import { addRequestUserStart } from '../../redux/actions/usersAC';
import PopUp from '../PopUp/PopUp';
import ModalRequest from '../ModalRequest/ModalRequest';

function RequestsButton({ userId, courseId, courseName }) {
  // const dispatch = useDispatch();
  const { currentUser, currentOrganization } = useSelector((state) => state);
  const [popupActive, setPopupActive] = useState(false);
  const [isReqModal, setIsReqModal] = useState(false);
  const [isRequested, setIsRequested] = useState(null);
  // const requestHandler = () => {
  //   dispatch(addRequestUserStart(userId, courseId));
  // };

  useEffect(() => {
    if (Object.keys(currentUser).length) {
      axios.post(`${process.env.REACT_APP_SERVER_URL}/isrequested`, { userId, courseId }, { withCredentials: true })
        .then((response) => setIsRequested(response.data));
    }
  }, [currentUser.requests]);

  return (
    <>
      {isRequested
        ? (<div className="alert alert-primary mt-3 mb-0 mx-auto pt-2" style={{ width: '180px', height: '42px' }}>Отклик отправлен</div>)
        : Object.keys(currentUser).length
          ? (<button onClick={() => setIsReqModal(true)} type="button" className="btn btn-my-primary mt-3">Хочу здесь учиться!</button>)
          : !Object.keys(currentOrganization).length
            ? (<button onClick={() => setPopupActive(true)} type="button" className="btn btn-my-primary mt-3">Откликнуться!</button>)
            : null}
      <PopUp active={popupActive} setActive={setPopupActive} />
      {isReqModal ? <ModalRequest setIsReqModal={setIsReqModal} userId={userId} courseId={courseId} courseName={courseName} /> : null}
    </>
  );
}

export default React.memo(RequestsButton);

// <div className="alert alert-primary mt-3 mb-0 mx-auto pt-2" style={{ width: '180px', height: '38px' }}>Отклик отправлен</div>
// <button onClick={() => setIsReqModal(true)} type="button" className="btn btn-my-primary mt-3">Хочу здесь учиться!</button>
// <button onClick={() => setPopupActive(true)} type="button" className="btn btn-my-primary mt-3">Откликнуться!</button>
