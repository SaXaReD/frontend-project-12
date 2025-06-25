import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, Form, Card, Toast, ToastContainer } from 'react-bootstrap';
import axios from 'axios';
import { setUserData } from '../../store/authSlice';

const LoginForm = () => {
  const inputRef = useRef();
  const [authError, setAuthError] = useState(false);

  const dispach = useDispatch();
  const redir = useNavigate();

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthError(false)
      try {
        const { data: user } = await axios.post('/api/v1/login', values);
        localStorage.setItem('username', user.username);
        localStorage.setItem('token', user.token);
        dispach(setUserData(user));
        redir('/');
      } catch (error) {
        if (error.response?.status === 401) {
          redir('/login');
          setAuthError(true);
        } else if (error.response?.status === 500) {
          console.log(error, 'Нет соединения с сервером');
        }
      }
    }
  })

  return (
    <div className='container h-100 align-content-center'>
      <Card className="bg-body-secondary text-center mx-auto" style={{ width: '20.75rem' }}>
        <Card.Body>
          <Form onSubmit={formik.handleSubmit}>
            <h1>Войти</h1>
            <Form.Group>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder="Ваш ник"
                name="username"
                id="username"
                autoComplete="username"
                required
                ref={inputRef}
              />
              <Form.Label htmlFor="username">Ваш ник</Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Пароль"
                name="password"
                id="password"
                autoComplete="current-password"
                required
              />
              <Form.Label htmlFor="password">Пароль</Form.Label>
            </Form.Group>
            {/* {authError && <div className="error-message">Неправильный логин или пароль</div>} */}
            <Button type="submit" variant="outline-primary">Войти</Button>
          </Form>
        </Card.Body>
      </Card>
      {authError && <ToastContainer
        className="p-3"
        position={'top-center'}
        style={{ zIndex: 1 }}
      >
        <Toast key={'danger'} bg={'danger'} onClose={() => setAuthError(false)} show={authError} delay={3000} autohide>
          <Toast.Body>
            Неправильный логин или пароль
          </Toast.Body>
        </Toast>
      </ToastContainer>}
    </div>
  )
}

export default LoginForm;