// src/router.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './views/dashboard'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}
