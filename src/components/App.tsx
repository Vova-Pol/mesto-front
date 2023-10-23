import React, { ReactElement } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddCardPopup from './AddCardPopup';
import { Route, Switch, useHistory } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App(): ReactElement {
  const [isAddCardPopupOpen, setAddCardPopupIsOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupIsOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupIsOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState();

  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: '',
    _id: '',
    cohort: '',
  });

  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    api
      .requestUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleAddCardClick() {
    setAddCardPopupIsOpen(true);
  }

  const handleEditAvatarClick = () => {
    setEditAvatarPopupIsOpen(true);
  };

  function handleEditProfileClick() {
    setEditProfilePopupIsOpen(true);
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  }

  function closeAllPopups() {
    setAddCardPopupIsOpen(false);
    setEditAvatarPopupIsOpen(false);
    setEditProfilePopupIsOpen(false);
    setSelectedCard();
  }

  function handleUpdateUser(newData) {
    api
      .sendRequest('users/me', 'PATCH', newData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateAvatar(newData) {
    api
      .sendRequest('users/me/avatar', 'PATCH', newData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateCards(newData) {
    api
      .sendRequest('cards', 'POST', newData)
      .then((cardData) => {
        setCards([cardData, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // --- Cards

  const [cards, setCards] = React.useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    api
      .changeLikeCardStatus(card, isLiked, currentUser)
      .then((newCard) => {
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

  function handleCardDelete(card) {
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
      .then((cardsArr) => {
        setCards(cardsArr);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // --- Auth

  const [userAuthData, setUserAuthData] = React.useState({});

  function handleLogin(authData) {
    auth
      .authorize(authData)
      .then((data) => {
        if (data) {
          setUserAuthData({ email: authData.email });
          setLoggedIn(true);
          localStorage.setItem('jwt', data.token);
          history.push('/');
        }
      })
      .catch((err) => {
        console.error('Сервер ответил ошибкой: ' + err);
      });
  }

  function handleRegister(registerData) {
    auth
      .register(registerData)
      .then((data) => {
        if (data) {
          setTooltip({
            isOpen: true,
            isSuccess: true,
          });
        }
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

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth
        .checkToken(jwt)
        .then((data) => {
          setUserAuthData({
            email: data.data.email,
          });
          setLoggedIn(true);
          history.push('/');
        })
        .catch((err) => {
          console.error(err);
          history.push('/sign-in');
        });
    }
  }, [history]);

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
          // loggedIn={loggedIn}
          loggedIn={true}
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
            {/* {!loggedIn ? (
              <Redirect to="/sign-up" />
            ) : ( */}
            <CurrentUserContext.Prov_ider value={currentUser}>
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

              <div className="popup" _id="popup-delete-card">
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
            </CurrentUserContext.Prov_ider>
            {/* )} */}
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
