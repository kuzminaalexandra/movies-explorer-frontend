import { useEffect, useState } from "react";

import "./SearchForm.css";
import SearchIcon from "../../images/search-icon.svg";
import SearchBtn from "../../images/search-btn.svg";

function SearchForm({ searchMovie, isSavedMovies }) {
  const defaultValue = localStorage.getItem("searchedMovieName") || "";
  const [isChecked, setIsChecked] = useState(false);
  const [movie, setMovie] = useState(isSavedMovies ? "" : defaultValue);
  const [error, setError] = useState("");

  function getLocalStorageData() {
    return JSON.parse(localStorage.getItem("shortsMovies"));
  }

  function handleToggle() {
    setIsChecked(!isChecked);
    searchMovie(movie, !isChecked);
  }

  function handleChange(evt) {
    setMovie(evt.target.value);
    setError("");
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (movie.trim().length === 0) {
      setError("Введите ключевое слово");
    } else {
      searchMovie(movie, isChecked);
    }
  }

  useEffect(() => {
    const shortsMovies = getLocalStorageData();
    setIsChecked(shortsMovies || false);
  }, []);

  useEffect(() => {
    if (defaultValue) {
      setMovie(isSavedMovies ? "" : defaultValue);
    }
  }, [defaultValue]);

  return (
    <>
      <form className="search__form" onSubmit={handleSubmit}>
        <img
          src={SearchIcon}
          alt="Иконка поиска"
          className="search__form-icon"
        />
        <input
          className="search__form-input"
          type="text"
          placeholder="Фильм"
          // minLength="2"
          // maxLength="30"
          // required
          value={movie}
          onChange={handleChange}
        />
        <button type="submit" className="search__form-btn">
          <img src={SearchBtn} alt="Найти" className="search__form-icon-find" />
        </button>
      </form>
      {error ? <p className="search__form-error">{error}</p> : " "}
      <div className="switch-toggle__wrapper">
        <div className={`switch-toggle ${isChecked ? "checked" : ""}`}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleToggle}
            className="switch-toggle__input"
            id="switch-toggle"
          />
          <label htmlFor="switch-toggle" className="switch-toggle__label">
            <div className="switch-toggle__button"></div>
          </label>
        </div>
        <span className="switch-toggle__text">Короткометражки</span>
      </div>
    </>
  );
}

export default SearchForm;
