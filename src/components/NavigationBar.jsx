import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import logo from "../assets/logo.png";

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
    <Navbar className="ks-navbar" variant="dark" expand="md">
      <Container>
        <Navbar.Brand className="d-flex align-items-center gap-2">
          <img src={logo} alt="KitchenSync" style={{ height: "40px", width: "auto" }} />
          <span className="ks-navbar-title">
            kitchen<span className="ks-accent-text">sync</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="ks-navbar-content" />

        <Navbar.Collapse id="ks-navbar-content">
          <Nav className="ms-auto d-flex align-items-center gap-3">
            <span className="ks-user-name">
              {utente?.nome} {utente?.cognome}
            </span>
            <Button className="ks-logout-btn" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
