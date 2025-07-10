import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage.jsx';
import NotFound from './components/NotFound.jsx';
import LoginForm from './components/LoginForm.jsx';
import SignUp from './components/SignUp.jsx';
import Header from './components/Header.jsx';
import { useEffect } from 'react';
import { setUserData, selectIsAuthChecked, setAuthChecked } from './store/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import Modal from './components/Modal.jsx';

function App() {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector(selectIsAuthChecked);
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    if (storedToken && storedUsername) {
      dispatch(setUserData({ token: storedToken, username: storedUsername }));
    } else {
      dispatch(setAuthChecked());
    }
  }, [dispatch]);

  if (!isAuthChecked) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Загрузка приложения...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Modal />
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
