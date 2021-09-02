/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import QuickResponseForm from '../QuickResponseForm/QuickResponseForm';
import './PopUp.css';

export default function PopUp({ active, setActive }) {
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (currentUser?.id) setActive(false);
  }, [currentUser]);

  return (
    <div className={active ? 'popup active' : 'popap'} onClick={() => setActive(false)}>
      <div className={active ? 'popup__content active' : 'popup__content'} onClick={(e) => e.stopPropagation()}>
        {active ? <QuickResponseForm /> : null}
      </div>
    </div>
  );
}
