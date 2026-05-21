import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredenziali } from "../redux/authSlice";
import { loginApi, getMeApi } from "../api/authApi";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errore, setErrore] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErrore(null);

    loginApi(
      email,
      password,
      (data) => {
        console.log("risposta login:", data);
        const token = data.token;
        localStorage.setItem("token", token);

        getMeApi(
          token,
          (utente) => {
            console.log("risposta getMe:", utente);
            dispatch(setCredenziali({ token, utente }));

            const ruolo = utente.ruoli[0];
            console.log("ruolo:", ruolo);
            if (ruolo === "SUPER_ADMIN") navigate("/super-admin");
            else if (ruolo === "ADMIN") navigate("/admin");
            else if (ruolo === "METRE") navigate("/metre");
          },
          (erroreGetMe) => setErrore(erroreGetMe),
        );
      },
      (erroreLogin) => setErrore(erroreLogin),
    );
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">KitchenSync</h2>
        {errore && <Alert variant="danger">{errore}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Inserisci email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Inserisci password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Accedi
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default LoginPage;
