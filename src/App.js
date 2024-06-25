import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import HomePage from './pages/HomePage.js';
import BookingPage from './pages/BookingPage.js';

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/book/:doctorId" element={<BookingPage />} />
            </Routes>
        </div>
    );
};

export default App;

