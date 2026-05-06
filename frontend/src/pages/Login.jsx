import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/auth/login', { email, password });

            // Backend returns the JWT either as a plain string or inside an object
            let token = null;
            if (typeof res.data === 'string') {
                token = res.data.trim();
            } else if (res.data?.token) {
                token = res.data.token;
            } else if (res.data?.jwt) {
                token = res.data.jwt;
            } else if (res.data?.accessToken) {
                token = res.data.accessToken;
            }

            if (token) {
                localStorage.setItem('token', token);
                toast.success('Logged in successfully!');
                window.location.href = '/';
            } else {
                toast.error('Could not retrieve token from response');
            }
        } catch (error) {
            // Error toast is shown by the global Axios interceptor in api.js
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-gray-50">
            <div className="max-w-sm w-full bg-white border border-gray-300 p-8 rounded-xl shadow-sm">
                <h2 className="text-4xl font-bold text-center mb-8 text-red-600" style={{ fontFamily: "'Lobster', cursive, serif" }}>BloodGram</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                    <button
                        type="submit"
                        className="w-full bg-red-500 text-white font-semibold rounded-lg py-2 mt-4 text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Logging in...
                            </span>
                        ) : 'Log In'}
                    </button>
                </form>
                <div className="mt-6 flex items-center justify-center space-x-2">
                    <div className="h-px bg-gray-300 flex-1"></div>
                    <span className="text-gray-400 font-semibold text-sm">OR</span>
                    <div className="h-px bg-gray-300 flex-1"></div>
                </div>
                <div className="mt-4 text-center">
                    <Link to="/signup" className="text-blue-700 font-bold text-sm">Create new account</Link>
                </div>
            </div>
            <div className="max-w-sm w-full bg-white border border-gray-300 mt-4 p-4 rounded-xl text-center text-sm shadow-sm">
                Already have an account? <Link to="/login" className="text-red-500 font-semibold">Log in</Link>
            </div>
        </div>
    );
}
