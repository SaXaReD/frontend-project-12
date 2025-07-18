import { createContext, useMemo, useState, useEffect } from 'react'
import axios from 'axios'
import { apiPath } from '../routes/routes.js'
import { useDispatch } from 'react-redux'
import { setUserData } from '../store/slices/authSlice.js'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()

  const [authData, setAuthData] = useState(() => {
    const username = localStorage.getItem('username')
    const token = localStorage.getItem('token')
    return username && token ? { username, token } : null
  })

  useEffect(() => {
    if (authData) {
      dispatch(setUserData(authData))
    }
  }, [authData])

  const logIn = async (credentials) => {
    const response = await axios.post(apiPath.login(), credentials)
    localStorage.setItem('username', response.data.username)
    localStorage.setItem('token', response.data.token)
    dispatch(setUserData(response.data))
    setAuthData(response.data)
  }

  const logOut = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    dispatch(setUserData(null))
    setAuthData(null)
  }

  const value = useMemo(() => ({ authData, logIn, logOut }), [authData])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
