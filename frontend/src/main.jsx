import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './store/store.js'

const rootElement = document.getElementById('root');

rootElement.className = 'vh-100 vw-100';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
