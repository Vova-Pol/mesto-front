import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import React, { FormEvent, ReactElement } from 'react';
import { IUpdateAvatarValues } from '../types/user';

interface IEditAvatarPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateAvatar: (values: IUpdateAvatarValues) => void;
}

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
}: IEditAvatarPopupProps): ReactElement {
  React.useEffect(() => {
    resetForm();
  }, [isOpen]);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation<IUpdateAvatarValues>({
      avatar: '',
    });

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    onUpdateAvatar(values);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar-image"
      isOpen={isOpen}
      onClose={onClose}
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
        {isValid ? '' : errors.avatar}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
