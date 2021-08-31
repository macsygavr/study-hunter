import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import axios from 'axios';
import { registerOrganizationStart } from '../../redux/actions/organizationsAC';

function SignUpOrganization() {
  const [arrOfOrgForms, setArgOfOrgForms] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/options/forms`) // env variable
      .then((res) => {
        setArgOfOrgForms(res.data.arrOfOrgForms);
      });
  }, []);

  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    const {
      name, phone, email, form, password,
    } = event.target;
    dispatch(registerOrganizationStart(
      name.value,
      phone.value,
      email.value,
      form.value,
      password.value,
    ));
    setLogin((prev) => !prev);
  };

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
      </form>
      {login ? <Redirect to="/" /> : null}
    </div>
  );
}

export default SignUpOrganization;
