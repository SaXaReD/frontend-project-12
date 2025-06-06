import React from 'react'
import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { Button, Form, Card } from 'react-bootstrap'

const LoginForm = () => {
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: '1',
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
            <Button type="submit" variant="outline-primary">Войти</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default LoginForm;