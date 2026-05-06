import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import RegisterDonor from './pages/RegisterDonor';
import SearchDonors from './pages/SearchDonors';
import Emergency from './pages/Emergency';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register-donor" element={<RegisterDonor />} />
            <Route path="/search-donors" element={<SearchDonors />} />
            <Route path="/emergency" element={<Emergency />} />
          </Routes>
        </main>
        <footer className="bg-white border-t py-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} BloodGram. All rights reserved.</p>
        </footer>
        <Toaster position="top-center" />
      </div>
    </BrowserRouter>
  );
}

export default App;
