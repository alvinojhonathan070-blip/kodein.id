import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

createRoot(document.getElementById('root')).render(
    <ReactLenis root options={{ lerp: 0.1, duration: 2.0, smoothWheel: true }}>
      <App />
    </ReactLenis>
)