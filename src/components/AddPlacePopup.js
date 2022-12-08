import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  React.useEffect(() => {
    setInputName("");
    setInputLink("");
  }, [props.isOpen]);

  const [inputName, setInputName] = React.useState("");
  const [inputLink, setInputLink] = React.useState("");

  function handleChangeInputName(evt) {
    setInputName(evt.target.value);
  }

  function handleChangeInputLink(evt) {
    setInputLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateCards({
      name: inputName,
      link: inputLink,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-post"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <input
        type="text"
        placeholder="Название места"
        name="name"
        className="popup__input"
        id="place-name-input"
        required
        minLength="2"
        maxLength="30"
        onChange={handleChangeInputName}
        value={inputName}
      />
      <span className="popup__input-error" id="place-name-input-error"></span>
      <input
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        className="popup__input"
        id="place-link-input"
        required
        onChange={handleChangeInputLink}
        value={inputLink}
      />
      <span className="popup__input-error" id="place-link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
