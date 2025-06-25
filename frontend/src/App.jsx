import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import MainPage from './components/MainPage/MainPage.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import LoginForm from './components/LoginForm/LoginForm.jsx';
// import Signup from './components/SignUp/SignUp.jsx';
import store from "./store/store.js";

function App() {

  return (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginForm />} />
        {/* <Route path='/signup' element={<SignUp />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </Provider>
  );
}

export default App
