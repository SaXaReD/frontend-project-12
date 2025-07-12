import { useNavigate } from "react-router-dom";
import { clearUserData, selectToken } from "../store/authSlice";
import { Navbar, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const redir = useNavigate();
  const logout = () => {
    localStorage.clear();
    dispatch(clearUserData());
    redir("/login");
  };

  return (
    <Navbar className="py-3 bg-gradient shadow" bg="primary" data-bs-theme="dark">
      <Container className="d-flex align-items-center justify-content-between">
        <Button onClick={() => token ? redir("/") : redir("/login")} variant="link" className="fs-4 fw-bold font-monospace p-0 text-decoration-none link-body-emphasis">{t('header.title')}</Button>
        {token ? (
          <Button variant="light" type="button" onClick={logout}>
            {t('header.logout')}
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default Header