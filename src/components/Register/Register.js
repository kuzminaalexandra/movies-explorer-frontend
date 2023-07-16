import { Link, Navigate } from "react-router-dom";
import { useForms } from "../../hooks/Forms";
import "./Register.css";
import logo from "../../images/logo.svg";
import { useApp } from "../../hooks/App";

function Register() {
  const { handleRegister, loggedIn } = useApp();
  const { values, handleChange, isValid } = useForms();

  function handleSubmit(evt) {
    if (isValid) {
      evt.preventDefault();
      handleRegister(values);
    }
  }

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="signup__header">
        <Link to="/" className="signup__header-link">
          <img
            src={logo}
            alt="На главную страницу"
            className="signup__header-logo"
          />
        </Link>
        <h1 className="signup__page-title">Добро пожаловать!</h1>
      </div>
      <form className="signup__form" noValidate onSubmit={handleSubmit}>
        <label className="signup__form-label">
          <span className="signup__form-text">Имя</span>
          <input
            className="signup__form-input"
            type="text"
            name="name"
            minLength="2"
            maxLength="30"
            required
            value={values.name || ""}
            onChange={handleChange}
          />
        </label>
        <label className="signup__form-label">
          <span className="signup__form-text">E-mail</span>
          <input
            className="signup__form-input"
            type="text"
            name="email"
            minLength="2"
            maxLength="30"
            required
            value={values.email || ""}
            onChange={handleChange}
          />
        </label>
        <label className="signup__form-label">
          <span className="signup__form-text">Пароль</span>
          <input
            className="signup__form-input"
            type="password"
            name="password"
            autoComplete="off"
            required
            value={values.password || ""}
            onChange={handleChange}
          />
        </label>
        <button
          type="submit"
          className="signup__form-signup-btn"
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
      </form>
      <p className="signup__form-question">
        Уже зарегистрированы?
        <Link to="/signin" className="signup__form-signup-link">
          Войти
        </Link>
      </p>
    </>
  );
}

export default Register;
