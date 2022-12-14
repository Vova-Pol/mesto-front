import { Api } from "./api";

const authConfig = {
  baseUrl: "https://auth.nomoreparties.co/",
};

const apiAuth = new Api(authConfig);

export function register(registerData) {
  return apiAuth.sendRequest("signup", "POST", registerData);
}

export function authorize(authorizationData) {
  return apiAuth.sendRequest("signin", "POST", authorizationData);
}

export function checkToken(token) {
  const checkTokenApiConfig = {
    baseUrl: "https://auth.nomoreparties.co/",
    token: `Bearer ${token}`,
  };
  const checkTokenApi = new Api(checkTokenApiConfig);
  return checkTokenApi.sendRequest("users/me", "GET");
}
