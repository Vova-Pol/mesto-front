import React from "react";
import { useHistory } from "react-router-dom";
import * as auth from "../utils/auth";

function Login(props) {
  const history = useHistory();

  const [authorizationData, setAuthorizationData] = React.useState({
    password: "",
    email: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setAuthorizationData({
      ...authorizationData,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    auth
      .authorize(authorizationData)
      .then((data) => {
        if (data) {
          setAuthorizationData({
            password: "",
            email: "",
          });
          localStorage.setItem("jwt", data.token);
          props.handleLogin();
          history.push("/");
          console.log(data.token);
          console.log("Вы авторизовались!");
          console.log(localStorage.getItem("jwt"));
        }
      })
      .catch((err) => {
        console.error("Сервер ответил ошибкой: " + err);
      });
  }

  return (
    <form className="auth" onSubmit={handleSubmit}>
      <h1 className="auth__title">Вход</h1>
      <input
        className="auth__input"
        type="email"
        name="email"
        placeholder="Email"
        required
        onChange={handleChange}
        value={authorizationData.email}
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
        value={authorizationData.password}
      ></input>
      <button type="submit" className="auth__submit-button">
        Войти
      </button>
    </form>
  );
}

export default Login;
