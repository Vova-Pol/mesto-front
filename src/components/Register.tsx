import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';
import { IAuthFormValues } from '../types/auth';

interface IRegisterProps {
  handleRegister: (values: IAuthFormValues) => void;
}

function Register({ handleRegister }: IRegisterProps): ReactElement {
  return (
    <>
      <AuthForm
        formName="Регистрация"
        submitButtonName="Зарегистрироваться"
        handleRegister={handleRegister}
      />
      <p className="auth__login-suggest">
        Уже зарегистрированы?{' '}
        <Link to="/sign-in" className="auth__link">
          Войти
        </Link>
      </p>
    </>
  );
}

export default Register;
