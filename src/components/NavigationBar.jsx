import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

function NavigationBar() {
  // Leggo i dati utente dal magazzino Redux
  const utente = useSelector((state) => state.auth.utente);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Pulisco Redux e localStorage, poi torno al login
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>🍳 KitchenSync</Navbar.Brand>
        <Nav className="ms-auto d-flex align-items-center gap-3">
          <Navbar.Text className="text-white">
            {utente?.nome} {utente?.cognome}
          </Navbar.Text>
          <Button variant="outline-light" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
