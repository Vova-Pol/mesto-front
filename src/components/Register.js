import React from "react";
import "../index.css";

function Register() {
  return (
    <form className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <input
        className="auth__input"
        type="email"
        name="email"
        placeholder="Email"
        required
      ></input>
      <input
        className="auth__input"
        type="password"
        name="password"
        placeholder="Пароль"
        required
      ></input>
      <button type="submit" className="auth__submit-button">
        Зарегистрироваться
      </button>
      <p className="auth__login-suggest">Уже зарегистрированы? Войти</p>
    </form>
  );
}

export default Register;
