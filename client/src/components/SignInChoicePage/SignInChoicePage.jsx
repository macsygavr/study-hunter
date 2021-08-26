import {
  Link,
} from 'react-router-dom';

function SignInChoisePage() {
  return (
    <div className="container d-flex justify-content-center flex-column my-5">
      <Link className="link" to="/signin/user">
        <button type="button" className="btn btn-primary my-2">Войти как пользователь</button>
      </Link>
      <Link className="link" to="/signin/organization">
        <button type="button" className="btn btn-primary my-2">Войти как организация</button>
      </Link>
    </div>
  );
}

export default SignInChoisePage;
