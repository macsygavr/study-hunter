import React from 'react';
import {
  Link,
} from 'react-router-dom';

function SignUpChoisePage() {
  return (
    <div className="container d-flex justify-content-center flex-column my-5">
      <Link className="link" to="/signup/user">
        <button type="button" className="btn btn-primary my-2">Зарегистрироваться как пользователь</button>
      </Link>
      <Link className="link" to="/signup/organization">
        <button type="button" className="btn btn-primary my-2">Зарегистрироваться как организация</button>
      </Link>
    </div>
  );
}

export default React.memo(SignUpChoisePage);
