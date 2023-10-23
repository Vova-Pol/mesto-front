import React, { ReactElement } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { ICard } from '../types/cards';

interface ICardProps {
  cardData: ICard;
  onCardClick: (cardData: ICard) => void;
  onCardLike: (cardData: ICard) => void;
  onCardDelete: (cardData: ICard) => void;
}

function Card({
  cardData,
  onCardClick,
  onCardDelete,
  onCardLike,
}: ICardProps): ReactElement {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = cardData.owner._id === currentUser._id;
  const cardDeleteButtonClassName = isOwn
    ? 'elements__delete-button'
    : 'elements__delete-button elements__delete-button_hidden';

  const isLiked = cardData.likes.some((user) => user._id === currentUser._id);
  const cardLikeButtonClassName = isLiked
    ? 'elements__like-button elements__like-button_active'
    : 'elements__like-button';

  function handleClick() {
    onCardClick(cardData);
  }

  function handleLikeClick() {
    onCardLike(cardData);
  }

  function handleDeleteClick() {
    onCardDelete(cardData);
  }
  return (
    <li className="elements__item" key={cardData._id}>
      <img
        src={cardData.link}
        alt={cardData.name}
        className="elements__image"
        onClick={handleClick}
      />
      <div className="elements__info">
        <h2 className="elements__title">{cardData.name}</h2>
        <div className="elements__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="elements__like-counter">
            {cardData.likes.length}
          </span>
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
}

export default Card;
