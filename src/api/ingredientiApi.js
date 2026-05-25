const BASE_URL = "http://localhost:3001";

// Prendo tutti gli ingredienti dell'admin loggato — filtrati automaticamente per sezione
export const getIngredientiApi = (token, onSuccess, onError) => {
  fetch(`${BASE_URL}/ingredienti`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

// Creo un nuovo ingrediente
export const creaIngredienteApi = (token, nome, onSuccess, onError) => {
  fetch(`${BASE_URL}/ingredienti`, {
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

// Cambio la disponibilità di un ingrediente
export const cambiaDisponibilitaApi = (token, id, disponibile, onSuccess, onError) => {
  fetch(`${BASE_URL}/ingredienti/${id}/disponibilita`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(disponibile),
  })
    .then((res) => res.json())
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

// Elimino un ingrediente
export const eliminaIngredienteApi = (token, id, onSuccess, onError) => {
  fetch(`${BASE_URL}/ingredienti/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(() => onSuccess())
    .catch((err) => onError(err));
};
