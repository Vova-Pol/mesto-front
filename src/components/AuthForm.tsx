import React, { FormEvent, ReactElement, useEffect } from 'react';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import { IAuthFormValues } from '../types/auth';

interface IAuthFormProps {
  formName: string;
  handleRegister: (values: IAuthFormValues) => void;
  handleLogin: (values: IAuthFormValues) => void;
  submitButtonName: string;
}

function AuthForm({
  formName,
  submitButtonName,
  handleLogin,
  handleRegister,
}: IAuthFormProps): ReactElement {
  useEffect(() => {
    resetForm();
  }, []);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation<IAuthFormValues>({
      password: '',
      email: '',
    });

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (formName === 'Регистрация') handleRegister(values);
    if (formName === 'Вход') handleLogin(values);
  }

  return (
    <form className="auth" onSubmit={handleSubmit}>
      <h1 className="auth__title">{formName}</h1>
      <input
        className="auth__input"
        type="email"
        name="email"
        placeholder="Email"
        required
        onChange={handleChange}
        value={values.email}
      ></input>
      <span className="auth__input-error">{isValid ? '' : errors.email}</span>
      <input
        className="auth__input"
        type="password"
        name="password"
        placeholder="Пароль"
        required
        minLength={2}
        maxLength={40}
        onChange={handleChange}
        value={values.password}
      ></input>
      <span className="auth__input-error">
        {isValid ? '' : errors.password}
      </span>
      <button type="submit" className="auth__submit-button">
        {submitButtonName}
      </button>
    </form>
  );
}

export default AuthForm;
