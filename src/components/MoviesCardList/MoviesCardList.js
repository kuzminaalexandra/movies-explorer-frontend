import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ movies, loading, showMoreMovies, isSavedMovies }) {
  const foundsMovies = JSON.parse(localStorage.getItem("foundsMovies"));

  if (loading) return <Preloader />;

  if (!foundsMovies) {
    return (
      <span className="movies-card-list_use-search">
        Воспользуйтесь поиском фильмов
      </span>
    );
  } else if (movies.length === 0 && foundsMovies.length === 0) {
    return (
      <span className="movies-card-list_not-found">Фильмы не найдены</span>
    );
  }

  const movieListElement = movies.map((movie) => {
    return (
      <li key={movie.id || movie._id} className="movies-card-list__movies">
        <MoviesCard movie={movie} />
      </li>
    );
  });

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__cards">{movieListElement}</ul>

      {movies.length < foundsMovies.length && !isSavedMovies && (
        <div className="movies-card-list__more" onClick={showMoreMovies}>
          <button className="movies-card-list__more-btn">Ещё</button>
        </div>
      )}
    </section>
  );
}

export default MoviesCardList;
