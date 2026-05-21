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

  // Se è richiesto un ruolo specifico, controllo che l'utente ce l'abbia
  if (ruoloRichiesto && utente) {
    const haIlRuolo = utente.ruoli.some((r) => r.denominazione === ruoloRichiesto);
    if (!haIlRuolo) {
      return <Navigate to="/login" />;
    }
  }

  // Token presente e ruolo corretto → mostro la pagina
  return children;
}

export default ProtectedRoute;
