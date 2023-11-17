import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react'
import { UserContextProvider } from './context/UserContext.tsx'

const { VITE_AUTH0_DOMAIN: domain, VITE_AUTH0_CLIENT_ID: clientId, VITE_AUTH0_AUDIENCE: audience } = import.meta.env
const redirect_uri: string = window.location.origin + "/user"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <UserContextProvider>
    <BrowserRouter>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: redirect_uri,
          audience: audience
        }}>
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </UserContextProvider>
)
