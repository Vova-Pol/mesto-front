import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={
        props.isOpen
          ? `popup popup_type_${props.name} popup_opened`
          : `popup popup_type_${props.name}`
      }
    >
      <form
        className="popup__form"
        name={props.name}
        id="edit-profile-form"
        noValidate
        onSubmit={props.onSubmit}
      >
        <h3 className="popup__title">{props.title}</h3>
        {props.children}
        <button className="popup__save-button" type="submit">
          {props.buttonText}
        </button>
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        ></button>
      </form>
    </div>
  );
}

export default PopupWithForm;
