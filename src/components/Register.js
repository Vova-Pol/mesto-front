import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";
import { useForm } from "../hooks/useForm";

function Register(props) {
  const { values, handleChange, setValues } = useForm({
    password: "",
    email: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleRegister(values);
    setValues({
      password: "",
      email: "",
    });
  }

  return (
    <>
      <AuthForm
        formName="Регистрация"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        inputsValues={values}
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
