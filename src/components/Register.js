import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as auth from "../utils/auth";

function Register() {
  const history = useHistory();

  const [registerData, setRegisterData] = React.useState({
    password: "",
    email: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    auth
      .register(registerData)
      .then((data) => {
        if (data) {
          history.push("/sign-in");
          console.log("Ты зарегестрирован!");
        }
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
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
