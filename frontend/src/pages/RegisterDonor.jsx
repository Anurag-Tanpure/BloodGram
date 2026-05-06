import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';

export default function RegisterDonor() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        bloodGroup: 'A+',
        dateOfBirth: '',
        gender: 'MALE',
        phoneNumber: '',
        city: '',
        state: '',
        country: '',
        weight: '',
        imageUrl: ''
    });

    useEffect(() => {
        if (!token) {
            toast.error('Please login first');
            navigate('/login');
        }
    }, [token, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const dataToSubmit = { ...formData, weight: Number(formData.weight) };
            await api.post('/donor/register', dataToSubmit);
            toast.success('Donor registered successfully');
            navigate('/profile');
        } catch (error) {
            if (error.response?.data === 'Phone number already registered') {
                toast.error('Phone number already registered');
            } else if (error.response?.status === 401) {
                toast.error('Unauthorized / Invalid token');
                localStorage.removeItem('token');
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    if (!token) return null;

    return (
        <div className="min-h-[80vh] bg-gray-50 py-10 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Register As Donor</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blood-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                            <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blood-500">
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                                    <option key={bg} value={bg}>{bg}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                            <input type="date" name="dateOfBirth" required value={formData.dateOfBirth} onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blood-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blood-500">
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input type="tel" name="phoneNumber" required value={formData.phoneNumber} onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blood-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                            <input type="number" name="weight" required value={formData.weight} onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blood-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                            <input type="text" name="city" required value={formData.city} onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blood-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                            <input type="text" name="state" required value={formData.state} onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blood-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                            <input type="text" name="country" required value={formData.country} onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blood-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL (Optional)</label>
                            <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blood-500" placeholder="https://..." />
                        </div>
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-blood-600 text-white font-bold py-3 rounded-lg hover:bg-blood-700 transition-colors mt-6 disabled:opacity-50">
                        {loading ? 'Registering...' : 'Register as Donor'}
                    </button>
                </form>
            </div>
        </div>
    );
}
