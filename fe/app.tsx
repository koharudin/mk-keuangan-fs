import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import VerticalLayout from './components/VerticalLayout';
// Mount React
const App = function () {
    return <>
    </>
}
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<VerticalLayout />);
