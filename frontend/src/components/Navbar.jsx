import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, User, LogOut, Heart, Menu, X } from 'lucide-react';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');
    const [searchTerm, setSearchTerm] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        window.location.href = '/login';
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search-donors?q=${encodeURIComponent(searchTerm)}`);
            setMenuOpen(false);
        }
    };

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/search-donors', label: 'Find Donors' },
        { to: '/emergency', label: 'Emergency' },
        { to: '#', label: 'Leaderboard' },
        { to: '#', label: 'Blood Banks' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-16 gap-4">

                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                            <div className="h-8 w-8 rounded-xl flex items-center justify-center shadow-sm"
                                style={{ background: 'linear-gradient(135deg, #dc2626, #f97316)' }}>
                                <Heart className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-xl font-extrabold tracking-tight"
                                style={{
                                    background: 'linear-gradient(90deg, #dc2626, #f97316)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>
                                BloodGram
                            </span>
                        </Link>

                        {/* Search + Find Donors Button */}
                        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-4 gap-2">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all"
                                    placeholder="Search blood, city, phone..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-xl shadow-sm hover:bg-red-700 hover:scale-105 transition-all whitespace-nowrap">
                                Find Donors
                            </button>
                        </form>

                        {/* Desktop Nav Links (Remaining) */}
                        <div className="hidden lg:flex items-center gap-1">
                            {[
                                { to: '/emergency', label: 'Emergency' },
                                { to: '#', label: 'Leaderboard' },
                                { to: '#', label: 'Blood Banks' },
                                { to: '/', label: 'Home' },
                            ].map(({ to, label }) => (
                                <Link key={label} to={to}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${isActive(to)
                                        ? 'bg-red-50 text-red-600'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}>
                                    {label}
                                </Link>
                            ))}
                        </div>

                        {/* Auth */}
                        <div className="flex items-center gap-3 ml-auto">
                            {token ? (
                                <>
                                    <Link to="/profile" className="flex items-center gap-2 group">
                                        <div className="h-9 w-9 rounded-xl p-[2px] shadow-sm flex-shrink-0"
                                            style={{ background: 'linear-gradient(135deg, #f59e0b, #dc2626, #ec4899)' }}>
                                            <div className="h-full w-full rounded-[10px] bg-white flex items-center justify-center">
                                                <User className="h-4 w-4 text-gray-500" />
                                            </div>
                                        </div>
                                        <span className="hidden md:block text-sm font-semibold text-gray-700 group-hover:text-red-600 transition-colors">Profile</span>
                                    </Link>
                                    <button onClick={handleLogout}
                                        className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 font-semibold hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                        <LogOut className="h-4 w-4" /> Logout
                                    </button>
                                </>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link to="/login"
                                        className="hidden md:block text-sm font-semibold text-gray-600 px-3 py-2 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                        Login
                                    </Link>
                                    <Link to="/signup"
                                        className="inline-flex items-center gap-1.5 bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-xl shadow hover:bg-red-700 hover:scale-105 transition-all">
                                        <Heart className="h-3.5 w-3.5" /> Sign up
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Menu Toggle */}
                            <button onClick={() => setMenuOpen(!menuOpen)}
                                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition">
                                {menuOpen ? <X className="h-5 w-5 text-gray-600" /> : <Menu className="h-5 w-5 text-gray-600" />}
                            </button>
                        </div>

                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
                        {/* Mobile search */}
                        <form onSubmit={handleSearch} className="mb-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input type="text" className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-red-300"
                                    placeholder="Search blood group, city..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            </div>
                        </form>
                        {navLinks.map(({ to, label }) => (
                            <Link key={label} to={to} onClick={() => setMenuOpen(false)}
                                className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${isActive(to) ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'
                                    }`}>
                                {label}
                            </Link>
                        ))}
                        {token ? (
                            <div className="pt-2 border-t border-gray-100 mt-2 flex gap-2">
                                <Link to="/profile" onClick={() => setMenuOpen(false)}
                                    className="flex-1 text-center py-2.5 bg-gray-50 rounded-xl text-sm font-semibold text-gray-700">Profile</Link>
                                <button onClick={handleLogout}
                                    className="flex-1 py-2.5 bg-red-50 rounded-xl text-sm font-semibold text-red-600">Logout</button>
                            </div>
                        ) : (
                            <div className="pt-2 border-t border-gray-100 mt-2 flex gap-2">
                                <Link to="/login" onClick={() => setMenuOpen(false)}
                                    className="flex-1 text-center py-2.5 bg-gray-50 rounded-xl text-sm font-semibold text-gray-700">Login</Link>
                                <Link to="/signup" onClick={() => setMenuOpen(false)}
                                    className="flex-1 text-center py-2.5 bg-red-600 rounded-xl text-sm font-bold text-white">Sign up</Link>
                            </div>
                        )}
                    </div>
                )}
            </nav>
        </>
    );
}
