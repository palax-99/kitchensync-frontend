const BASE_URL = "http://localhost:3001";

// Prendo tutte le categorie dell'admin loggato — filtrate automaticamente per sezione
export const getCategorieApi = (token, onSuccess, onError) => {
  fetch(`${BASE_URL}/categorie`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

// Creo una nuova categoria
export const creaCategoriaApi = (token, nome, onSuccess, onError) => {
  fetch(`${BASE_URL}/categorie`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome }),
  })
    .then((res) => res.json())
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

// Modifico il nome di una categoria
export const modificaCategoriaApi = (token, id, nome, onSuccess, onError) => {
  fetch(`${BASE_URL}/categorie/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome }),
  })
    .then((res) => res.json())
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

// Elimino una categoria
export const eliminaCategoriaApi = (token, id, onSuccess, onError) => {
  fetch(`${BASE_URL}/categorie/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(() => onSuccess())
    .catch((err) => onError(err));
};
