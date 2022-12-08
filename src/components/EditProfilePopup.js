import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [occupation, setOccupation] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setOccupation(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleOccupationChange(evt) {
    setOccupation(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name: name,
      about: occupation,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        type="text"
        placeholder="Имя"
        name="name"
        className="popup__input"
        id="profile-name-input"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__input-error" id="profile-name-input-error"></span>
      <input
        type="text"
        placeholder="Род деятельности"
        name="about"
        className="popup__input"
        id="profile-occupation-input"
        required
        minLength="2"
        maxLength="200"
        value={occupation}
        onChange={handleOccupationChange}
      />
      <span
        className="popup__input-error"
        id="profile-occupation-input-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
