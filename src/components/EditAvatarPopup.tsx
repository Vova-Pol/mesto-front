import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import React from "react";

function EditAvatarPopup(props) {
  React.useEffect(() => {
    resetForm();
  }, [props.isOpen]);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation({
      avatar: "",
    });

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar(values);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar-image"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        type="url"
        placeholder="Ссылка на картинку"
        name="avatar"
        className="popup__input"
        id="avatar-link-input"
        required
        onChange={handleChange}
        value={values.avatar}
      />
      <span className="popup__input-error" id="avatar-link-input-error">
        {isValid ? "" : errors.avatar}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
