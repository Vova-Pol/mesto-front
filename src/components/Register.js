import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

function Register() {
  const history = useHistory();

  const [registerData, setRegisterData] = React.useState({
    password: "",
    email: "",
  });

  const [tooltip, setTooltip] = React.useState({
    isOpen: false,
    isSuccess: false,
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
          setTooltip({
            isOpen: true,
            isSuccess: true,
          });
        }
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
        setTooltip({
          isOpen: true,
          isSuccess: false,
        });
      });
  }

  function handleTooltipClose() {
    if (tooltip.isSuccess) {
      setTooltip({
        ...tooltip,
        isOpen: false,
      });
      history.push("/sign-in");
      console.log("Ты успешно зарегестрировался и закрыл тултип.");
    } else {
      setTooltip({
        ...tooltip,
        isOpen: false,
      });
      console.log("Неуспешная регистрация и ты закрыл тултип.");
    }
  }

  return (
    <>
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
      <InfoTooltip
        isOpen={tooltip.isOpen}
        isSuccess={tooltip.isSuccess}
        onClose={handleTooltipClose}
      />
    </>
  );
}

export default Register;
