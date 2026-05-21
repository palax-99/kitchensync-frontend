import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import NavigationBar from "../components/NavigationBar";

function MetrePage() {
  const utente = useSelector((state) => state.auth.utente);

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
                <Button variant="primary" disabled>
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
