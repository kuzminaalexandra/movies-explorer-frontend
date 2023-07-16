import { Link } from "react-router-dom";

import "./AboutMe.css";
import myPhoto from "../../images/photo.jpg";

function AboutMe() {
  return (
    <section id="about-me" className="about-me">
      <h2 className="about-me__title">Студент</h2>

      <div className="about-me__wrapper">
        <div className="about-me__block">
          <h3 className="about-me__name">Александра</h3>
          <p className="about-me__info">Веб-разработчик, 18 лет</p>
          <p className="about-me__description">
            Всем привет! Меня зовут мистер 100500 профессий! В жизни я
            работник-пятидневщик, махровый такой планктон, зато в душЕ я великий
            программер - только вглядитесь в моё лицо! Это был интересный, хоть
            и сложный опыт - обучение.
          </p>
          <Link
            to="https://github.com/kuzminaalexandra"
            className="about-me__github"
            target="_blank"
          >
            Github
          </Link>
        </div>

        <img
          src={myPhoto}
          alt="Моя фотокарточка"
          className="about-me__photo"
        ></img>
      </div>
    </section>
  );
}

export default AboutMe;
