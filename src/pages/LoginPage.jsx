import { useState } from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredenziali } from "../redux/authSlice";
import { loginApi, getMeApi } from "../api/authApi";
import logo from "../assets/logo.png";

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
        const token = data.token;
        localStorage.setItem("token", token);

        getMeApi(
          token,
          (utente) => {
            dispatch(setCredenziali({ token, utente }));
            const ruolo = utente.ruoli[0];
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
    <div className="ks-login-wrapper">
      <Row className="h-100 g-0">
        {/* Lato sinistro — brand */}
        <Col md={6} className="ks-login-left d-none d-md-flex">
          <div className="ks-login-brand">
            <img src={logo} alt="KitchenSync" className="ks-login-logo" />
            <p className="ks-login-claim">
              Tutto il tuo ristorante.
              <br />
              <span className="ks-accent-text">Sempre in sincronia.</span>
            </p>
          </div>
        </Col>

        {/* Lato destro — form */}
        <Col md={6} className="ks-login-right">
          <div className="ks-login-form-wrapper">
            {/* Logo piccolo su mobile */}
            <div className="d-md-none text-center mb-4">
              <img src={logo} alt="KitchenSync" style={{ height: "80px" }} />
            </div>

            <h2 className="ks-login-title">Bentornato 👋</h2>
            <p className="ks-login-subtitle">Accedi al tuo pannello di controllo</p>

            {errore && <Alert variant="danger">{errore}</Alert>}

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label className="ks-form-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="mario@ristorante.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ks-form-control"
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="ks-form-label">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="ks-form-control"
                />
              </Form.Group>
              <Button type="submit" className="w-100 ks-login-btn">
                Accedi
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LoginPage;
