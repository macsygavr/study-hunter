// import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { registerUserStart } from '../../redux/actions/usersAC';

function SignUpUser() {
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  // const { currentUser } = useSelector((state) => state);

  const submitHandler = (event) => {
    event.preventDefault();
    const {
      firstName, lastName, email, phone, password,
    } = event.target;
    console.log(firstName.value, lastName.value, phone.value, email.value, password.value);
    // eslint-disable-next-line max-len
    dispatch(registerUserStart(firstName.value, lastName.value, phone.value, email.value, password.value));
    setLogin((prev) => !prev);
  };

  return (
    <div className="container d-flex justify-content-center my-5 bg-light p-4 border border-4 rounded" style={{ width: '270px' }}>
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
        <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
      </form>
      {login ? <Redirect to="/" /> : null}
    </div>
  );
}

export default SignUpUser;
