import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { loginUserStart } from '../../redux/actions/usersAC';

function SignInUser() {
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const [display, setDisplay] = useState('none');
  const currentUser = useSelector((state) => state.currentUser);
  const history = useHistory();
  console.log('login', login);

  const loginHandler = (event) => {
    event.preventDefault();
    const { email, password } = event.target;
    dispatch(loginUserStart(email.value, password.value));

    if (currentUser?.id) setLogin((prev) => !prev);
    if (!currentUser?.id) setDisplay('block');
    history.push('/');
  };

  return (
    <div className="container d-flex justify-content-center my-5 bg-light p-4 border border-4 rounded" style={{ width: '270px' }}>
      <form id="userSignInForm" onSubmit={loginHandler}>
        <div className="mb-2 d-flex flex-column align-items-start">
          <p className="mb-1">Email</p>
          <input required name="email" type="email" className="form-control" />
        </div>
        <div className="mb-2 d-flex flex-column align-items-start">
          <p className="mb-1">Пароль</p>
          <input required name="password" type="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Войти</button>
        {login ? <Redirect to="/" /> : (
          // eslint-disable-next-line object-shorthand
          <p style={{ color: 'red', display: display }}>
            Введите корректный пароль
          </p>
        )}

      </form>
    </div>
  );
}

export default SignInUser;
