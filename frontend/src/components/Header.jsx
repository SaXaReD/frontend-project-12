import { useNavigate } from "react-router-dom";
import { clearUserData, selectToken } from "../store/authSlice";
import { Navbar, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const redir = useNavigate();
  const link = token ? "/" : "/login";
  const logout = () => {
    localStorage.clear();
    dispatch(clearUserData());
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