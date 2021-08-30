import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { loginOrganizationStart } from '../../redux/actions/organizationsAC';

function SignInOrganization() {
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);

  const loginHandler = (event) => {
    event.preventDefault();
    const { email, password } = event.target;
    dispatch(loginOrganizationStart(email.value, password.value));
    setLogin((prev) => !prev);
  };
  return (
    <div className="container d-flex justify-content-center my-5 bg-light p-4 border border-4 rounded" style={{ width: '270px' }}>
      <form id="organizationSignUpForm" onSubmit={loginHandler}>
        <div className="mb-2 d-flex flex-column align-items-start">
          <p className="mb-1">Email организации</p>
          <input required name="email" type="email" className="form-control" />
        </div>
        <div className="mb-2 d-flex flex-column align-items-start">
          <p className="mb-1">Пароль</p>
          <input required name="password" type="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
      </form>
      {login ? <Redirect to="/" /> : null}
    </div>
  );
}

export default SignInOrganization;
