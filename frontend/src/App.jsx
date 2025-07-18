import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Modal from './components/Modal.jsx'
import MainPage from './components/MainPage.jsx'
import NotFound from './components/NotFound.jsx'
import LoginForm from './components/LoginForm.jsx'
import SignUp from './components/SignUp.jsx'
import Header from './components/Header.jsx'
import { Container } from 'react-bootstrap'
import { routes } from './routes/routes.js'
import PrivateRoute from './PrivateRoute.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Modal />
      <ToastContainer />
      <Container className="d-flex flex-column vh-100 mw-100 m-0 p-0">
        <Header />
        <Routes>
          <Route
            path={routes.main}
            element={(
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            )}
          />
          <Route path={routes.login} element={<LoginForm />} />
          <Route path={routes.signup} element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
