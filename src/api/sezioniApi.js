const BASE_URL = "http://localhost:3001";

// Prendo tutte le sezioni — solo per il SUPER_ADMIN
export const getSezioniApi = (token, onSuccess, onError) => {
  fetch(`${BASE_URL}/sezioni`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

// Creo una nuova sezione
export const creaSezioneApi = (token, nome, onSuccess, onError) => {
  fetch(`${BASE_URL}/sezioni`, {
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

// Attivo o disattivo una sezione
export const cambiaStatoSezioneApi = (token, id, attiva, onSuccess, onError) => {
  fetch(`${BASE_URL}/sezioni/${id}/stato`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(attiva),
  })
    .then((res) => res.json())
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

// Elimino una sezione
export const eliminaSezioneApi = (token, id, onSuccess, onError) => {
  fetch(`${BASE_URL}/sezioni/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(() => onSuccess())
    .catch((err) => onError(err));
};
