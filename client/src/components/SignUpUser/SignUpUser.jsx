// import { useEffect } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { registerUserStart } from '../../redux/actions/usersAC';

function SignUpUser() {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState('none');
  const [login, setLogin] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);

  const submitHandler = (event) => {
    event.preventDefault();
    const {
      firstName, lastName, email, phone, password,
    } = event.target;

    // eslint-disable-next-line max-len
    dispatch(registerUserStart(firstName.value.trim(), lastName.value.trim(), phone.value.trim(), email.value.trim(), password.value.trim()));

    if (currentUser?.id) setDisplay('none');
    if (!currentUser?.id) setDisplay('block');
  };

  useEffect(() => {
    if (currentUser?.id) setLogin((prev) => !prev);
  }, [currentUser]);

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
        {login ? <Redirect to="/" /> : (
        // eslint-disable-next-line object-shorthand
          <p style={{
            color: 'red', display, marginTop: '15px', marginBottom: '0',
          }}
          >
            Эл.адрес должен быть уникальным!
          </p>
        )}
      </form>
    </div>
  );
}

export default SignUpUser;
