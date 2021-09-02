// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addNewCourseStart } from '../../redux/actions/organizationsAC';
// import SearchOption from '../SearchOption/SearchOption';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRequestUserStart } from '../../redux/actions/usersAC';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  width: '400px',
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 1000,
};

export default function ModalRequest({
  setIsReqModal, courseName, courseId, userId,
}) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state);
  const [isRequested, setIsRequested] = useState(false);
  const [currentUserRequests] = useState(currentUser.requests);

  const requestHandler = () => {
    dispatch(addRequestUserStart(userId, courseId));
  };

  useEffect(() => {
    if (currentUserRequests.length !== currentUser.requests.length) {
      setIsRequested(true);
    }
  }, [currentUser]);

  return (
    <div style={OVERLAY_STYLES}>
      <div id="requestModal" className="container d-flex flex-column align-items-center my-5 bg-light p-4 border border-4 rounded" style={MODAL_STYLES}>
        {isRequested
          ? (
            <div className="d-flex flex-column align-items-center">
              <div className="alert alert-primary">
                Ваш отклик был успешно отправлен!
              </div>
              <button type="button" className="btn btn-my-primary w-25" onClick={() => setIsReqModal((state) => !state)}>OK</button>
            </div>
          )
          : (
            <>
              {' '}
              <div>
                Вы выбрали направление:
                {' '}
                <div><strong>{courseName}</strong></div>
                <div className="mt-4">Отправить отклик с вашими контактными данными?</div>
              </div>
              <div className="d-flex">
                <button type="button" className="btn btn-my-primary m-2" onClick={requestHandler}>Подтвердить</button>
                <button type="button" className="btn btn-danger m-2" onClick={() => setIsReqModal(false)}>Отмена</button>
              </div>
            </>
          )}
      </div>
    </div>
  );
}
