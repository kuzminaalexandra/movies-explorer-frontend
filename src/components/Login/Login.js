import { Link, Navigate } from "react-router-dom";
import { useForms } from "../../hooks/Forms";
import "./Login.css";
import logo from "../../images/logo.svg";
import { useApp } from "../../hooks/App";

function Login() {
  const { handleLogin } = useApp();
  const { values, handleChange, errors, isValid } = useForms();

  function handleSubmit(evt) {
    if (isValid) {
      evt.preventDefault();
      handleLogin(values);
    }
  }

  const loggedIn = localStorage.getItem("loggedIn") === "true";

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="signin__header">
        <Link to="/" className="signin__header-link">
          <img
            src={logo}
            alt="На главную страницу"
            className="signin__header-logo"
          />
        </Link>
        <h1 className="signin__page-title">Рады видеть!</h1>
      </div>
      <form className="signin__form" noValidate onSubmit={handleSubmit}>
        <label className="signin__form-label">
          <span className="signin__form-text">E-mail</span>
          <input
            className="signin__form-input"
            type="text"
            name="email"
            minLength="2"
            maxLength="30"
            required
            value={values.email || ""}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="signup__form-error">{errors.email}</span>
          )}
        </label>
        <label className="signin__form-label">
          <span className="signin__form-text">Пароль</span>
          <input
            className="signin__form-input"
            type="password"
            name="password"
            autoComplete="off"
            minLength="8"
            maxLength="30"
            required
            value={values.password || ""}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="signup__form-error">{errors.password}</span>
          )}
        </label>
        <button
          type="submit"
          className="signin__form-signin-btn"
          disabled={!isValid}
        >
          Войти
        </button>
      </form>
      <p className="signin__form-question">
        Еще не зарегистрированы?
        <Link to="/signup" className="signin__form-signup-link">
          Регистрация
        </Link>
      </p>
    </>
  );
}

export default Login;
