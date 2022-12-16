import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register(props) {
  return (
    <>
      <AuthForm
        formName="Регистрация"
        submitButtonName="Зарегистрироваться"
        handleRegister={props.handleRegister}
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
