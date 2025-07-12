import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider as ReduxProvider } from 'react-redux';
import i18nextInstance from './i18n/init.js';
import rollbarConfig from './rollbar/config.js';
import store from './store/store.js';

const rootElement = document.getElementById('root');

rootElement.className = 'vh-100 vw-100';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <I18nextProvider i18n={i18nextInstance}>
            <App />
          </I18nextProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </ReduxProvider>
  </StrictMode>,
)
