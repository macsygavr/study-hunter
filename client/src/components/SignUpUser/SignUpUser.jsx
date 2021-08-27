// import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { registerUserStart } from '../../redux/actions/usersAC';

function SignUpUser() {
  const dispatch = useDispatch();
  // const { currentUser } = useSelector((state) => state);

  const submitHandler = (event) => {
    event.preventDefault();
    const {
      firstName, lastName, email, phone, password,
    } = event.target;
    dispatch(registerUserStart(firstName, lastName, email, phone, password));
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
    </div>
  );
}

export default SignUpUser;
