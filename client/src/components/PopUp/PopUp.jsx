/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { addRequestUserStart } from '../../redux/actions/usersAC';
import QuickResponseForm from '../QuickResponseForm/QuickResponseForm';
import './PopUp.css';

export default function PopUp({ active, setActive, courseId }) {
  // const dispatch = useDispatch();
  // const currentUser = useSelector((state) => state.currentUser);

  // useEffect(() => {
  //   if (currentUser?.id) console.log(courseId);
  // }, [currentUser]);

  return (
    <div className={active ? 'popup active' : 'popap'} onClick={() => setActive(false)}>
      <div className={active ? 'popup__content active' : 'popup__content'} onClick={(e) => e.stopPropagation()}>
        {active ? <QuickResponseForm courseId={courseId} /> : null}
      </div>
    </div>
  );
}
