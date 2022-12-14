import { Api } from "./api";

const authConfig = {
  baseUrl: "https://auth.nomoreparties.co/",
};

const apiAuth = new Api(authConfig);
export const BASE_URL = "https://auth.nomoreparties.co";

export function register(registerData) {
  // return fetch(`${BASE_URL}/signup`, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(registerData),
  // }).then((res) => {
  //   console.log(JSON.stringify(registerData));
  //   if (res.ok) {
  //     return res.json();
  //   } else {
  //     return Promise.reject("Сервер ответил ошибкой: " + res.status);
  //   }
  // });
  return apiAuth.sendRequest("signup", "POST", registerData);
}

export function authorize(authorizationData) {
  // return fetch(`${BASE_URL}/signin`, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(authorizationData),
  // }).then((res) => {
  //   if (res.ok) {
  //     return res.json();
  //   } else {
  //     return Promise.reject("Сервер ответил ошибкой: " + res.status);
  //   }
  // });
  return apiAuth.sendRequest("signin", "POST", authorizationData);
}

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject("Сервер ответил ошибкой: " + res.status);
    }
  });
}
