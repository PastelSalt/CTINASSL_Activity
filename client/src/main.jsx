import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Latin subset, two weights: 400 for body text; 700 for headings and controls (500/600 resolve to the nearest).
import '@fontsource/fredoka/latin-400.css'
import '@fontsource/fredoka/latin-700.css'
import './styles/base.css'
import './styles/public.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
