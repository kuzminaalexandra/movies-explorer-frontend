import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../hooks/App";
import { useForms } from "../../hooks/Forms";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./Profile.css";

function Profile() {
  const currentUser = useContext(CurrentUserContext);
  const { handleUpdateUser, handleLogout } = useApp();
  const { values, handleChange, isValid, setValues } = useForms();

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser, setValues]);

  function handleEditBtnClick() {
    setIsEdit(true);
  }

  function handleSaveBtnClick(evt) {
    if (isValid) {
      evt.preventDefault();
      handleUpdateUser(values);
      setIsEdit(false);
    }
  }

  return (
    <>
      <section className="profile">
        <h1 className="profile__welcome-text">Привет, {currentUser.name}!</h1>

        <form className="profile__update-form" noValidate>
          <label className="profile__label">
            <span className="profile__label-text">Имя</span>
            <input
              className="profile__input"
              name="name"
              type="name"
              minLength="2"
              maxLength="30"
              readOnly={!isEdit}
              required
              value={values.name || ""}
              onChange={handleChange}
            />
          </label>
          <label className="profile__label">
            <span className="profile__label-text">E-mail</span>
            <input
              className="profile__input"
              name="email"
              type="email"
              minLength="2"
              maxLength="30"
              readOnly={!isEdit}
              required
              value={values.email || ""}
              onChange={handleChange}
            />
          </label>
        </form>
        <div className="profile__buttons-wrapper">
          {isEdit ? (
            <Link
              to="/profile"
              type="submit"
              className="profile__btn-save"
              onClick={handleSaveBtnClick}
              disabled={!isValid}
            >
              Сохранить
            </Link>
          ) : (
            <Link
              to="/profile"
              type="submit"
              className="profile__btn-edit"
              onClick={handleEditBtnClick}
            >
              Редактировать
            </Link>
          )}

          <button className="profile_btn-logout" onClick={handleLogout}>
            Выйти из аккаунта
          </button>
        </div>
      </section>
    </>
  );
}

export default Profile;
