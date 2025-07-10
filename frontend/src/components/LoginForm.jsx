import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, Form, Card, Toast, ToastContainer, Container } from 'react-bootstrap';
import axios from 'axios';
import { setUserData } from '../store/authSlice';

const LoginForm = () => {
  const inputRef = useRef();
  const [authError, setAuthError] = useState(false);

  const dispatch = useDispatch();
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
      setAuthError(false);
      axios.post('/api/v1/login', values).then((response) => {
        const { username, token } = response.data;
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
        dispatch(setUserData(response.data));
        redir('/');
      }).catch((error) => {
        if (error.response?.status === 401) {
          redir('/login');
          setAuthError(true);
        } else if (error.response?.status === 500) {
          console.log(error, 'Ошибка соединения');
        }
      })
    }
  })

  return (
    <Container className='h-100 align-content-center'>
      <Card className="bg-body-secondary text-center mx-auto" style={{ width: '20.75rem' }}>
        <Card.Body>
          <Form onSubmit={formik.handleSubmit}>
            <h1 className='text-center mb-4'>Войти</h1>
            <Form.Floating className='mb-3'>
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
            </Form.Floating>
            <Form.Floating className='mb-4'>
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
            </Form.Floating>
            {authError && <div className="error-message">Неправильный логин или пароль</div>}
            <Button type="submit" variant="outline-primary w-100">Войти</Button>
          </Form>
        </Card.Body>
        <Card.Footer className='p-4'>
          <Container className="text-center">
            <span>Нет аккаунта? </span>
            <a href='/signup'>Зарегистрируйтесь</a>
          </Container>
        </Card.Footer>
      </Card>
    </Container>
  )
}

export default LoginForm;