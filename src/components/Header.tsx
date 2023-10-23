import React, { ReactElement } from 'react';
import { Link, useHistory } from 'react-router-dom';

interface IHeaderProps {
  loggedIn: boolean;
  email: string;
  onClickLink: () => void;
}

function Header({ loggedIn, email, onClickLink }: IHeaderProps): ReactElement {
  const [linkPath, setLinkPath] = React.useState('');
  const history = useHistory();

  const currentPath = history.location.pathname;
  const isSignInPage = currentPath === '/sign-in';
  const isSignUpPage = currentPath === '/sign-up';

  React.useEffect(() => {
    if (loggedIn) {
      setLinkPath('/sign-in');
    } else if (isSignUpPage) {
      setLinkPath('/sign-in');
    } else if (isSignInPage) {
      setLinkPath('/sign-up');
    } else if (!loggedIn && currentPath === '/') {
      setLinkPath('/sign-in');
    } else {
      console.log('Где-то в Header.js должна быть ошибка...');
    }
  }, [loggedIn, isSignInPage, isSignUpPage, currentPath]);

  function handleLinkClick() {
    if (loggedIn) {
      localStorage.removeItem('jwt');
      onClickLink();
      history.push('/sign-in');
      setLinkPath('/sign-up');
    } else if (!loggedIn && isSignInPage) {
      setLinkPath('/sign-in');
    } else if (!loggedIn && isSignUpPage) {
      setLinkPath('/sign-up');
    } else {
      console.error('Что-то пошло не так в Header.js');
    }
  }

  return (
    <header className="header">
      <div className="header__logo-container">
        <div className="header__logo"></div>
        <p className="header__email">{loggedIn ? email : ''}</p>
        <Link className="header__link" to={linkPath} onClick={handleLinkClick}>
          {isSignUpPage ? 'Войти' : isSignInPage ? 'Регистрация' : 'Выйти'}
        </Link>
      </div>
      <hr className="header__line" />
    </header>
  );
}

export default Header;
