import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router' 
import { Toaster } from 'react-hot-toast'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App /> 
      <Toaster/>
    </BrowserRouter>
  </StrictMode>
);
//BrowserRouter enables routing in the application, allowing navigation between different components or pages without reloading the entire page.
