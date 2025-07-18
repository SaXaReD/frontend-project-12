import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import initApp from './InitApp.jsx'

const app = async () => {
  const root = createRoot(document.getElementById('root'))
  root.render(await initApp())
}

app()
