import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [registerData, setRegisterData] = React.useState({
    email: "",
    password: "",
  });

  console.log(registerData);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    console.log("Well done!");
    console.log(registerData);
  }

  return (
    <form className="auth" onSubmit={handleSubmit}>
      <h1 className="auth__title">Регистрация</h1>
      <input
        className="auth__input"
        type="email"
        name="email"
        placeholder="Email"
        required
        onChange={handleChange}
        value={registerData.email}
      ></input>
      <input
        className="auth__input"
        type="password"
        name="password"
        placeholder="Пароль"
        required
        minLength="2"
        maxLength="40"
        onChange={handleChange}
        value={registerData.password}
      ></input>
      <button type="submit" className="auth__submit-button">
        Зарегистрироваться
      </button>
      <p className="auth__login-suggest">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="auth__link">
          Войти
        </Link>
      </p>
    </form>
  );
}

export default Register;
