import { useNavigate } from "react-router-dom";
import { clearUserData } from "../store/authSlice";
import { Navbar, Container, Button } from "react-bootstrap";

const Header = () => {
  const token = localStorage.getItem("token");
  const redir = useNavigate();
  const link = token ? "/" : "/login";
  const logout = () => {
    localStorage.clear();
    clearUserData();
    redir("/login");
  };

  return (
    <Navbar className="py-3 bg-gradient shadow" bg="primary" data-bs-theme="dark">
      <Container className="d-flex align-items-center justify-content-between">
        <Navbar.Brand href={link}>Hexlet Chat</Navbar.Brand>
        {token ? (
          <Button variant="light" type="button" onClick={logout}>
            Выйти
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default Header