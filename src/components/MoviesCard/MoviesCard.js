import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useApp } from "../../hooks/App";
import likeIconActive from "../../images/like-icon-active.svg";
import likeIcon from "../../images/like-icon.svg";
import dislikeIcon from "../../images/dislike-icon.svg";
import "./MoviesCard.css";

function MoviesCard({ movie }) {
  const { isSavedMovie, saveMovie, deleteMovie } = useApp();
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(false);
  const imageUrl =
    location.pathname === "/movies"
      ? `https://api.nomoreparties.co/${movie.image.url}`
      : `${movie.image}`;

  function changeTime(min) {
    const hours = Math.floor(min / 60);
    const mins = min % 60;
    return `${hours}ч ${mins}м`;
  }

  const handleDeleteMovie = () => {
    deleteMovie(movie);
    if (location.pathname === "/saved-movies") {
      setIsHidden(true);
    }
  };

  if (isHidden) {
    return null; // Скрываем удаленный фильм
  }

  return (
    <div className={`card ${isHidden ? "card--hidden" : ""}`}>
      <div className="card__info-container">
        <div className="card__info-text-container">
          <h2 className="card__info-movies-name">{movie.nameRU}</h2>
          <p className="card__info-movies-duration">
            {changeTime(movie.duration)}
          </p>
        </div>

        {location.pathname === "/movies" ? (
          <button
            className="card__like-btn-icon"
            onClick={
              isSavedMovie(movie) ? handleDeleteMovie : () => saveMovie(movie)
            }
          >
            <img
              alt={movie.nameRU}
              src={isSavedMovie(movie) ? likeIconActive : likeIcon}
            />
          </button>
        ) : (
          <button className="card__like-btn-icon" onClick={handleDeleteMovie}>
            <img alt={movie.nameRU} src={dislikeIcon} />
          </button>
        )}
      </div>

      <img src={imageUrl} alt={movie.nameRU} className="card__image" />
    </div>
  );
}

export default MoviesCard;
