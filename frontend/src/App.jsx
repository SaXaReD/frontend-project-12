import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import MainPage from './components/MainPage.jsx';
import NotFound from './components/NotFound.jsx';
import LoginForm from './components/LoginForm.jsx';
// import Signup from './components/SignUp/SignUp.jsx';
import store from "./store/store.js";
import Header from './components/Header.jsx';
import { Container } from 'react-bootstrap';

function App() {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="d-flex flex-column h-100">
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginForm />} />
            {/* <Route path='/signup' element={<SignUp />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App
