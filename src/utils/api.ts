import { ICard, IUpdateCardsValues } from '../types/cards';
import {
  IUpdateAvatarValues,
  IUpdateUserProfileValues,
  IUser,
} from '../types/user';
import { apiConfig } from './utils';
import axios from 'axios';
import { AxiosInstance } from 'axios';
import { IApiConfig } from '../types/api';

export class Api {
  // constructor(apiConfig) {
  //   this._baseUrl = apiConfig.baseUrl;
  //   this._token = apiConfig.token;
  // }

  apiClient: AxiosInstance;

  constructor(config: IApiConfig) {
    this.apiClient = axios.create({
      baseURL: config.baseUrl,
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
    });
  }
  // this.apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  requestInitialCards() {
    return this.apiClient.get('cards');
  }

  requestUserInfo() {
    return this.apiClient.get('users/me');
  }

  changeLikeCardStatus(card: ICard, isLiked: boolean, userData: IUser) {
    // const method = isLiked ? 'DELETE' : 'PUT';
    // return this.sendRequest(`cards/${card._id}/likes`, method, userData);

    return isLiked
      ? this.apiClient.delete(`cards/${card._id}/likes`)
      : this.apiClient.put(`cards/${card._id}/likes`, userData);
  }

  changeDeleteCardStatus(card: ICard) {
    return this.apiClient.delete(`cards/${card._id}`);
  }

  updateUserProfile(newData: IUpdateUserProfileValues) {
    return this.apiClient.patch('users/me', newData);
  }

  updateUserAvatar(newData: IUpdateAvatarValues) {
    return this.apiClient.patch('users/me/avatar', newData);
  }

  updateCards(newData: IUpdateCardsValues) {
    return this.apiClient.post('cards', newData);
  }
}

const api = new Api(apiConfig);
export default api;
