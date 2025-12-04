import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Contextshare from './context/Contextshare.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId='453156073373-rjaobnatb015teopconml1u0vmidt464.apps.googleusercontent.com'>



        <Contextshare>
          <App />
        </Contextshare>


      </GoogleOAuthProvider>
    </BrowserRouter>

  </StrictMode>,
)
