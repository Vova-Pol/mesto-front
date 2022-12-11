import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <div className="header__logo-container">
        <div className="header__logo"></div>
        <Link className="header__link" to="/sign-in">
          Привет
        </Link>
      </div>
      <hr className="header__line" />
    </header>
  );
}

export default Header;
