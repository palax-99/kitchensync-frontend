import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Table, Button, Form, Alert } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import { getCategorieApi, creaCategoriaApi, eliminaCategoriaApi } from "../api/categorieApi";

function CategoriePage() {
  const token = useSelector((state) => state.auth.token);

  const [categorie, setCategorie] = useState([]);
  const [nuovoNome, setNuovoNome] = useState("");
  const [errore, setErrore] = useState("");
  const [successo, setSuccesso] = useState("");

  const caricaCategorie = () => {
    getCategorieApi(
      token,
      (data) => setCategorie(data.content),
      () => setErrore("Errore nel caricamento delle categorie"),
    );
  };

  // Carico le categorie all'avvio
  useEffect(() => {
    caricaCategorie();
  }, []);

  const handleCrea = () => {
    if (!nuovoNome.trim()) return;
    creaCategoriaApi(
      token,
      nuovoNome,
      () => {
        setNuovoNome("");
        setSuccesso("Categoria creata con successo");
        setErrore("");
        caricaCategorie();
      },
      () => setErrore("Errore nella creazione della categoria"),
    );
  };

  const handleElimina = (id) => {
    eliminaCategoriaApi(
      token,
      id,
      () => caricaCategorie(),
      () => setErrore("Errore nell'eliminazione"),
    );
  };

  return (
    <>
      <NavigationBar />
      <Container className="mt-4">
        <h2>Gestione Categorie</h2>

        {errore && <Alert variant="danger">{errore}</Alert>}
        {successo && <Alert variant="success">{successo}</Alert>}

        {/* Form per creare una nuova categoria */}
        <div className="d-flex gap-2 mb-4">
          <Form.Control type="text" placeholder="Nome nuova categoria" value={nuovoNome} onChange={(e) => setNuovoNome(e.target.value)} />
          <Button variant="primary" onClick={handleCrea}>
            Crea
          </Button>
        </div>

        {/* Tabella categorie */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Sezione</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {categorie.map((c) => (
              <tr key={c.id}>
                <td>{c.nome}</td>
                <td>{c.sezione.nome}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleElimina(c.id)}>
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

export default CategoriePage;
