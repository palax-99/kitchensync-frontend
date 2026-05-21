import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import NavigationBar from "../components/NavigationBar";

function SuperAdminPage() {
  // Leggo i dati utente da Redux per il messaggio di benvenuto
  const utente = useSelector((state) => state.auth.utente);

  return (
    <>
      <NavigationBar />
      <Container className="mt-4">
        <h4 className="mb-4">Benvenuto, {utente?.nome}! 👋</h4>
        <Row>
          <Col md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Utenti</Card.Title>
                <Card.Text>Gestisci il personale del ristorante</Card.Text>
                <Button variant="primary" disabled>
                  Gestisci Utenti
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Sezioni</Card.Title>
                <Card.Text>Gestisci i reparti del ristorante</Card.Text>
                <Button variant="primary" disabled>
                  Gestisci Sezioni
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Menu</Card.Title>
                <Card.Text>Visualizza il menu completo</Card.Text>
                <Button variant="primary" disabled>
                  Gestisci Menu
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
