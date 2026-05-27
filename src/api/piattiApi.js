const BASE_URL = "http://localhost:3001";

// Prendo tutti i piatti di una categoria
export const getPiattiApi = (token, categoriaId, onSuccess, onError) => {
  fetch(`${BASE_URL}/piatti?categoriaId=${categoriaId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

// Creo un nuovo piatto
export const creaPiattoApi = (token, body, onSuccess, onError) => {
  fetch(`${BASE_URL}/piatti`, {
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

// Elimino un piatto
export const eliminaPiattoApi = (token, id, onSuccess, onError) => {
  fetch(`${BASE_URL}/piatti/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(() => onSuccess())
    .catch((err) => onError(err));
};
// Prendo gli ingredienti collegati a un piatto
export const getPiattoIngredientiApi = (token, piattoId, onSuccess, onError) => {
  fetch(`${BASE_URL}/piatti-ingredienti?piattoId=${piattoId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

// Collego un ingrediente a un piatto
export const collegaIngredienteApi = (token, piattoId, ingredienteId, onSuccess, onError) => {
  fetch(`${BASE_URL}/piatti-ingredienti`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ piattoId, ingredienteId }),
  })
    .then((res) => res.json())
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

// Rimuovo il collegamento tra un piatto e un ingrediente
export const scollegaIngredienteApi = (token, id, onSuccess, onError) => {
  fetch(`${BASE_URL}/piatti-ingredienti/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(() => onSuccess())
    .catch((err) => onError(err));
};

// Carico l'immagine del piatto su Cloudinary
export const uploadImmaginePiattoApi = (token, id, file, onSuccess, onError) => {
  const formData = new FormData();
  formData.append("file", file);

  fetch(`${BASE_URL}/piatti/${id}/immagine`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};
