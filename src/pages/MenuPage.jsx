import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Card, Row, Col, Badge, Alert } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import { getMenuApi } from "../api/menuApi";

function MenuPage() {
  const token = useSelector((state) => state.auth.token);

  const [menu, setMenu] = useState([]);
  const [errore, setErrore] = useState("");

  const caricaMenu = () => {
    getMenuApi(
      token,
      (data) => setMenu(data),
      () => setErrore("Errore nel caricamento del menu"),
    );
  };

  // Carico il menu all'avvio
  useEffect(() => {
    caricaMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavigationBar />
      <Container className="mt-4">
        <h2>Menu del Ristorante</h2>

        {errore && <Alert variant="danger">{errore}</Alert>}

        {/* Per ogni sezione mostro le categorie e i piatti */}
        {menu.map((sezione) => (
          <div key={sezione.id} className="mb-5">
            <h3 className="mb-3">
              <Badge bg="dark">{sezione.nome}</Badge>
            </h3>

            {sezione.categorie.map((categoria) => (
              <div key={categoria.id} className="mb-4">
                <h5 className="text-muted mb-3">{categoria.nome}</h5>
                <Row>
                  {categoria.piatti.map((piatto) => (
                    <Col md={4} key={piatto.id} className="mb-3">
                      <Card>
                        <Card.Body>
                          <Card.Title>{piatto.nome}</Card.Title>
                          <Card.Text className="text-muted">{piatto.descrizione}</Card.Text>
                          <strong>€ {piatto.prezzo.toFixed(2)}</strong>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </div>
        ))}
      </Container>
    </>
  );
}

export default MenuPage;
