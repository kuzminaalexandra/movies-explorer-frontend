import { useState, useEffect, useCallback } from "react";
import { useApp } from "../../hooks/App";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies() {
  const { savedMovie, loading } = useApp();

  const [filteredMovies, setFilteredMovies] = useState([]);

  const initFilteredMovies = useCallback(() => {
    setFilteredMovies(savedMovie);
  }, [savedMovie]);

  useEffect(() => {
    initFilteredMovies();
  }, [initFilteredMovies]);

  const handleSearchMovie = useCallback(
    (movieName, isShortFilms) => {
      const filteredMovies = savedMovie.filter((item) =>
        item.nameRU.toLowerCase().includes(movieName.toLowerCase())
      );
      if (isShortFilms) {
        setFilteredMovies(filteredMovies.filter((item) => item.duration <= 40));
      } else {
        setFilteredMovies(filteredMovies);
      }
    },
    [savedMovie]
  );

  const reversedMovies = [...filteredMovies].reverse();

  return (
    <section className="Movies">
      <SearchForm searchMovie={handleSearchMovie} isSavedMovies={true} />
      <MoviesCardList
        movies={reversedMovies}
        loading={loading}
        showMoreMovies={() => {}}
        isSavedMovies={true}
      />
    </section>
  );
}

export default SavedMovies;
