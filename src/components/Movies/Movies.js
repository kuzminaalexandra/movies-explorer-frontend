import { useApp } from "../../hooks/App";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies() {
  const { movies, loading, showMoreMovies, searchMovie } = useApp();

  return (
    <section className="Movies">
      <SearchForm searchMovie={searchMovie} />
      <MoviesCardList
        movies={movies}
        loading={loading}
        showMoreMovies={showMoreMovies}
      />
    </section>
  );
}

export default Movies;
