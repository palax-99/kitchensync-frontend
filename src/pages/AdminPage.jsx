import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import NavigationBar from "../components/NavigationBar";

function AdminPage() {
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
                <Card.Title>Ingredienti</Card.Title>
                <Card.Text>Gestisci gli ingredienti della tua sezione</Card.Text>
                <Button variant="primary" disabled>
                  Gestisci Ingredienti
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Piatti</Card.Title>
                <Card.Text>Gestisci i piatti della tua sezione</Card.Text>
                <Button variant="primary" disabled>
                  Gestisci Piatti
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminPage;
