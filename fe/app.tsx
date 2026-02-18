import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import VerticalLayout from './components/layouts/VerticalLayout';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
// Mount React
const App = function () {
    return <>
    </>
}
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<>
    <BrowserRouter>
        <AppRoutes >
            <VerticalLayout />
        </AppRoutes>

    </BrowserRouter>
</>);
