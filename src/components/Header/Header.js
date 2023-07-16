import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import accountIcon from "../../images/account.svg";
import menuIcon from "../../images/menu-btn.svg";
import closeIcon from "../../images/close-btn.svg";
import "./Header.css";

function Header() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  const handleMenuClick = () => {
    setIsVisible(true);
  };

  const handleClickClose = () => {
    setIsVisible(false);
  };

  const loggedIn = localStorage.getItem("loggedIn");

  return (
    <header className="header">
      <Link to="/" className="header__link-logo">
        <img className="header__logo" src={logo} alt="Главная страница" />
      </Link>

      {loggedIn ? (
        <>
          <ul className="header__movies-navigation-links">
            <li>
              <Link
                to="/movies"
                className={`header__movies-navigation-films ${
                  location.pathname === "/movies"
                    ? "header__movies-navigation--active"
                    : ""
                }`}
              >
                Фильмы
              </Link>
              <Link
                to="/saved-movies"
                className={`header__movies-navigation-savedfilms ${
                  location.pathname === "/saved-movies"
                    ? "header__movies-navigation--active"
                    : ""
                }`}
              >
                Сохраненные фильмы
              </Link>
            </li>
          </ul>
          <ul className="header__movies-navigation">
            <li>
              <Link
                to="/profile"
                className="header__movies-navigation-account-link"
              >
                <button className="header__movies-navigation-account">
                  Аккаунт
                  <img
                    className="header__movies-navigation-account-icon"
                    src={accountIcon}
                    alt="Иконка профиля"
                  ></img>
                </button>
              </Link>
            </li>
          </ul>
          <img
            className="header__burger-menu-icon"
            src={menuIcon}
            alt="Меню навигации"
            onClick={handleMenuClick}
          ></img>
        </>
      ) : (
        <ul className="header__navigation">
          <li>
            <Link to="/signup" className="header__navigation-signup">
              Регистрация
            </Link>
          </li>
          <li>
            <Link to="/signin" className="header__navigation-signin">
              Войти
            </Link>
          </li>
        </ul>
      )}

      <div className={`header__burger-menu ${isVisible ? "visible" : ""}`}>
        <img
          src={closeIcon}
          alt="Закрыть"
          className="header__burger-menu-close-btn"
          onClick={handleClickClose}
        />
        <nav className="header__menu-items">
          <div className="header__menu-item">
            <Link to="/" className="header__menu-link">
              Главная
            </Link>
          </div>
          <div className="header__menu-item">
            <Link
              to="/movies"
              className={`header__menu-link ${
                location.pathname === "/movies"
                  ? "header__menu-link--active"
                  : ""
              }`}
            >
              Фильмы
            </Link>
          </div>
          <div className="header__menu-item">
            <Link
              to="/saved-movies"
              className={`header__menu-link ${
                location.pathname === "/saved-movies"
                  ? "header__menu-link--active"
                  : ""
              }`}
            >
              Сохранённые фильмы
            </Link>
          </div>
        </nav>
        <div className="header__menu-item-account_burger">
          <Link
            to="/profile"
            className="header__movies-navigation-account-link"
          >
            <button className="header__movies-navigation-account_burger">
              Аккаунт
              <img
                className="header__movies-navigation-account-icon_burger"
                src={accountIcon}
                alt="Иконка профиля"
              ></img>
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
