import "./Promo.css";

function Promo() {
  function scrollToSection(sectionId) {
    document.querySelector(sectionId)?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <section className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <div className="promo__navigation">
        <button
          className="promo__navigation-link"
          onClick={() => scrollToSection("#about-project")}
        >
          О проекте
        </button>

        <button
          className="promo__navigation-link"
          onClick={() => scrollToSection("#techs")}
        >
          Технологии
        </button>

        <button
          className="promo__navigation-link"
          onClick={() => scrollToSection("#about-me")}
        >
          Студент
        </button>
      </div>
    </section>
  );
}

export default Promo;
