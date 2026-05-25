import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Table, Button, Form, Alert, Collapse, Badge } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import { getPiattiApi, creaPiattoApi, eliminaPiattoApi, getPiattoIngredientiApi, collegaIngredienteApi, scollegaIngredienteApi } from "../api/piattiApi";
import { getCategorieApi } from "../api/categorieApi";
import { getIngredientiApi } from "../api/ingredientiApi";

function PiattiPage() {
  const token = useSelector((state) => state.auth.token);

  const [piatti, setPiatti] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [ingredienti, setIngredienti] = useState([]);
  const [errore, setErrore] = useState("");
  const [successo, setSuccesso] = useState("");

  // Tiene traccia di quale piatto è espanso e i suoi ingredienti collegati
  const [piattoAperto, setPiattoAperto] = useState(null);
  const [ingredientiPiatto, setIngredientiPiatto] = useState([]);
  const [ingredienteSelezionato, setIngredienteSelezionato] = useState("");

  const [form, setForm] = useState({
    nome: "",
    descrizione: "",
    prezzo: "",
    personalizzabile: false,
    categoriaId: "",
  });

  const caricaCategorie = () => {
    getCategorieApi(
      token,
      (data) => {
        setCategorie(data.content);
        if (data.content.length > 0) {
          setForm((f) => ({ ...f, categoriaId: data.content[0].id }));
          caricaPiatti(data.content[0].id);
        }
      },
      () => setErrore("Errore nel caricamento delle categorie"),
    );
  };

  const caricaPiatti = (categoriaId) => {
    getPiattiApi(
      token,
      categoriaId,
      (data) => setPiatti(data.content),
      () => setErrore("Errore nel caricamento dei piatti"),
    );
  };

  const caricaIngredienti = () => {
    getIngredientiApi(
      token,
      (data) => {
        setIngredienti(data.content);
        if (data.content.length > 0) setIngredienteSelezionato(data.content[0].id);
      },
      () => setErrore("Errore nel caricamento degli ingredienti"),
    );
  };

  const caricaIngredientiPiatto = (piattoId) => {
    getPiattoIngredientiApi(
      token,
      piattoId,
      (data) => setIngredientiPiatto(data),
      () => setErrore("Errore nel caricamento degli ingredienti del piatto"),
    );
  };

  useEffect(() => {
    caricaCategorie();
    caricaIngredienti();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCambiaCategoria = (categoriaId) => {
    setForm((f) => ({ ...f, categoriaId }));
    caricaPiatti(categoriaId);
    setPiattoAperto(null);
  };

  const handleCrea = () => {
    if (!form.nome.trim() || !form.prezzo || !form.categoriaId) return;
    creaPiattoApi(
      token,
      { ...form, prezzo: parseFloat(form.prezzo) },
      () => {
        setForm({ nome: "", descrizione: "", prezzo: "", personalizzabile: false, categoriaId: form.categoriaId });
        setSuccesso("Piatto creato con successo");
        setErrore("");
        caricaPiatti(form.categoriaId);
      },
      () => setErrore("Errore nella creazione del piatto"),
    );
  };

  const handleElimina = (id) => {
    eliminaPiattoApi(
      token,
      id,
      () => {
        if (piattoAperto === id) setPiattoAperto(null);
        caricaPiatti(form.categoriaId);
      },
      () => setErrore("Errore nell'eliminazione"),
    );
  };

  // Apro o chiudo il pannello ingredienti di un piatto
  const handleToggleIngredienti = (piattoId) => {
    if (piattoAperto === piattoId) {
      setPiattoAperto(null);
      setIngredientiPiatto([]);
    } else {
      setPiattoAperto(piattoId);
      caricaIngredientiPiatto(piattoId);
    }
  };

  const handleCollega = () => {
    if (!ingredienteSelezionato) return;
    collegaIngredienteApi(
      token,
      piattoAperto,
      ingredienteSelezionato,
      () => caricaIngredientiPiatto(piattoAperto),
      () => setErrore("Errore nel collegamento ingrediente"),
    );
  };

  const handleScollega = (id) => {
    scollegaIngredienteApi(
      token,
      id,
      () => caricaIngredientiPiatto(piattoAperto),
      () => setErrore("Errore nella rimozione ingrediente"),
    );
  };

  return (
    <>
      <NavigationBar />
      <Container className="mt-4">
        <h2>Gestione Piatti</h2>

        {errore && <Alert variant="danger">{errore}</Alert>}
        {successo && <Alert variant="success">{successo}</Alert>}

        {/* Seleziono la categoria per filtrare i piatti */}
        <Form.Select className="mb-3" value={form.categoriaId} onChange={(e) => handleCambiaCategoria(e.target.value)}>
          {categorie.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </Form.Select>

        {/* Form per creare un nuovo piatto */}
        <div className="d-flex gap-2 mb-4">
          <Form.Control type="text" placeholder="Nome piatto" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
          <Form.Control type="text" placeholder="Descrizione" value={form.descrizione} onChange={(e) => setForm({ ...form, descrizione: e.target.value })} />
          <Form.Control type="number" placeholder="Prezzo" value={form.prezzo} onChange={(e) => setForm({ ...form, prezzo: e.target.value })} />
          <Button variant="primary" onClick={handleCrea}>
            Crea
          </Button>
        </div>

        {/* Tabella piatti */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrizione</th>
              <th>Prezzo</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {piatti.map((p) => (
              <>
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td>{p.descrizione}</td>
                  <td>€ {p.prezzo.toFixed(2)}</td>
                  <td className="d-flex gap-2">
                    <Button variant="outline-primary" size="sm" onClick={() => handleToggleIngredienti(p.id)}>
                      {piattoAperto === p.id ? "Chiudi" : "Ingredienti"}
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleElimina(p.id)}>
                      Elimina
                    </Button>
                  </td>
                </tr>

                {/* Pannello ingredienti espandibile */}
                {piattoAperto === p.id && (
                  <tr key={`${p.id}-ingredienti`}>
                    <td colSpan={4} className="bg-light">
                      <div className="p-2">
                        <strong>Ingredienti di {p.nome}</strong>

                        {/* Lista ingredienti collegati */}
                        <div className="d-flex flex-wrap gap-2 my-2">
                          {ingredientiPiatto.length === 0 && <span className="text-muted">Nessun ingrediente collegato</span>}
                          {ingredientiPiatto.map((pi) => (
                            <Badge
                              key={pi.id}
                              bg={pi.ingrediente.disponibile ? "success" : "danger"}
                              className="d-flex align-items-center gap-1"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleScollega(pi.id)}
                            >
                              {pi.ingrediente.nome} ✕
                            </Badge>
                          ))}
                        </div>

                        {/* Select per aggiungere un ingrediente */}
                        <div className="d-flex gap-2">
                          <Form.Select size="sm" value={ingredienteSelezionato} onChange={(e) => setIngredienteSelezionato(e.target.value)}>
                            {ingredienti.map((i) => (
                              <option key={i.id} value={i.id}>
                                {i.nome}
                              </option>
                            ))}
                          </Form.Select>
                          <Button variant="success" size="sm" onClick={handleCollega}>
                            Aggiungi
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default PiattiPage;
