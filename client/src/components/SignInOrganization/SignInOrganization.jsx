import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { loginOrganizationStart } from '../../redux/actions/organizationsAC';

function SignInOrganization() {
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const [display, setDisplay] = useState('none');
  const currentOrganization = useSelector((state) => state.currentOrganization);

  const loginHandler = (event) => {
    event.preventDefault();
    const { email, password } = event.target;
    dispatch(loginOrganizationStart(email.value, password.value));

    if (currentOrganization?.id) setDisplay('none');
    if (!currentOrganization?.id) setDisplay('block');
  };

  useEffect(() => {
    if (currentOrganization?.id) setLogin((prev) => !prev);
  }, [currentOrganization]);

  return (
    <div className="container d-flex justify-content-center my-5" style={{ width: '270px' }}>
      <form id="organizationSignUpForm" onSubmit={loginHandler}>
        <div className="mb-2 d-flex flex-column align-items-start">
          <p className="mb-1">Email организации</p>
          <input required name="email" type="email" className="form-control" />
        </div>
        <div className="mb-2 d-flex flex-column align-items-start">
          <p className="mb-1">Пароль</p>
          <input required name="password" type="password" className="form-control" />
        </div>
        <button type="submit" className="btn myLinkButton">Войти</button>
        {login ? <Redirect to="/" /> : (
          // eslint-disable-next-line object-shorthand
          <p style={{
            color: 'red', display, marginTop: '15px', marginBottom: '0',
          }}
          >
            Введите корректный пароль!
          </p>
        )}
      </form>
    </div>
  );
}

export default React.memo(SignInOrganization);
