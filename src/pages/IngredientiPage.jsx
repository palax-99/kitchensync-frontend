import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Table, Button, Form, Alert, Badge } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import { getIngredientiApi, creaIngredienteApi, cambiaDisponibilitaApi, eliminaIngredienteApi } from "../api/ingredientiApi";

function IngredientiPage() {
  const token = useSelector((state) => state.auth.token);

  const [ingredienti, setIngredienti] = useState([]);
  const [nuovoNome, setNuovoNome] = useState("");
  const [errore, setErrore] = useState("");
  const [successo, setSuccesso] = useState("");

  const caricaIngredienti = () => {
    getIngredientiApi(
      token,
      (data) => setIngredienti(data.content),
      () => setErrore("Errore nel caricamento degli ingredienti"),
    );
  };

  useEffect(() => {
    caricaIngredienti();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCrea = () => {
    if (!nuovoNome.trim()) return;
    creaIngredienteApi(
      token,
      nuovoNome,
      () => {
        setNuovoNome("");
        setSuccesso("Ingrediente creato con successo");
        setErrore("");
        caricaIngredienti();
      },
      () => setErrore("Errore nella creazione dell'ingrediente"),
    );
  };

  const handleCambiaDisponibilita = (id, disponibileAttuale) => {
    cambiaDisponibilitaApi(
      token,
      id,
      !disponibileAttuale,
      () => caricaIngredienti(),
      () => setErrore("Errore nel cambio disponibilità"),
    );
  };

  const handleElimina = (id) => {
    eliminaIngredienteApi(
      token,
      id,
      () => caricaIngredienti(),
      () => setErrore("Errore nell'eliminazione"),
    );
  };

  return (
    <>
      <NavigationBar />
      <Container className="mt-4 mb-5">
        <h2 className="ks-page-title mb-4">Gestione Ingredienti</h2>

        {errore && <Alert variant="danger">{errore}</Alert>}
        {successo && <Alert variant="success">{successo}</Alert>}

        {/* Form per creare un nuovo ingrediente */}
        <div className="d-flex gap-2 mb-4">
          <Form.Control
            type="text"
            placeholder="Nome nuovo ingrediente"
            value={nuovoNome}
            onChange={(e) => setNuovoNome(e.target.value)}
            className="ks-form-control"
          />
          <Button variant="primary" onClick={handleCrea}>
            Crea
          </Button>
        </div>

        {/* Tabella ingredienti */}
        <Table striped hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Disponibilità</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {ingredienti.map((i) => (
              <tr key={i.id}>
                <td>{i.nome}</td>
                <td>
                  <Badge bg={i.disponibile ? "success" : "danger"}>{i.disponibile ? "Disponibile" : "Esaurito"}</Badge>
                </td>
                <td className="d-flex gap-2">
                  <Button variant={i.disponibile ? "warning" : "success"} size="sm" onClick={() => handleCambiaDisponibilita(i.id, i.disponibile)}>
                    {i.disponibile ? "Segna esaurito" : "Segna disponibile"}
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleElimina(i.id)}>
                    Elimina
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default IngredientiPage;
