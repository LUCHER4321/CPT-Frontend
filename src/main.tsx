import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth } from './routes/auth.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App/>}/>
        <Route path="auth" element={<Auth initialRegister={new URLSearchParams(window.location.search).get("register") === "true"}/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
