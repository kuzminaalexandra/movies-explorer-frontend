import "./AboutProject.css";

function AboutProject() {
  return (
    <section id="about-project" className="about-project">
      <h2 className="about-project__title">О проекте</h2>

      <ul className="about-project__info">
        <li className="about-project__info-block">
          <h3 className="about-project__info-subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__info-description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about-project__info-block">
          <h3 className="about-project__info-subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__info-description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>

      <div className="about-project__progress">
        <div className="about-project__one-week">
          <h4 className="about-project__progress-text-short">1 неделя</h4>
          <p className="about-project__subtitle">Back-end</p>
        </div>
        <div className="about-project__four-week">
          <h4 className="about-project__progress-text-long">4 недели</h4>
          <p className="about-project__subtitle">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
