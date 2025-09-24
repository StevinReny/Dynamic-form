import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
    <RouterProvider router={router}/> 
    <App />
    </LocalizationProvider>
  </StrictMode>,
)
