import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AlertTriangle } from 'lucide-react';

export default function Emergency() {
    const [formData, setFormData] = useState({
        bloodGroup: 'A+',
        country: '',
        state: '',
        city: '',
        address: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Only UI requirement as per prompt
        toast.success('Emergency Request submitted successfully. We have broadcasted this to potential donors nearby.', { duration: 5000 });
        setFormData({
            bloodGroup: 'A+',
            country: '',
            state: '',
            city: '',
            address: ''
        });
    };

    return (
        <div className="min-h-[80vh] bg-red-50 py-10 px-4 flex items-center justify-center">
            <div className="max-w-xl w-full bg-white rounded-2xl shadow-sm border border-red-200 p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-red-600"></div>
                <div className="flex justify-center mb-4">
                    <div className="bg-red-100 p-4 rounded-full">
                        <AlertTriangle className="h-10 w-10 text-red-600" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Emergency Request</h2>
                <p className="text-gray-500 text-center mb-8">Fill out this form to quickly find blood donors near your hospital or location.</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Required Blood Group</label>
                        <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-3 outline-none focus:border-red-500 shadow-sm font-semibold text-red-600">
                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                                <option key={bg} value={bg}>{bg}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                            <input type="text" name="country" required value={formData.country} onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                            <input type="text" name="state" required value={formData.state} onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input type="text" name="city" required value={formData.city} onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Address (Hospital/Street)</label>
                        <textarea name="address" required value={formData.address} onChange={handleChange} rows="3" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500 resize-none"></textarea>
                    </div>

                    <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 mt-4 rounded-lg hover:bg-red-700 transition-colors shadow-md">
                        Broadcast Emergency
                    </button>
                </form>
            </div>
        </div>
    );
}
