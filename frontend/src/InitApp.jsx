import filter from 'leo-profanity'
import i18nextInstance from './i18n/init.js'
import store from './store/store.js'
import rollbarConfig from './rollbar/config.js'
import { I18nextProvider } from 'react-i18next'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { setUserData } from './store/slices/authSlice'

const initApp = async () => {
  filter.add(filter.getDictionary('en'))
  filter.add(filter.getDictionary('ru'))

  const storedToken = localStorage.getItem('token')
  const storedUsername = localStorage.getItem('username')

  const initialAuthData = {
    token: storedToken || '',
    username: storedUsername || '',
  }

  store.dispatch(setUserData(initialAuthData))

  return (
    <Provider store={store}>
      <AuthProvider>
        <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <I18nextProvider i18n={i18nextInstance}>
              <App />
            </I18nextProvider>
          </ErrorBoundary>
        </RollbarProvider>
      </AuthProvider>
    </Provider>
  )
}

export default initApp
