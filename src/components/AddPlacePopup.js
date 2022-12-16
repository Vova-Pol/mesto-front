import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

function AddPlacePopup(props) {
  React.useEffect(() => {
    setValues({
      name: "",
      link: "",
    });
  }, [props.isOpen]);

  const { values, handleChange, setValues } = useForm({
    name: "",
    link: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateCards(values);
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
        onChange={handleChange}
        value={values.name}
      />
      <span className="popup__input-error" id="place-name-input-error"></span>
      <input
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        className="popup__input"
        id="place-link-input"
        required
        onChange={handleChange}
        value={values.link}
      />
      <span className="popup__input-error" id="place-link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
