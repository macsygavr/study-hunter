// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   // Redirect,
// } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="header">
      <nav className="navbar navbar-dark bg-primary" style={{ padding: '0 55px', height: '60px', marginBottom: '60px' }}>
        <Link to="/"><img src="https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/6087f2b060c7a92408bac811_logo.svg" alt="logo" /></Link>
        <Link to="/profile">ЛК </Link>
        <Link to="/signin">Вход </Link>
        <Link to="/signup">Регистрация </Link>
        <Link to="/logout">Выход </Link>
      </nav>
    </div>
  );
}
