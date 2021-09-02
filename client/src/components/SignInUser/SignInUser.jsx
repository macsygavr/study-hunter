import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { loginUserStart } from '../../redux/actions/usersAC';

function SignInUser() {
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);

  const loginHandler = (event) => {
    event.preventDefault();
    const { email, password } = event.target;
    dispatch(loginUserStart(email.value, password.value));
  };

  useEffect(() => {
    if (currentUser?.id) setLogin((prev) => !prev);
  }, [currentUser]);

  return (
    <div className="container my-5" style={{ width: '370px' }}>
      <form id="userSignInForm" onSubmit={loginHandler}>
        <div className="mb-2 d-flex flex-column align-items-start">
          <p className="mb-1">Email</p>
          <input required name="email" type="email" className="form-control" />
        </div>
        <div className="mb-2 d-flex flex-column align-items-start">
          <p className="mb-1">Пароль</p>
          <input required name="password" type="password" className="form-control" />
        </div>
        <button type="submit" className="btn myLinkButton">Войти</button>
        {login && <Redirect to="/" />}
        {currentUser?.error && (
          <p style={{
            color: 'red', marginTop: '15px', marginBottom: '0',
          }}
          >
            Введите корректный эл.адрес/пароль!
          </p>
        )}
      </form>
    </div>
  );
}

export default React.memo(SignInUser);
