import { Routes, Route, useLocation } from "react-router-dom";
import { useApp } from "../../hooks/App";
import CurrentUserContext from "../../context/CurrentUserContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  const { currentUser, loggedIn } = useApp();
  const location = useLocation();

  const pagesWithHeader = [
    "/",
    "/movies",
    "/saved-movies",
    "/profile",
  ].includes(location.pathname);
  const pagesWithFooter = ["/", "/movies", "/saved-movies"].includes(
    location.pathname
  );

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {pagesWithHeader && <Header />}
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/" element={<Main />} />
          <Route path="/*" element={<NotFound />} />

          <Route
            path="/movies"
            element={
              <ProtectedRoute
                path="/movies"
                element={Movies}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                path="/saved-movies"
                element={SavedMovies}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                path="/profile"
                element={Profile}
                loggedIn={loggedIn}
              />
            }
          />
        </Routes>
        {pagesWithFooter && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
