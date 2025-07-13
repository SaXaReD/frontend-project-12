import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Button,
  Spinner,
  Modal,
  Form,
} from 'react-bootstrap'
import * as yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import leoProfanity from 'leo-profanity'
import {
  addChannel,
  setCurrentChannel,
  selectors as channelSelectors,
} from '../../store/channelSlice.js'
import { selectToken } from '../../store/authSlice.js'
import { setClose } from '../../store/modalSlice.js'
import API_ROUTES from '../../routes/routes.js'

const CreateChannel = () => {
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const { t } = useTranslation()
  const notifySuccess = () => toast.success(t('toast.success.channelCreated'))
  const notifyError = () => toast.error(t('toast.error.network'))

  const channels = useSelector(channelSelectors.selectAll)
  const token = useSelector(selectToken)
  const existingNames = Object.values(channels).map((el) => el.name)
  const { type } = useSelector((state) => state.modal)

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, t('error.minLengthName'))
      .max(20, t('error.minLengthName'))
      .required(t('error.requiredField'))
      .notOneOf(existingNames, t('error.uniqueName')),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      if (!token) return
      setSubmitting(true)

      const filteredName = leoProfanity.clean(values.name)

      // if (filteredName !== values.name) {
      //   formik.setFieldError('name', t('channels.error.profanity'))
      //   return
      // }

      try {
        const response = await axios.post(API_ROUTES.channels.list(), { name: filteredName }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        dispatch(addChannel(response.data))
        dispatch(setCurrentChannel(response.data.id))
        formik.resetForm()
        notifySuccess()
      } catch (error) {
        console.error('Error creating channel:', error)
        notifyError()
      } finally {
        setSubmitting(false)
        dispatch(setClose())
      }
    },
  })

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleModal = () => {
    formik.resetForm()
    dispatch(setClose())
  }

  return (
    <Modal centered show={type === 'create'} onHide={() => dispatch(setClose())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.createChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Control
              ref={inputRef}
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              id="name"
              aria-label={t('modal.createChannel.body')}
              type="text"
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Label hidden htmlFor="name">{t('modal.createChannel.body')}</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <Container className="d-flex justify-content-end p-0">
              <Button type="button" variant="secondary" className="me-2" onClick={handleModal}>
                {t('modal.createChannel.cancelBtn')}
              </Button>
              <Button type="submit" variant="primary" onClick={formik.handleSubmit} disabled={formik.isSubmitting}>
                {formik.isSubmitting && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}
                {!formik.isSubmitting ? t('modal.createChannel.confirmBtn') : t('modal.createChannel.loading')}
              </Button>
            </Container>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default CreateChannel
