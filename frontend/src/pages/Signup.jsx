import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/auth/signup', { name, email, password });
            toast.success('User registered successfully');
            navigate('/login');
        } catch (error) {
            if (error.response?.data === 'Email already exists') {
                toast.error('Email already exists');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-gray-50 py-8">
            <div className="max-w-sm w-full bg-white border border-gray-300 p-8 rounded-xl shadow-sm">
                <h2 className="text-4xl font-bold text-center mb-4 text-blood-600" style={{ fontFamily: "'Lobster', cursive, serif" }}>BloodGram</h2>
                <p className="text-center text-gray-500 font-semibold mb-6">Sign up to connect with donors and save lives.</p>
                <form onSubmit={handleSignup} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <p className="text-xs text-gray-500 text-center mt-2">
                        By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .
                    </p>
                    <button
                        type="submit"
                        className="w-full bg-blood-500 text-white font-semibold rounded-lg py-2 mt-4 text-sm hover:bg-blood-600 transition-colors disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
            </div>
            <div className="max-w-sm w-full bg-white border border-gray-300 mt-4 p-4 rounded-xl text-center text-sm shadow-sm">
                Have an account? <Link to="/login" className="text-blood-500 font-semibold">Log in</Link>
            </div>
        </div>
    );
}
