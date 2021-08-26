function SignUpOrganization() {
  return (
    <div className="container d-flex justify-content-center my-5 bg-light p-4 border border-4 rounded">
      <form id="organizationSignUpForm">
        <div className="mb-2 d-flex flex-column align-items-start">
          <p className="mb-1">Наименование огранизации</p>
          <input required name="Name" type="text" className="form-control" />
        </div>
        <div className="mb-2 d-flex flex-column align-items-start">
          <p className="mb-1">Телефон для связи</p>
          <input required name="Phone" type="text" className="form-control" />
        </div>
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
    </div>
  );
}

export default SignUpOrganization;
