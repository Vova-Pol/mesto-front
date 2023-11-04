import React, { ReactElement } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddCardPopup from './AddCardPopup';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
// import * as auth from '../utils/auth';
import { ICard, IUpdateCardsValues } from '../types/cards';
import { IUpdateAvatarValues, IUpdateUserProfileValues } from '../types/user';
import { IAuthFormValues } from '../types/auth';

function App(): ReactElement {
  const [isAddCardPopupOpen, setAddCardPopupIsOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupIsOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupIsOpen] =
    React.useState(false);

  const initSelectedCard = {
    likes: [],
    _id: '',
    name: '',
    link: '',
    owner: {
      name: '',
      about: '',
      avatar: '',
      _id: '',
      cohort: '',
    },
    createdAt: '',
  };

  const [selectedCard, setSelectedCard] =
    React.useState<ICard>(initSelectedCard);

  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: '',
    _id: '',
    cohort: '',
  });

  const [loggedIn, setLoggedIn] = React.useState(true);
  const history = useHistory();

  // React.useEffect(() => {
  //   api
  //     .requestUserInfo()
  //     .then((res) => {
  //       setCurrentUser(res.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  function handleAddCardClick() {
    setAddCardPopupIsOpen(true);
  }

  const handleEditAvatarClick = () => {
    setEditAvatarPopupIsOpen(true);
  };

  function handleEditProfileClick() {
    setEditProfilePopupIsOpen(true);
  }

  function handleCardClick(cardData: ICard) {
    setSelectedCard(cardData);
  }

  function closeAllPopups() {
    setAddCardPopupIsOpen(false);
    setEditAvatarPopupIsOpen(false);
    setEditProfilePopupIsOpen(false);
    setSelectedCard(initSelectedCard);
  }

  function handleUpdateUser(newData: IUpdateUserProfileValues) {
    api
      .updateUserProfile(newData)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateAvatar(newData: IUpdateAvatarValues) {
    api
      .updateUserAvatar(newData)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateCards(newData: IUpdateCardsValues) {
    api
      .updateCards(newData)
      .then((res) => {
        setCards([res.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // --- Cards

  const [cards, setCards] = React.useState<ICard[]>([]);

  function handleCardLike(card: ICard) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    api
      .changeLikeCardStatus(card, isLiked, currentUser)
      .then((res) => {
        const newCard = res.data;
        setCards(
          cards.map((card) => {
            return card._id === newCard._id ? newCard : card;
          }),
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardDelete(card: ICard) {
    api
      .changeDeleteCardStatus(card)
      .then(() => {
        setCards(cards.filter((elem) => elem._id !== card._id));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  React.useEffect(() => {
    api
      .requestInitialCards()
      .then((res) => {
        setCards(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // --- Auth

  const [userAuthData, setUserAuthData] = React.useState({
    email: '',
  });

  function handleLogin(authData: IAuthFormValues) {
    api
      .login(authData)
      .then((res) => {
        setUserAuthData({ email: authData.email });
        setLoggedIn(true);
        localStorage.setItem('jwt', res.data.token);
        history.push('/');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleRegister(registerData: IAuthFormValues) {
    api
      .register(registerData)
      .then((data) => {
        setTooltip({
          isOpen: true,
          isSuccess: true,
        });
      })
      .catch((err) => {
        console.error(err);
        setTooltip({
          isOpen: true,
          isSuccess: false,
        });
      });
  }

  // --- Tooltip

  const [tooltip, setTooltip] = React.useState({
    isOpen: false,
    isSuccess: false,
  });

  function handleTooltipClose() {
    if (tooltip.isSuccess) {
      setTooltip({
        ...tooltip,
        isOpen: false,
      });
      history.push('/sign-in');
    } else {
      setTooltip({
        ...tooltip,
        isOpen: false,
      });
    }
  }

  // React.useEffect(() => {
  //   if (localStorage.getItem('jwt')) {
  //     const jwt = localStorage.getItem('jwt');
  //     auth
  //       .checkToken(jwt)
  //       .then((data) => {
  //         setUserAuthData({
  //           email: data.data.email,
  //         });
  //         setLoggedIn(true);
  //         history.push('/');
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //         history.push('/sign-in');
  //       });
  //   }
  // }, [history]);

  function handleHeaderLink() {
    if (loggedIn) {
      setLoggedIn(false);
    }
  }

  // --- Render

  return (
    <div className="page">
      <div className="page__container">
        <Header
          loggedIn={loggedIn}
          email={userAuthData.email}
          onClickLink={handleHeaderLink}
        />

        <Switch>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
            <InfoTooltip
              isOpen={tooltip.isOpen}
              isSuccess={tooltip.isSuccess}
              onClose={handleTooltipClose}
            />
          </Route>

          <Route exact path="/">
            {!loggedIn ? (
              <Redirect to="/sign-up" />
            ) : (
              <CurrentUserContext.Provider value={currentUser}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddCard={handleAddCardClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />

                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                />

                <AddCardPopup
                  isOpen={isAddCardPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateCards={handleUpdateCards}
                />

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />

                <div className="popup" id="popup-delete-card">
                  <form className="popup__form">
                    <h3 className="popup__title popup__title_type_delete">
                      Вы уверены?
                    </h3>
                    <button className="popup__save-button" type="submit">
                      Да
                    </button>
                    <button
                      className="popup__close-button"
                      type="button"
                    ></button>
                  </form>
                </div>

                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                />
              </CurrentUserContext.Provider>
            )}
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
