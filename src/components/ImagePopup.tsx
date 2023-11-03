import React, { ReactElement } from 'react';
import { ICard } from '../types/cards';

interface IImagePopupProps {
  card: ICard;
  onClose: () => void;
}

function ImagePopup({ card, onClose }: IImagePopupProps): ReactElement {
  return (
    <div
      className={card ? 'popup popup_dark popup_opened' : 'popup popup_dark '}
    >
      <div className="popup__image-container">
        <img
          src={card ? card.link : '#'}
          alt={card ? card.name : ''}
          className="popup__image"
        />
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <p className="popup__subtitle">{card ? card.name : ''}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
