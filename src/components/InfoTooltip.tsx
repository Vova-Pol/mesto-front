import React, { ReactElement } from 'react';

interface IInfoTooltipProps {
  isOpen: boolean;
  isSuccess: boolean;
  onClose: () => void;
}

function InfoTooltip({
  isOpen,
  isSuccess,
  onClose,
}: IInfoTooltipProps): ReactElement {
  return (
    <div className={isOpen ? 'popup popup_opened' : 'popup'}>
      <div className="tooltip">
        <span
          className={
            isSuccess
              ? 'tooltip__icon tooltip__icon_type_success'
              : 'tooltip__icon tooltip__icon_type_error'
          }
        ></span>
        <div className="tooltip__text-container">
          <p className="tooltip__text">
            {isSuccess
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </p>
        </div>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
