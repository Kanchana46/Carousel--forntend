import React from 'react';
import Home from './components/Home/Home';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
};

export default App;
