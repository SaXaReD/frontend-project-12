import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import MainPage from './components/MainPage/MainPage.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import LoginForm from './components/LoginForm/LoginForm.jsx';
// import Signup from './components/SignUp/SignUp.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginForm />} />
        {/* <Route path='/signup' element={<SignUp />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
