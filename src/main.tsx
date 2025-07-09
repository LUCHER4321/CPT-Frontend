import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth } from './routes/Auth.tsx'
import { Pricing } from './routes/Pricing.tsx'
import { Billing, Plan } from './enums.tsx'
import { isEnum } from './utils/isEnum.tsx'

const plan = new URLSearchParams(window.location.search).get("plan") ?? "";
const billing = new URLSearchParams(window.location.search).get("billing") ?? "";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App/>}/>
        <Route path="auth" element={<Auth
          initialRegister={new URLSearchParams(window.location.search).get("register") === "true"}
          initialPlan={isEnum(Plan, plan) ? plan as Plan : undefined}
          initialBilling={isEnum(Billing, billing) ? billing as Billing : undefined}
        />}/>
        <Route path="pricing" element={<Pricing/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
