import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

function SuperAdminPage() {
  // Leggo i dati utente da Redux per il messaggio di benvenuto
  const utente = useSelector((state) => state.auth.utente);
  const navigate = useNavigate();

  return (
    <>
      <NavigationBar />
      <Container className="mt-4">
        <h4 className="ks-page-title mb-4">Benvenuto, {utente?.nome}! 👋</h4>
        <Row>
          <Col md={4} className="mb-3">
            <Card>
              <Card.Body>
                <div className="ks-card-icon">👥</div>
                <Card.Title className="ks-card-title">Utenti</Card.Title>
                <Card.Text className="ks-card-text">Gestisci il personale del ristorante</Card.Text>
                {/* Per ora disabilitato — lo attivo nella prossima slice */}
                <Button variant="primary" className="w-100" onClick={() => navigate("/super-admin/utenti")}>
                  Gestisci Utenti
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card>
              <Card.Body>
                <div className="ks-card-icon">🏢</div>
                <Card.Title className="ks-card-title">Sezioni</Card.Title>
                <Card.Text className="ks-card-text">Gestisci i reparti del ristorante</Card.Text>
                {/* Porta alla pagina di gestione sezioni */}
                <Button variant="primary" className="w-100" onClick={() => navigate("/super-admin/sezioni")}>
                  Gestisci Sezioni
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card>
              <Card.Body>
                <div className="ks-card-icon">📋</div>
                <Card.Title className="ks-card-title">Menu</Card.Title>
                <Card.Text className="ks-card-text">Visualizza il menu completo</Card.Text>
                {/* Per ora disabilitato — lo attivo nella prossima slice */}
                <Button variant="primary" className="w-100" onClick={() => navigate("/super-admin/menu")}>
                  Visualizza Menu
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SuperAdminPage;
