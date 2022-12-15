import React from "react";
import { Link, useHistory } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register(props) {
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
    props.handleRegister(registerData);
  }

  return (
    // <>
    //   <form className="auth" onSubmit={handleSubmit}>
    //     <h1 className="auth__title">Регистрация</h1>
    //     <input
    //       className="auth__input"
    //       type="email"
    //       name="email"
    //       placeholder="Email"
    //       required
    //       onChange={handleChange}
    //       value={registerData.email}
    //     ></input>
    //     <input
    //       className="auth__input"
    //       type="password"
    //       name="password"
    //       placeholder="Пароль"
    //       required
    //       minLength="2"
    //       maxLength="40"
    //       onChange={handleChange}
    //       value={registerData.password}
    //     ></input>
    //     <button type="submit" className="auth__submit-button">
    //       Зарегистрироваться
    //     </button>
    //     <p className="auth__login-suggest">
    //       Уже зарегистрированы?{" "}
    //       <Link to="/sign-in" className="auth__link">
    //         Войти
    //       </Link>
    //     </p>
    //   </form>
    // </>
    <>
      <AuthForm
        formName="Регистрация"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        emailInputValue={registerData.email}
        passwordInputValue={registerData.password}
        submitButtonName="Зарегистрироваться"
      />
      <p className="auth__login-suggest">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="auth__link">
          Войти
        </Link>
      </p>
    </>
  );
}

export default Register;
