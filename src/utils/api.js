import { apiConfig } from "./utils";

export class Api {
  constructor(apiConfig) {
    this._baseUrl = apiConfig.baseUrl;
    this._init = apiConfig.init;
  }

  requestInitialCards() {
    return this.sendRequest("cards", "GET");
  }

  requestUserInfo() {
    return this.sendRequest("users/me", "GET");
  }

  changeLikeCardStatus(card, isLiked, userData) {
    const method = isLiked ? "DELETE" : "PUT";
    return this.sendRequest(`cards/${card._id}/likes`, method, userData);
  }

  changeDeleteCardStatus(card) {
    return this.sendRequest(`cards/${card._id}`, "DELETE");
  }

  sendRequest(urlEnding, method, data = null) {
    this._init.method = method;
    const url = this._baseUrl + urlEnding;

    if (data) {
      this._init.body = JSON.stringify(data);
    }

    return fetch(url, this._init).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject("Сервер ответил ошибкой: " + res.status);
      }
    });
  }
}

const api = new Api(apiConfig);
export default api;
