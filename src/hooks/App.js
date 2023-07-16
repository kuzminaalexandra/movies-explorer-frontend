import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as localApi from "../utils/localApi";
import api from "../utils/api";

export function useApp() {
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moreMovies, setMoreMovies] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [savedMovie, setSavedMovie] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      localApi
        .checkToken(token)
        .then(() => {
          localStorage.setItem("loggedIn", true);
        })
        .catch((err) => {
          console.log(err);
          localStorage.setItem("loggedIn", false);
        });
    }
  }, [navigate]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    if (loggedIn) {
      localApi
        .getUserInfo()
        .then((user) => {
          setCurrentUser(user);
          getSavedMovies();
        })
        .catch((error) => console.log(error));
    }
  }, []);

  function handleRegister({ name, email, password }) {
    localApi
      .register(name, email, password)
      .then(() => {
        localStorage.setItem("loggedIn", true);
        handleLogin({ email, password });
      })
      .catch((error) => console.log(error));
  }

  function handleLogin({ email, password }) {
    localApi
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("loggedIn", true);
        localApi.getUserInfo().then((user) => {
          setCurrentUser(user);
          getSavedMovies();
        });
        navigate("/movies");
      })
      .catch((error) => console.log(error));
  }

  function handleLogout() {
    setCurrentUser({});
    localStorage.removeItem("token");
    localStorage.removeItem("loggedIn");
    navigate("/");
  }

  function handleUpdateUser({ name, email }) {
    localApi
      .setUserInfo(name, email)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .catch((error) => console.log(error));
  }

  function handleSearchMovie(movie, isShort) {
    setLoading(true);

    api
      .getInitialMovies()
      .then((movies) => {
        // eslint-disable-next-line array-callback-return
        const searchedMovies = movies.filter((i) => {
          return i.nameRU.toLowerCase().includes(movie.toLowerCase());
        });

        const foundsMovies = isShort
          ? searchedMovies.filter((i) => i.duration <= 40)
          : searchedMovies;

        setLocalStorageData(movie, isShort, foundsMovies);

        resizeWindow();

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
      });
  }

  function setLocalStorageData(movie, isShort, foundsMovies) {
    localStorage.setItem("searchedMovieName", movie);
    localStorage.setItem("shortsMovies", isShort);
    localStorage.setItem("foundsMovies", JSON.stringify(foundsMovies));
  }

  function checkWindowWidth() {
    setWindowWidth(window.innerWidth);
  }

  const resizeWindow = useCallback(() => {
    const foundsMovies = getLocalStorageData();

    if (foundsMovies === null) {
      return;
    }

    if (windowWidth > 900) {
      setMovies(foundsMovies.slice(0, 7));
      setMoreMovies(3);
    } else if (windowWidth > 490) {
      setMovies(foundsMovies.slice(0, 7));
      setMoreMovies(2);
    } else if (windowWidth < 490) {
      setMovies(foundsMovies.slice(0, 5));
      setMoreMovies(1);
    }
  }, [windowWidth]);

  useEffect(() => {
    window.addEventListener("resize", checkWindowWidth);
    resizeWindow();

    return () => {
      window.removeEventListener("resize", checkWindowWidth);
    };
  }, [windowWidth, resizeWindow]);

  function getLocalStorageData() {
    return JSON.parse(localStorage.getItem("foundsMovies"));
  }

  function searchMovie(movie, isShort) {
    handleSearchMovie(movie, isShort);
  }

  function showMoreMovies() {
    const foundsMovies = getLocalStorageData();
    setMovies(foundsMovies.slice(0, movies.length + moreMovies));
  }

  function getSavedMovies() {
    localApi
      .getSavedMovies()
      .then((movies) => {
        setSavedMovie(movies);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function isSavedMovie(card) {
    return savedMovie.some(
      (c) => c.movieId === card.id && c.owner._id === currentUser._id
    );
  }

  function saveMovie(movie) {
    localApi
      .saveMovie(movie)
      .then((movieData) => {
        setSavedMovie((prevMovies) => [...prevMovies, movieData]);
      })
      .then(() => getSavedMovies())
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteMovie(movie) {
    const deletedMovie = savedMovie.find(
      (i) =>
        i.movieId === (movie.id || movie.movieId) &&
        i.owner._id === currentUser._id
    );

    localApi
      .deleteMovie(deletedMovie._id)
      .then(() => {
        setSavedMovie((prevMovies) =>
          prevMovies.filter((i) => i._id !== deletedMovie._id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return {
    handleRegister,
    handleLogin,
    currentUser,
    handleUpdateUser,
    handleLogout,
    movies,
    loading,
    showMoreMovies,
    searchMovie,
    isSavedMovie,
    saveMovie,
    deleteMovie,
    savedMovie,
  };
}
