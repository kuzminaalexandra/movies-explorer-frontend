import { Link, useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <section className="not__found-page">
      <h2 className="not__found-title">404</h2>
      <p className="not__found-text">Страница не найдена</p>
      <Link to="#" className="not__found-back" onClick={goBack}>
        Назад
      </Link>
    </section>
  );
}

export default NotFound;
