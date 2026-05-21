const BASE_URL = "http://localhost:3001";

// Chiamo il backend per fare il login
// onSuccess riceve il token JWT, onError riceve il messaggio di errore
export const loginApi = (email, password, onSuccess, onError) => {
  fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error("Credenziali non valide.");
    })
    .then((data) => onSuccess(data))
    .catch((err) => onError(err.message));
};

// Chiamo il backend per recuperare i dati dell'utente loggato
// Passo il token nell'header Authorization per autenticare la richiesta
// onSuccess riceve i dati utente (nome, cognome, ruoli), onError il messaggio
export const getMeApi = (token, onSuccess, onError) => {
  fetch(`${BASE_URL}/utenti/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error("Impossibile recuperare i dati utente.");
    })
    .then((data) => onSuccess(data))
    .catch((err) => onError(err.message));
};
