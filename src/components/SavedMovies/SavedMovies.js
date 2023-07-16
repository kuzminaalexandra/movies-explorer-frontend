import { useApp } from "../../hooks/App";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies() {
  const { savedMovie, loading, showMoreMovies, searchMovie } = useApp();

  return (
    <section className="Movies">
      <SearchForm searchMovie={searchMovie} />
      <MoviesCardList
        movies={savedMovie}
        loading={loading}
        showMoreMovies={showMoreMovies}
      />
    </section>
  );
}

export default SavedMovies;
