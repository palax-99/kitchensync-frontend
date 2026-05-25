const BASE_URL = "http://localhost:3001";

// Prendo il menu vivo — solo sezioni attive e piatti con ingredienti disponibili
export const getMenuApi = (token, onSuccess, onError) => {
  fetch(`${BASE_URL}/menu`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};
