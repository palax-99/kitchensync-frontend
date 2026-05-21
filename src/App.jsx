import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SuperAdminPage from "./pages/SuperAdminPage";
import AdminPage from "./pages/AdminPage";
import MetrePage from "./pages/MetrePage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
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
