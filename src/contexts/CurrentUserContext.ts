import React from 'react';
import { IUser } from '../types/user';

const defaultCuurrentUser = {
  name: '',
  about: '',
  avatar: '',
  _id: '',
  cohort: '',
};

export const CurrentUserContext =
  React.createContext<IUser>(defaultCuurrentUser);
