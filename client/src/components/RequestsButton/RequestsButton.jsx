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
  const currentUser = useSelector((state) => state.currentUser);
  const currentOrganization = useSelector((state) => state.currentOrganization);
  const [popupActive, setPopupActive] = useState(false);
  const [isReqModal, setIsReqModal] = useState(false);
  const [isRequested, setIsRequested] = useState(null);
  // const requestHandler = () => {
  //   dispatch(addRequestUserStart(userId, courseId));
  // };
  useEffect(() => {
    if (currentUser) {
      axios.post(`${process.env.REACT_APP_SERVER_URL}/isrequested`, { userId, courseId }, { withCredentials: true })
        .then((response) => setIsRequested(response.data));
    } else setIsRequested(null);
  }, [currentUser]);

  return (
    <>
      {isRequested
        ? (<div className="alert alert-primary mt-3 mb-0 mx-auto pt-2" style={{ width: '180px', height: '42px' }}>Отклик отправлен</div>)
        : currentUser
          ? (<button onClick={() => setIsReqModal(true)} type="button" className="btn btn-my-primary mt-3">Хочу здесь учиться!</button>)
          : !currentOrganization
            ? (<button onClick={() => setPopupActive(true)} type="button" className="btn btn-my-primary mt-3">Откликнуться!</button>)
            : null}
      <PopUp active={popupActive} setActive={setPopupActive} courseId={courseId} />
      {isReqModal ? <ModalRequest setIsReqModal={setIsReqModal} userId={userId} courseId={courseId} courseName={courseName} /> : null}
    </>
  );
}

export default React.memo(RequestsButton);
