import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import axios from 'axios';
import { registerOrganizationStart } from '../../redux/actions/organizationsAC';

function SignUpOrganization() {
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const [display, setDisplay] = useState('none');
  const [arrOfOrgForms, setArgOfOrgForms] = useState([]);
  const currentOrganization = useSelector((state) => state.currentOrganization);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/options/forms`) // env variable
      .then((res) => {
        setArgOfOrgForms(res.data.arrOfOrgForms);
      });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    const {
      name, phone, email, form, password,
    } = event.target;
    dispatch(registerOrganizationStart(
      name.value.trim(),
      phone.value.trim(),
      email.value.trim(),
      form.value.trim(),
      password.value.trim(),
    ));

    if (currentOrganization?.id) setDisplay('none');
    if (!currentOrganization?.id) setDisplay('block');
  };

  useEffect(() => {
    if (currentOrganization?.id) setLogin((prev) => !prev);
  }, [currentOrganization]);

  return (
    <div className="container d-flex justify-content-center my-5 bg-light p-4 border border-4 rounded" style={{ width: '270px' }}>
      <form id="organizationSignUpForm" onSubmit={submitHandler}>
        <div className="mb-2 d-flex flex-column align-items-start">
          <p className="mb-1">Наименование огранизации</p>
          <input required name="name" type="text" className="form-control" />
        </div>
        <div className="mb-2 d-flex flex-column align-items-start">
          <p className="mb-1">Телефон для связи</p>
          <input required name="phone" type="text" className="form-control" />
        </div>
        <div className="mb-2 d-flex flex-column align-items-start">
          <p className="mb-1">Email организации</p>
          <input required name="email" type="email" className="form-control" />
        </div>
        <div className="mb-2 d-flex flex-column align-items-start">
          <p className="mb-1">Форма организации</p>
          <select className="form-select" id="formId" name="form" aria-label="Example select with button addon">
            {arrOfOrgForms.map((option) => (
              <option value={option.id} key={option.id}>{option.form}</option>
            ))}
          </select>
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

export default React.memo(SignUpOrganization);
