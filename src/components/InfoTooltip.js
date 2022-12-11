import React from "react";

function InfoTooltip(props) {
  return (
    <div className={props.isOpen ? "popup popup_opened" : "popup"}>
      <div className="tooltip">
        <span
          className={
            props.isSuccess
              ? "tooltip__icon tooltip__icon_type_success"
              : "tooltip__icon tooltip__icon_type_error"
          }
        ></span>
        <div className="tooltip__text-container">
          <p className="tooltip__text">
            {props.isSuccess
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </p>
        </div>
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
