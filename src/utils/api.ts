import { ICard, IUpdateCardsValues } from '../types/cards';
import {
  IUpdateAvatarValues,
  IUpdateUserProfileValues,
  IUser,
} from '../types/user';
import axios from 'axios';
import { AxiosInstance } from 'axios';
import { IAuthFormValues } from '../types/auth';
import { BASE_URL } from './constants';

export class Api {
  apiClient: AxiosInstance;

  constructor(baseUrl: string) {
    this.apiClient = axios.create({
      baseURL: baseUrl,
    });
  }

  // --------------------- User Methods

  requestUserInfo() {
    return this.apiClient.get('/users/me');
  }

  updateUserProfile(newData: IUpdateUserProfileValues) {
    return this.apiClient.patch('/users/me', newData);
  }

  updateUserAvatar(newData: IUpdateAvatarValues) {
    return this.apiClient.patch('/users/me/avatar', newData);
  }

  // --------------------- Auth Methods

  register(registerData: IAuthFormValues) {
    return this.apiClient.post('/sign-up', registerData);
  }

  login(loginData: IAuthFormValues) {
    return this.apiClient.post('/sign-in');
  }

  // --------------------- Cards Methods

  requestInitialCards() {
    return this.apiClient.get('/cards');
  }

  updateCards(newData: IUpdateCardsValues) {
    return this.apiClient.post('/cards', newData);
  }

  changeLikeCardStatus(card: ICard, isLiked: boolean, userData: IUser) {
    return isLiked
      ? this.apiClient.delete(`/cards/${card._id}/likes`)
      : this.apiClient.put(`/cards/${card._id}/likes`, userData);
  }

  changeDeleteCardStatus(card: ICard) {
    return this.apiClient.delete(`/cards/${card._id}`);
  }
}

export const api = new Api(BASE_URL);
