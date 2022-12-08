import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.cardData.owner._id === currentUser._id;
  const cardDeleteButtonClassName = isOwn
    ? "elements__delete-button"
    : "elements__delete-button elements__delete-button_hidden";

  const isLiked = props.cardData.likes.some(
    (user) => user._id === currentUser._id
  );
  const cardLikeButtonClassName = isLiked
    ? "elements__like-button elements__like-button_active"
    : "elements__like-button";

  function handleClick() {
    props.onCardClick(props.cardData);
  }

  function handleLikeClick() {
    props.onCardLike(props.cardData);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.cardData);
  }
  return (
    <li className="elements__item" key={props.cardData._id}>
      <img
        src={props.cardData.link}
        alt={props.cardData.name}
        className="elements__image"
        onClick={handleClick}
      />
      <div className="elements__info">
        <h2 className="elements__title">{props.cardData.name}</h2>
        <div className="elements__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="elements__like-counter">
            {props.cardData.likes.length}
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
