import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react'

const { VITE_AUTH0_DOMAIN: domain, VITE_AUTH0_CLIENT_ID: clientId, VITE_AUTH0_CLIENT_SECRET: clientSecret } = import.meta.env
const redirect_uri: string = window.location.origin + "/user"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{ redirect_uri: redirect_uri }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
)
