import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    resetForm();
    setValues(currentUser);
  }, [currentUser, props.isOpen]);

  const { values, handleChange, setValues, errors, isValid, resetForm } =
    useFormAndValidation({
      name: '',
      about: '',
    });

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser(values);
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
        minLength={2}
        maxLength={40}
        value={values.name}
        onChange={handleChange}
      />
      <span className="popup__input-error" id="profile-name-input-error">
        {isValid ? '' : errors.name}
      </span>
      <input
        type="text"
        placeholder="Род деятельности"
        name="about"
        className="popup__input"
        id="profile-occupation-input"
        required
        minLength={2}
        maxLength={200}
        value={values.about}
        onChange={handleChange}
      />
      <span className="popup__input-error" id="profile-occupation-input-error">
        {isValid ? '' : errors.about}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
