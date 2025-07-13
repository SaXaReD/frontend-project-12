import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useFormik } from 'formik'
import {
  Button,
  Form,
  Card,
  Container,
  Spinner,
} from 'react-bootstrap'
import axios from 'axios'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { setUserData } from '../store/authSlice'
import API_ROUTES from '../routes/routes'

const LoginForm = () => {
  const inputRef = useRef()
  const { t } = useTranslation()
  const notifyError = () => toast.error(t('toast.error.network'))

  const dispatch = useDispatch()
  const redir = useNavigate()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const validationSchema = yup.object().shape({
    username: yup.string().required(t('error.requiredField')),
    password: yup.string().required(t('error.requiredField')),
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      if (formik.errors.username === t('login.error.invalidCredentials')) {
        formik.setFieldError('username', '')
        formik.setFieldError('password', '')
      }
      try {
        setSubmitting(true)
        const response = await axios.post(API_ROUTES.login(), values)

        if (response.status === 200) {
          const { username, token } = response.data
          localStorage.setItem('username', username)
          localStorage.setItem('token', token)
          dispatch(setUserData(response.data))
          redir('/')
        }
      } catch (error) {
        if (error.response?.status === 401) {
          setFieldError('username', t('login.error.invalidCredentials'))
          setFieldError('password', t('login.error.invalidCredentials'))
          setSubmitting(false)
        } else {
          notifyError()
        }
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <Container className="h-100 align-content-center">
      <Card className="bg-body-secondary text-center mx-auto" style={{ width: '20.75rem' }}>
        <Card.Body>
          <Form onSubmit={formik.handleSubmit}>
            <h1 className="text-center mb-4">{t('login.enter')}</h1>
            <Form.Floating className="mb-3">
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder={t('login.username')}
                name="username"
                id="username"
                autoComplete="username"
                ref={inputRef}
                isInvalid={!!formik.errors.username}
              />
              {formik.errors.username && formik.errors.username !== t('login.error.invalidCredentials') && (
                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.username}
                </Form.Control.Feedback>
              )}
              <Form.Label htmlFor="username">{t('login.username')}</Form.Label>
            </Form.Floating>
            <Form.Floating className="mb-4">
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder={t('login.password')}
                name="password"
                id="password"
                autoComplete="current-password"
                isInvalid={!!formik.errors.password}
              />
              <Form.Control.Feedback tooltip type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
              <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
            </Form.Floating>
            <Button type="submit" variant="outline-primary w-100" disabled={formik.isSubmitting}>
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
                  {t('login.enterLoading')}
                </>
              ) : (
                t('login.enter')
              )}
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="p-4">
          <Container className="text-center">
            <span>{t('login.noAccount')}</span>
            <Link to="/signup">{t('login.registrateAccount')}</Link>
          </Container>
        </Card.Footer>
      </Card>
    </Container>
  )
}

export default LoginForm
