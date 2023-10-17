import React from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function AuthForm(props) {
  React.useEffect(() => {
    resetForm();
  }, []);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation({
      password: "",
      email: "",
    });

  function handleSubmit(evt) {
    evt.preventDefault();

    if (props.formName === "Регистрация") {
      props.handleRegister(values);
    } else if (props.formName === "Вход") {
      props.handleLogin(values);
    }
  }

  return (
    <form className="auth" onSubmit={handleSubmit}>
      <h1 className="auth__title">{props.formName}</h1>
      <input
        className="auth__input"
        type="email"
        name="email"
        placeholder="Email"
        required
        onChange={handleChange}
        value={values.email}
      ></input>
      <span className="auth__input-error">{isValid ? "" : errors.email}</span>
      <input
        className="auth__input"
        type="password"
        name="password"
        placeholder="Пароль"
        required
        minLength="2"
        maxLength="40"
        onChange={handleChange}
        value={values.password}
      ></input>
      <span className="auth__input-error">
        {isValid ? "" : errors.password}
      </span>
      <button type="submit" className="auth__submit-button">
        {props.submitButtonName}
      </button>
    </form>
  );
}

export default AuthForm;
