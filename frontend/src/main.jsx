import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import store from './store/store.js'
import i18nextInstance from './i18n/init.js';

const rootElement = document.getElementById('root');

rootElement.className = 'vh-100 vw-100';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nextProvider i18n={i18nextInstance}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  </StrictMode>,
)
