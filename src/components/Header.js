import React from "react";
import { Link, useHistory } from "react-router-dom";

function Header(props) {
  const [linkPath, setLinkPath] = React.useState("");
  const history = useHistory();
  console.log(history.location.pathname);

  let currentPath = history.location.pathname;
  let isSignInPage = currentPath === "/sign-in";
  let isSignUpPage = currentPath === "/sign-up";

  React.useEffect(() => {
    if (props.loggedIn) {
      setLinkPath("/sign-in");
      console.log("You are logged in");
    } else if (isSignUpPage) {
      setLinkPath("/sign-in");
      console.log("You are on Sign-up");
    } else if (isSignInPage) {
      setLinkPath("/sign-up");
      console.log("You are on sign-in");
    } else {
      console.log("Где-то в Header.js должна быть ошибка...");
    }
  }, [props, isSignInPage, isSignUpPage]);

  function handleLinkClick() {
    if (props.loggedIn) {
      localStorage.removeItem("jwt");
      props.onClickLink();
      history.push("/sign-in");
      setLinkPath("/sign-up");
    } else if (!props.loggedIn && isSignInPage) {
      setLinkPath("/sign-in");
    } else if (!props.loggedIn && isSignUpPage) {
      setLinkPath("/sign-up");
    } else {
      console.error("Что-то пошло не так в Header.js");
    }
  }
  console.log(props.email);

  return (
    <header className="header">
      <div className="header__logo-container">
        <div className="header__logo"></div>
        <p className="header__email">{props.loggedIn ? props.email : ""}</p>
        <Link className="header__link" to={linkPath} onClick={handleLinkClick}>
          {isSignUpPage ? "Войти" : isSignInPage ? "Регистрация" : "Выйти"}
        </Link>
      </div>
      <hr className="header__line" />
    </header>
  );
}

export default Header;
