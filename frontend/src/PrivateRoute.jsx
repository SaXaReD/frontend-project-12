import { Navigate } from 'react-router-dom'
import useAuth from './hooks/useAuth.js'
import { routes } from './routes/routes.js'

const PrivateRoute = ({ children }) => {
  const { authData } = useAuth()

  return authData ? children : <Navigate to={routes.login} />
}

export default PrivateRoute
