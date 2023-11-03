import React, { ReactElement } from 'react';
import AuthForm from './AuthForm';
import { IAuthFormValues } from '../types/auth';

interface ILoginProps {
  handleLogin: (values: IAuthFormValues) => void;
}

function Login({ handleLogin }: ILoginProps): ReactElement {
  return (
    <AuthForm
      handleLogin={handleLogin}
      formName="Вход"
      submitButtonName="Войти"
    />
  );
}

export default Login;
