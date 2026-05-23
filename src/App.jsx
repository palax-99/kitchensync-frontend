import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredenziali, logout } from "./redux/authSlice";
import { getMeApi } from "./api/authApi";
import LoginPage from "./pages/LoginPage";
import SuperAdminPage from "./pages/SuperAdminPage";
import AdminPage from "./pages/AdminPage";
import MetrePage from "./pages/MetrePage";
import ProtectedRoute from "./components/ProtectedRoute";

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
        <Route
          path="/super-admin"
          element={
            <ProtectedRoute ruoloRichiesto="SUPER_ADMIN">
              <SuperAdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute ruoloRichiesto="ADMIN">
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/metre"
          element={
            <ProtectedRoute ruoloRichiesto="METRE">
              <MetrePage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
