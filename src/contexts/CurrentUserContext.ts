import React from 'react';
import { ICurrentUser } from '../types/user';

const defaultCuurrentUser = {
  name: '',
  about: '',
  avatar: '',
  _id: '',
  cohort: '',
};

export const CurrentUserContext =
  React.createContext<ICurrentUser>(defaultCuurrentUser);
