import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Form, Card, Toast, ToastContainer, Container, Spinner } from 'react-bootstrap';
import axios from 'axios';
import * as yup from 'yup';
import { setUserData } from '../store/authSlice';

const SignUp = () => {
  const usernameRef = useRef();
  const redir = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: yup
      .string()
      .min(6, 'Не менее 6 символов')
      .required('Обязательное поле'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    validateOnChange: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await axios.post('/api/v1/signup', {
          username: values.username.trim(),
          password: values.password,
        });

        if (response.status === 201) {
          dispatch(setUserData(response.data));
          redir('/');
        }
      } catch (error) {
        if (error.response) {
          if (error.response?.status === 409) {
            formik.setFieldError('username', 'Такой пользователь уже существует');
            usernameRef.current.select();
          } else if (error.response.status === 500) {
            console.error('Ошибка сервера:', error);
          } else {
            console.error('Произошла ошибка при регистрации:', error);
          }
        } else {
          console.error('Неизвестная ошибка:', error);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container className='h-100 align-content-center'>
      <Card className="bg-body-secondary text-center mx-auto" style={{ width: '20.75rem' }}>
        <Card.Body>
          <Form onSubmit={formik.handleSubmit}>
            <h1 className='text-center mb-4'>Регистрация</h1>
            <Form.Floating className='mb-3'>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder="Имя пользователя"
                name="username"
                id="username"
                autoComplete="username"
                isInvalid={!!formik.errors.username}
                ref={usernameRef}
              />
              <Form.Label htmlFor="username">Ваш ник</Form.Label>
              <Form.Control.Feedback tooltip type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </Form.Floating>
            <Form.Floating className='mb-3'>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Пароль"
                name="password"
                id="password"
                autoComplete="new-password"
                isInvalid={!!formik.errors.password}
              />
              <Form.Label htmlFor="password">Пароль</Form.Label>
              <Form.Control.Feedback tooltip type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Floating>
            <Form.Floating className='mb-4'>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                placeholder="Подтвердите пароль"
                name="confirmPassword"
                id="confirmPassword"
                autoComplete="new-password"
                isInvalid={!!formik.errors.confirmPassword}
              />
              <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
              <Form.Control.Feedback tooltip type="invalid">
                {formik.errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Floating>
            <Button
              type="submit"
              variant="outline-primary w-100"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-1"
                  />
                  Регистрация...
                </>
              ) : (
                'Зарегистрироваться'
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
};

export default SignUp;