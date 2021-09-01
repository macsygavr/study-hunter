import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { loginOrganizationStart } from '../../redux/actions/organizationsAC';

function SignInOrganization() {
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const currentOrganization = useSelector((state) => state.currentOrganization);

  const loginHandler = (event) => {
    event.preventDefault();
    const { email, password } = event.target;
    dispatch(loginOrganizationStart(email.value, password.value));
  };

  useEffect(() => {
    if (currentOrganization?.id) setLogin((prev) => !prev);
  }, [currentOrganization]);

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
        <button type="submit" className="btn btn-primary">Войти</button>
        {login && <Redirect to="/" />}
        {currentOrganization?.error && (
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

export default SignInOrganization;
