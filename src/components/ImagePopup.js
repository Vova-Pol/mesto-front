import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={
        props.card ? "popup popup_dark popup_opened" : "popup popup_dark "
      }
    >
      <div className="popup__image-container">
        <img
          src={props.card ? props.card.link : "#"}
          alt={props.card ? props.card.name : ""}
          className="popup__image"
        />
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        ></button>
        <p className="popup__subtitle">{props.card ? props.card.name : ""}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
