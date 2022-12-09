export const BASE_URL = "https://auth.nomoreparties.co";

export function register(registerData) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  }).then((res) => {
    console.log(JSON.stringify(registerData));
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject("Сервер ответил ошибкой: " + res.status);
    }
  });
}
