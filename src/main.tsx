import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth } from './routes/Auth.tsx'
import { Pricing } from './routes/Pricing.tsx'
import { Billing, Order, Plan, TreeCriteria } from './enums.tsx'
import { isEnum } from './utils/isEnum.tsx'
import { Dashboard } from './routes/Dashboard.tsx'
import { TreeEditor } from './routes/account/TreeEditor.tsx'
import { SearchTrees } from './routes/trees/SearchTrees.tsx'
import type { SearchProps } from './types'
import { nullableInput } from './utils/nullableInput.tsx'
import { TreeViewer } from './routes/trees/TreeViewer.tsx'
import { Profile } from './routes/Profile.tsx'
import { Follows } from './routes/account/Follows.tsx'
import { Settings } from './routes/account/Settings.tsx'
import { PayPal } from './routes/pricing/Paypal.tsx'

const param = (p: string) => new URLSearchParams(window.location.search).get(p) ?? undefined;
const numberParam = (p: string) => nullableInput(param(p), p1 => +p1);
const plan = param("plan") ?? "";
const billing = param("billing") ?? "";
const initialRegister = param("register");
const criteria = param("criteria") ?? "";
const order = param("order") ?? "";
const searchProps: SearchProps = {
  page: numberParam("page"),
  limit: numberParam("limit"),
  search: param("search"),
  criteria: isEnum(TreeCriteria, criteria) ? criteria as TreeCriteria : undefined,
  order: isEnum(Order, order) ? order as Order : undefined,
  from: nullableInput(param("from"), p => new Date(p)),
  to: nullableInput(param("to"), p => new Date(p))
};

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Routes>
        <Route index element={<App/>}/>
        <Route path="auth" element={<Auth
          initialRegister={initialRegister === "true"}
          initialPlan={isEnum(Plan, plan) ? plan as Plan : undefined}
          initialBilling={isEnum(Billing, billing) ? billing as Billing : undefined}
        />}/>
        <Route path="pricing">
          <Route index element={<Pricing/>}/>
          <Route path="paypal" element={<PayPal
            plan={isEnum(Plan, plan) ? plan as Plan : undefined}
            billing={isEnum(Billing, billing) ? billing as Billing : undefined}
          />}/>
        </Route>
        <Route path="account">
          <Route index element={<Dashboard/>}/>
          <Route path="settings" element={<Settings/>}/>
          <Route path="profile" element={<Profile
            myProfile
          />}/>
          <Route path="liked" element={<SearchTrees
            liked
          />}/>
          <Route path="follows">
            <Route index element={<Follows
              showFollowers
              showFollowing
            />}/>
            <Route path="followers" element={<Follows
              showFollowers
            />}/>
            <Route path="following" element={<Follows
              showFollowing
            />}/>
          </Route>
          <Route path="trees">
            <Route index element={<SearchTrees
              {...searchProps}
              myTrees
            />}/>
            <Route path="me" element={<SearchTrees
              {...searchProps}
              myTrees
              owner
            />}/>
            <Route path="collabs" element={<SearchTrees
              {...searchProps}
              myTrees
              owner={false}
            />}/>
            <Route path=":id" element={<TreeEditor/>}/>
          </Route>
        </Route>
        <Route path="trees">
          <Route index element={<SearchTrees
            {...searchProps}
          />}/>
          <Route path=":id" element={<TreeViewer/>}/>
        </Route>
        <Route path="profiles">
          <Route path=":id" element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
)
