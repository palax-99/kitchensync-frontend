const BASE_URL = "http://localhost:3001";

// Prendo la lista degli utenti — solo SUPER_ADMIN
export const getUtentiApi = (token, onSuccess, onError) => {
  fetch(`${BASE_URL}/utenti`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

// Creo un nuovo utente — solo SUPER_ADMIN
export const creaUtenteApi = (token, body, onSuccess, onError) => {
  fetch(`${BASE_URL}/utenti`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

// Elimino un utente — solo SUPER_ADMIN
export const eliminaUtenteApi = (token, id, onSuccess, onError) => {
  fetch(`${BASE_URL}/utenti/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(() => onSuccess())
    .catch((err) => onError(err));
};
