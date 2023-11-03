import React, { ReactElement } from 'react';

interface IPopupWithFormProps {
  isOpen: boolean;
  name: string;
  onSubmit: () => void;
  title: string;
  children: ReactElement[];
  buttonText: string;
  onClose: () => void;
}

function PopupWithForm({
  isOpen,
  name,
  onClose,
  onSubmit,
  title,
  children,
  buttonText,
}: IPopupWithFormProps): ReactElement {
  return (
    <div
      className={
        isOpen
          ? `popup popup_type_${name} popup_opened`
          : `popup popup_type_${name}`
      }
    >
      <form
        className="popup__form"
        name={name}
        id="edit-profile-form"
        noValidate
        onSubmit={onSubmit}
      >
        <h3 className="popup__title">{title}</h3>
        {children}
        <button className="popup__save-button" type="submit">
          {buttonText}
        </button>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
      </form>
    </div>
  );
}

export default PopupWithForm;
