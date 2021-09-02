/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router';
import { addRequestUserStart, loginUserSuccess, registerUserStart } from '../../redux/actions/usersAC';

function QuickResponseForm({ courseId }) {
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);
  console.log(currentUser);
  const submitHandler = (event) => {
    event.preventDefault();
    const {
      firstName, lastName, email, phone, password,
    } = event.target;
    axios.post(`${process.env.REACT_APP_SERVER_URL}/signup/quickuser`, {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
      courseId,
    }, { withCredentials: true })
      .then((res) => {
        dispatch(loginUserSuccess(res.data));
        dispatch(addRequestUserStart(res.data.id, courseId));
        setLogin((prev) => !prev);
      });
  };

  return (
    <div className="container d-flex justify-content-center my-5 p-3" style={{ width: '370px', backgroundColor: 'rgb(233, 233, 233)' }}>
      {!currentUser ? (
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
          <p>Вы будете автоматически зарегистрированы.</p>
          <button type="submit" className="btn btn-my-primary mt-3">Откликнуться!</button>
          {currentUser?.error && (
          <p style={{
            color: 'red', marginTop: '15px', marginBottom: '0',
          }}
          >
            Email должен быть уникальным!
          </p>
          )}
        </form>
      ) : (
        <div className="alert alert-primary">
          <div>Вы успешно зарегистрировались и отправили отклик!</div>
        </div>
      )}
    </div>
  );
}

export default QuickResponseForm;
