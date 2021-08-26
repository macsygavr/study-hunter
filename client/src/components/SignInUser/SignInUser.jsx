function SignInUser() {
  return (
    <div className="container d-flex justify-content-center my-5 bg-light p-4 border border-4 rounded">
      <form id="userSignInForm">
        <div className="mb-2 d-flex flex-column align-items-start">
          <p className="mb-1">Email</p>
          <input required name="email" type="email" className="form-control" />
        </div>
        <div className="mb-2 d-flex flex-column align-items-start">
          <p className="mb-1">Пароль</p>
          <input required name="password" type="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Войти</button>
      </form>
    </div>
  );
}

export default SignInUser;
