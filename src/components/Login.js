import React from "react";
import AuthForm from "./AuthForm";

function Login(props) {
  return (
    <AuthForm
      handleLogin={props.handleLogin}
      formName="Вход"
      submitButtonName="Войти"
    />
  );
}

export default Login;
