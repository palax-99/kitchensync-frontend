import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

function MetrePage() {
  // Leggo i dati utente da Redux per il messaggio di benvenuto
  const utente = useSelector((state) => state.auth.utente);
  const navigate = useNavigate();

  return (
    <>
      <NavigationBar />
      <Container className="mt-4">
        <h4 className="ks-page-title mb-4">Benvenuto, {utente?.nome}! 👋</h4>
        <Row>
          <Col md={6} className="mb-3">
            <Card>
              <Card.Body>
                <div className="ks-card-icon">📖</div>
                <Card.Title className="ks-card-title">Menu</Card.Title>
                <Card.Text className="ks-card-text">Visualizza il menu completo del ristorante</Card.Text>
                {/* Porta alla pagina del menu vivo */}
                <Button variant="primary" className="w-100" onClick={() => navigate("/metre/menu")}>
                  Visualizza Menu
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-3">
            <Card>
              <Card.Body>
                <div className="ks-card-icon">🔔</div>
                <Card.Title className="ks-card-title">Notifiche</Card.Title>
                <Card.Text className="ks-card-text">Visualizza le notifiche dai reparti</Card.Text>
                {/* Per ora disabilitato — arriva nella Slice 4 */}
                <Button variant="primary" className="w-100" disabled>
                  Visualizza Notifiche
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MetrePage;
