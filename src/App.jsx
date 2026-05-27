import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredenziali, logout } from "./redux/authSlice";
import { getMeApi } from "./api/authApi";
import LoginPage from "./pages/LoginPage";
import SuperAdminPage from "./pages/SuperAdminPage";
import SezioniPage from "./pages/SezioniPage";
import AdminPage from "./pages/AdminPage";
import CategoriePage from "./pages/CategoriePage";
import IngredientiPage from "./pages/IngredientiPage";
import PiattiPage from "./pages/PiattiPage";
import MetrePage from "./pages/MetrePage";
import MenuPage from "./pages/MenuPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UtentiPage from "./pages/UtentiPage";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    // All'avvio dell'app controllo se c'è un token in localStorage
    // Se c'è, chiamo getMe per ripopolare i dati utente in Redux
    if (token) {
      getMeApi(
        token,
        (utente) => {
          dispatch(setCredenziali({ token, utente }));
        },
        () => {
          // Il token è scaduto o invalido → faccio logout automatico
          dispatch(logout());
        },
      );
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* Route SUPER_ADMIN */}
        <Route
          path="/super-admin"
          element={
            <ProtectedRoute ruoloRichiesto="SUPER_ADMIN">
              <SuperAdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/menu"
          element={
            <ProtectedRoute ruoloRichiesto="SUPER_ADMIN">
              <MenuPage />
            </ProtectedRoute>
          }
        />
        import UtentiPage from "./pages/UtentiPage";
        <Route
          path="/super-admin/utenti"
          element={
            <ProtectedRoute ruoloRichiesto="SUPER_ADMIN">
              <UtentiPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/sezioni"
          element={
            <ProtectedRoute ruoloRichiesto="SUPER_ADMIN">
              <SezioniPage />
            </ProtectedRoute>
          }
        />
        {/* Route ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute ruoloRichiesto="ADMIN">
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categorie"
          element={
            <ProtectedRoute ruoloRichiesto="ADMIN">
              <CategoriePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/ingredienti"
          element={
            <ProtectedRoute ruoloRichiesto="ADMIN">
              <IngredientiPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/piatti"
          element={
            <ProtectedRoute ruoloRichiesto="ADMIN">
              <PiattiPage />
            </ProtectedRoute>
          }
        />
        {/* Route METRE */}
        <Route
          path="/metre"
          element={
            <ProtectedRoute ruoloRichiesto="METRE">
              <MetrePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/metre/menu"
          element={
            <ProtectedRoute ruoloRichiesto="METRE">
              <MenuPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
