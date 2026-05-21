import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, ruoloRichiesto }) {
  // Leggo il token e l'utente dal magazzino Redux
  const token = useSelector((state) => state.auth.token);
  const utente = useSelector((state) => state.auth.utente);

  // Se non c'è il token, non sei loggato → torna al login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Se il token c'è ma l'utente non è ancora arrivato in Redux, aspetto
  if (!utente) {
    return null;
  }

  // Controllo che l'utente abbia il ruolo richiesto
  // I ruoli arrivano come array di stringhe semplici, non di oggetti
  if (ruoloRichiesto) {
    const haIlRuolo = utente.ruoli.some((r) => r === ruoloRichiesto);
    if (!haIlRuolo) {
      return <Navigate to="/login" />;
    }
  }

  // Token presente e ruolo corretto → mostro la pagina
  return children;
}

export default ProtectedRoute;
