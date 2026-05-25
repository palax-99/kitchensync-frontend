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
        <h4 className="mb-4">Benvenuto, {utente?.nome}! 👋</h4>
        <Row>
          <Col md={6} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Menu</Card.Title>
                <Card.Text>Visualizza il menu completo del ristorante</Card.Text>
                {/* Porta alla pagina del menu vivo */}
                <Button variant="primary" onClick={() => navigate("/metre/menu")}>
                  Visualizza Menu
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Notifiche</Card.Title>
                <Card.Text>Visualizza le notifiche dai reparti</Card.Text>
                {/* Per ora disabilitato — funzione che implementerò dopo*/}
                <Button variant="primary" disabled>
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
