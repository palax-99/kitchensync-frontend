import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Table, Button, Form, Alert, Badge, Modal } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import { getUtentiApi, creaUtenteApi, eliminaUtenteApi } from "../api/utentiApi";
import { getSezioniApi } from "../api/sezioniApi";

function UtentiPage() {
  const token = useSelector((state) => state.auth.token);

  const [utenti, setUtenti] = useState([]);
  const [sezioni, setSezioni] = useState([]);
  const [errore, setErrore] = useState("");
  const [successo, setSuccesso] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
    ruoli: ["ADMIN"],
    sezioneId: "",
  });

  const caricaUtenti = () => {
    getUtentiApi(
      token,
      (data) => setUtenti(data.content),
      () => setErrore("Errore nel caricamento degli utenti"),
    );
  };

  const caricaSezioni = () => {
    getSezioniApi(
      token,
      (data) => setSezioni(data.content),
      () => setErrore("Errore nel caricamento delle sezioni"),
    );
  };

  useEffect(() => {
    caricaUtenti();
    caricaSezioni();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCrea = () => {
    if (!form.nome.trim() || !form.cognome.trim() || !form.email.trim() || !form.password.trim()) return;

    const body = {
      ...form,
      sezioneId: form.ruoli[0] === "ADMIN" ? form.sezioneId || null : null,
    };

    creaUtenteApi(
      token,
      body,
      () => {
        setSuccesso("Utente creato con successo");
        setErrore("");
        setShowModal(false);
        setForm({ nome: "", cognome: "", email: "", password: "", ruoli: ["ADMIN"], sezioneId: "" });
        caricaUtenti();
      },
      () => setErrore("Errore nella creazione dell'utente"),
    );
  };

  const handleElimina = (id) => {
    eliminaUtenteApi(
      token,
      id,
      () => caricaUtenti(),
      () => setErrore("Errore nell'eliminazione dell'utente"),
    );
  };

  const getRuoloBadge = (ruoli) => {
    const ruolo = ruoli[0];
    if (ruolo === "SUPER_ADMIN") return <Badge bg="danger">SUPER_ADMIN</Badge>;
    if (ruolo === "ADMIN") return <Badge bg="primary">ADMIN</Badge>;
    if (ruolo === "METRE") return <Badge bg="success">METRE</Badge>;
    return <Badge bg="secondary">{ruolo}</Badge>;
  };

  return (
    <>
      <NavigationBar />
      <Container className="mt-4 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="ks-page-title mb-0">Gestione Utenti</h2>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            + Nuovo utente
          </Button>
        </div>

        {errore && <Alert variant="danger">{errore}</Alert>}
        {successo && <Alert variant="success">{successo}</Alert>}

        {/* Tabella utenti */}
        <Table striped hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Ruolo</th>
              <th>Sezione</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {utenti.map((u) => (
              <tr key={u.id}>
                <td>
                  {u.nome} {u.cognome}
                </td>
                <td>{u.email}</td>
                <td>{getRuoloBadge(u.ruoli)}</td>
                <td>{u.sezione ? <Badge bg="dark">{u.sezione.nome}</Badge> : <span className="text-muted">—</span>}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleElimina(u.id)}>
                    Elimina
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal creazione utente */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Nuovo utente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="d-flex gap-2 mb-3">
                <Form.Control
                  type="text"
                  placeholder="Nome"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="ks-form-control"
                />
                <Form.Control
                  type="text"
                  placeholder="Cognome"
                  value={form.cognome}
                  onChange={(e) => setForm({ ...form, cognome: e.target.value })}
                  className="ks-form-control"
                />
              </div>
              <Form.Control
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="ks-form-control mb-3"
              />
              <Form.Control
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="ks-form-control mb-3"
              />
              <Form.Select className="mb-3" value={form.ruoli[0]} onChange={(e) => setForm({ ...form, ruoli: [e.target.value], sezioneId: "" })}>
                <option value="ADMIN">ADMIN</option>
                <option value="METRE">METRE</option>
              </Form.Select>

              {/* Sezione visibile solo se ruolo ADMIN */}
              {form.ruoli[0] === "ADMIN" && (
                <Form.Select value={form.sezioneId} onChange={(e) => setForm({ ...form, sezioneId: e.target.value })}>
                  <option value="">Seleziona sezione</option>
                  {sezioni.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nome}
                    </option>
                  ))}
                </Form.Select>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Annulla
            </Button>
            <Button variant="primary" onClick={handleCrea}>
              Crea utente
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default UtentiPage;
