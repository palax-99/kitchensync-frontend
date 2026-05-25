import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Table, Button, Form, Alert, Badge } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import { getSezioniApi, creaSezioneApi, cambiaStatoSezioneApi, eliminaSezioneApi } from "../api/sezioniApi";

function SezioniPage() {
  const token = useSelector((state) => state.auth.token);

  const [sezioni, setSezioni] = useState([]);
  const [nuovoNome, setNuovoNome] = useState("");
  const [errore, setErrore] = useState("");
  const [successo, setSuccesso] = useState("");

  const caricaSezioni = () => {
    getSezioniApi(
      token,
      (data) => setSezioni(data.content),
      () => setErrore("Errore nel caricamento delle sezioni"),
    );
  };

  // Carico le sezioni all'avvio — dopo aver dichiarato caricaSezioni
  useEffect(() => {
    caricaSezioni();
  }, []);

  const handleCrea = () => {
    if (!nuovoNome.trim()) return;
    creaSezioneApi(
      token,
      nuovoNome,
      () => {
        setNuovoNome("");
        setSuccesso("Sezione creata con successo");
        setErrore("");
        caricaSezioni();
      },
      () => setErrore("Errore nella creazione della sezione"),
    );
  };

  const handleCambiaStato = (id, attivaAttuale) => {
    cambiaStatoSezioneApi(
      token,
      id,
      !attivaAttuale,
      () => caricaSezioni(),
      () => setErrore("Errore nel cambio stato"),
    );
  };

  const handleElimina = (id) => {
    eliminaSezioneApi(
      token,
      id,
      () => caricaSezioni(),
      () => setErrore("Errore nell'eliminazione"),
    );
  };

  return (
    <>
      <NavigationBar />
      <Container className="mt-4">
        <h2>Gestione Sezioni</h2>

        {errore && <Alert variant="danger">{errore}</Alert>}
        {successo && <Alert variant="success">{successo}</Alert>}

        {/* Form per creare una nuova sezione */}
        <div className="d-flex gap-2 mb-4">
          <Form.Control type="text" placeholder="Nome nuova sezione" value={nuovoNome} onChange={(e) => setNuovoNome(e.target.value)} />
          <Button variant="primary" onClick={handleCrea}>
            Crea
          </Button>
        </div>

        {/* Tabella sezioni */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Stato</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {sezioni.map((s) => (
              <tr key={s.id}>
                <td>{s.nome}</td>
                <td>
                  <Badge bg={s.attiva ? "success" : "secondary"}>{s.attiva ? "Attiva" : "Disattiva"}</Badge>
                </td>
                <td className="d-flex gap-2">
                  <Button variant={s.attiva ? "warning" : "success"} size="sm" onClick={() => handleCambiaStato(s.id, s.attiva)}>
                    {s.attiva ? "Disattiva" : "Attiva"}
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleElimina(s.id)}>
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

export default SezioniPage;
