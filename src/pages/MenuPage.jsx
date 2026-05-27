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

  useEffect(() => {
    caricaMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavigationBar />
      <Container className="mt-4 mb-5">
        <h2 className="ks-page-title mb-4">Menu del Ristorante</h2>

        {errore && <Alert variant="danger">{errore}</Alert>}

        {menu.map((sezione) => (
          <div key={sezione.id} className="mb-5">
            {/* Header sezione */}
            <div className="ks-sezione-header mb-3">
              <span>{sezione.nome}</span>
            </div>

            {sezione.categorie.map((categoria) => (
              <div key={categoria.id} className="mb-4">
                {/* Titolo categoria */}
                <h5 className="ks-categoria-title">{categoria.nome}</h5>

                <Row>
                  {categoria.piatti.map((piatto) => (
                    <Col md={4} key={piatto.id} className="mb-3">
                      <Card className="h-100">
                        {/* Immagine se disponibile */}
                        {piatto.immagineUrl && <Card.Img variant="top" src={piatto.immagineUrl} className="ks-piatto-img" />}

                        <Card.Body className="d-flex flex-column">
                          <Card.Title className="ks-piatto-nome">{piatto.nome}</Card.Title>
                          <Card.Text className="text-muted flex-grow-1">{piatto.descrizione}</Card.Text>
                          <div className="ks-piatto-prezzo">€ {piatto.prezzo.toFixed(2)}</div>
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
