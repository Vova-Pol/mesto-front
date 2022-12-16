import React from "react";
import AuthForm from "./AuthForm";
import { useForm } from "../hooks/useForm";

function Login(props) {
  const { values, handleChange, setValues } = useForm({
    password: "",
    email: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleLogin(values);
    setValues({
      password: "",
      email: "",
    });
  }

  return (
    <AuthForm
      handleSubmit={handleSubmit}
      formName="Вход"
      handleChange={handleChange}
      inputsValues={values}
      submitButtonName="Войти"
    />
  );
}

export default Login;
