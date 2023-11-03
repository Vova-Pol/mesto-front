import React, { ReactElement } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { ICard } from '../types/cards';

interface IMainProps {
  onEditAvatar: () => void;
  onEditProfile: () => void;
  onAddPlace: () => void;
  cards: ICard[];
  onCardClick: () => void;
  onCardLike: () => void;
  onCardDelete: () => void;
}

function Main({
  onAddPlace,
  onCardClick,
  onCardDelete,
  onCardLike,
  onEditAvatar,
  onEditProfile,
  cards,
}: IMainProps): ReactElement {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile section-sizing">
        <img
          src={currentUser.avatar}
          alt="аватар профайла"
          className="profile__picture"
        />
        <div className="profile__edit-icon-container" onClick={onEditAvatar}>
          <span className="profile__edit-icon"></span>
        </div>
        <article className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__occupation">{currentUser.about}</p>
          </div>
          <button
            className="profile__edit-button"
            onClick={onEditProfile}
          ></button>
        </article>
        <button className="profile__add-button" onClick={onAddPlace}></button>
      </section>

      <section className="elements section-sizing">
        <ul className="elements__list">
          {cards.map((cardData) => (
            <Card
              cardData={cardData}
              key={cardData._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
