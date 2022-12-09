import React from "react";

function Login() {
  return (
    <form className="auth">
      <h1 className="auth__title">Вход</h1>
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
        Войти
      </button>
    </form>
  );
}

export default Login;
