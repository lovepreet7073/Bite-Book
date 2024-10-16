import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import store from './redux/store.js'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
console.log('Client ID:', clientId);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <Provider store={store}>
        <GoogleOAuthProvider clientId={clientId}>
          <App />
        </GoogleOAuthProvider>
      </Provider>

    </BrowserRouter>
  </StrictMode>,
)
