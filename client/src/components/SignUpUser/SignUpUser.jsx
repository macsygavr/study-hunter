import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { registerUserStart } from '../../redux/actions/usersAC';

function SignUpUser() {
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);

  const submitHandler = (event) => {
    event.preventDefault();
    const {
      firstName, lastName, email, phone, password,
    } = event.target;

    // eslint-disable-next-line max-len
    dispatch(registerUserStart(firstName.value.trim(), lastName.value.trim(), phone.value.trim(), email.value.trim(), password.value.trim()));
  };

  useEffect(() => {
    if (currentUser?.id) setLogin((prev) => !prev);
  }, [currentUser]);

  return (
    <div className="container my-5" style={{ width: '370px' }}>
      <form id="userSignUpForm" onSubmit={submitHandler}>
        <div className="mb-2 d-flex flex-column align-items-start">
          <p className="mb-1">Имя</p>
          <input required name="firstName" type="text" className="form-control" />
        </div>
        <div className="mb-2 d-flex flex-column align-items-start">
          <p className="mb-1">Фамилия</p>
          <input required name="lastName" type="text" className="form-control" />
        </div>
        <div className="mb-2 d-flex flex-column align-items-start">
          <p className="mb-1">Телефон</p>
          <input required name="phone" type="text" className="form-control" />
        </div>
        <div className="mb-2 d-flex flex-column align-items-start">
          <p className="mb-1">Email</p>
          <input required name="email" type="email" className="form-control" />
        </div>
        <div className="mb-2 d-flex flex-column align-items-start">
          <p className="mb-1">Пароль</p>
          <input required name="password" type="password" className="form-control" />
        </div>
        <button type="submit" className="btn myLinkButton">Зарегистрироваться</button>
        {login && <Redirect to="/" />}
        {currentUser?.error && (
          <p style={{
            color: 'red', marginTop: '15px', marginBottom: '0',
          }}
          >
            Эл.адрес должен быть уникальным!
          </p>
        )}
      </form>
    </div>
  );
}

export default React.memo(SignUpUser);
