import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

function AdminPage() {
  // Leggo i dati utente da Redux per il messaggio di benvenuto
  const utente = useSelector((state) => state.auth.utente);
  const navigate = useNavigate();

  return (
    <>
      <NavigationBar />
      <Container className="mt-4">
        <h4 className="mb-4">Benvenuto, {utente?.nome}! 👋</h4>
        <Row>
          <Col md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Categorie</Card.Title>
                <Card.Text>Gestisci le categorie della tua sezione</Card.Text>
                {/* Porta alla pagina di gestione categorie */}
                <Button variant="primary" onClick={() => navigate("/admin/categorie")}>
                  Gestisci Categorie
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Ingredienti</Card.Title>
                <Card.Text>Gestisci gli ingredienti della tua sezione</Card.Text>
                {/* Porta alla pagina di gestione ingredienti */}
                <Button variant="primary" onClick={() => navigate("/admin/ingredienti")}>
                  Gestisci Ingredienti
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Piatti</Card.Title>
                <Card.Text>Gestisci i piatti della tua sezione</Card.Text>
                {/* Porta alla pagina di gestione piatti */}
                <Button variant="primary" onClick={() => navigate("/admin/piatti")}>
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
