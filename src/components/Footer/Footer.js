import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h4 className="footer__description">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h4>
      <div className="footer__wrapper">
        <p className="footer__copyright">&copy; 2023</p>

        <div className="footer__links">
          <Link
            to="https://practicum.yandex.ru"
            className="footer__link"
            rel="noreferrer"
            target="_blank"
          >
            Яндекс.Практикум
          </Link>
          <Link
            to="https://github.com/kuzminaalexandra"
            className="footer__link"
            rel="noreferrer"
            target="_blank"
          >
            Github
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
