import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient= new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/> 
    <App />
    </QueryClientProvider>
    </LocalizationProvider>
  </StrictMode>,
)
