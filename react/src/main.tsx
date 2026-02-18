import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MyLayout from './@layouts/MyLayout'
import { getSystemMode } from './@core/utils/serverHelpers'
import { BrowserRouter } from 'react-router-dom'
import AllRoutes from './routes/AllRoutes'
const direction = 'ltr'
const systemMode = getSystemMode()


// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'
// Style Imports
import '@/app/globals.css'
// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter><AllRoutes></AllRoutes></BrowserRouter>,
)
