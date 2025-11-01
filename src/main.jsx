import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
// Use the React adapter instead of the Next.js adapter to avoid importing Next-specific
// code (which breaks Vite/Rollup in non-Next projects).
import { Analytics } from "@vercel/analytics/react"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <Analytics />
  </React.StrictMode>,
)
