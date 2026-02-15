import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MyLayout from './@layouts/MyLayout'
import { getSystemMode } from './@core/utils/serverHelpers'
import { BrowserRouter } from 'react-router-dom'
const direction = 'ltr'
const systemMode = getSystemMode()

createRoot(document.getElementById('root')!).render(
  <BrowserRouter><MyLayout>test</MyLayout></BrowserRouter>,
)
