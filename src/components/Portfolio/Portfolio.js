import { Link } from "react-router-dom";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <Link
        to="https://github.com/kuzminaalexandra/first-project"
        className="portfolio__link"
        rel="noreferrer"
        target="_blank"
      >
        <p className="portfolio__subtitle">Статичный сайт</p>
        <div className="portfolio__icon">↗</div>
      </Link>

      <Link
        to="https://github.com/kuzminaalexandra/russian-travel"
        className="portfolio__link"
        rel="noreferrer"
        target="_blank"
      >
        <p className="portfolio__subtitle">Адаптивный сайт</p>
        <div className="portfolio__icon">↗</div>
      </Link>

      <Link
        to="https://github.com/kuzminaalexandra/react-mesto-api-full-gha"
        className="portfolio__link"
        rel="noreferrer"
        target="_blank"
      >
        <p className="portfolio__subtitle">Одностраничное приложение</p>
        <div className="portfolio__icon">↗</div>
      </Link>
    </section>
  );
}

export default Portfolio;
