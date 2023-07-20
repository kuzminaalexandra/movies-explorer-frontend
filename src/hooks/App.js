import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as localApi from "../utils/MainApi";
import api from "../utils/MoviesApi";

export function useApp() {
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [moreMovies, setMoreMovies] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [savedMovie, setSavedMovie] = useState([]);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [isProfileUpdatedFalse, setIsProfileUpdatedFalse] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const tokenCheck = useCallback(() => {
    const token = localStorage.getItem("token");

    if (token) {
      localApi
        .checkToken(token)
        .then(() => {
          setLoggedIn(true);
          localStorage.setItem("loggedIn", true);
        })
        .catch((err) => {
          setLoggedIn(false);
          localStorage.setItem("loggedIn", false);
          console.log(err);
        });
    } else {
      setLoggedIn(false);
    }
  }, [navigate]);

  useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      Promise.all([localApi.getSavedMovies(), localApi.getUserInfo()])
        .then(([movies, user]) => {
          setSavedMovie(movies);
          setCurrentUser(user);
          setLoadingUser(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn, tokenCheck]);

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
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((error) => {
        console.log(error);
        setLoggedIn(false);
      });
  }

  function handleLogout() {
    setCurrentUser({});
    localStorage.removeItem("token");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("searchedMovieName");
    localStorage.removeItem("shortsMovies");
    localStorage.removeItem("foundsMovies");
    navigate("/");
  }

  function handleUpdateUser({ name, email }) {
    localApi
      .setUserInfo(name, email)
      .then((newData) => {
        setCurrentUser(newData);
        setIsProfileUpdated(true);
      })
      .catch((error) => {
        console.log(error);
        setIsProfileUpdatedFalse(false);
      });
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

  const resizeWindow = useCallback(() => {
    const foundsMovies = getLocalStorageData();

    if (foundsMovies === null) {
      return;
    }

    if (windowWidth >= 1280) {
      setMovies(foundsMovies.slice(0, 7));
      setMoreMovies(7);
    } else if (windowWidth > 490 && windowWidth < 1280) {
      setMovies(foundsMovies.slice(0, 7));
      setMoreMovies(7);
    } else if (windowWidth <= 490) {
      setMovies(foundsMovies.slice(0, 5));
      setMoreMovies(5);
    }
  }, [windowWidth]);

  function checkWindowWidth() {
    setWindowWidth(window.innerWidth);
  }

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
      .then(() => {
        localApi.getSavedMovies().then((movies) => {
          setSavedMovie(movies);
        });
      })
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

  useEffect(() => {
    if (isProfileUpdated) {
      const timer = setTimeout(() => {
        setIsProfileUpdated(false);
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (isProfileUpdatedFalse) {
      const timer = setTimeout(() => {
        setIsProfileUpdatedFalse(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isProfileUpdated, isProfileUpdatedFalse]);

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
    loadingUser,
    isProfileUpdated,
    isProfileUpdatedFalse,
  };
}
