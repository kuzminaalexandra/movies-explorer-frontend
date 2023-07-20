import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component }) => {
  const loggedIn = localStorage.getItem("loggedIn") === "true";

  if (loggedIn === false) {
    return <Navigate to="/" />;
  }
  return <Component />;
};

export default ProtectedRoute;
