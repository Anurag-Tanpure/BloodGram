import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';
import { Search, MapPin, Droplet, User as UserIcon, CheckCircle, Loader2, Heart, X, Phone, Filter } from 'lucide-react';

// ─── Phone Modal ──────────────────────────────────────────────────────────────
function RequestModal({ donor, onClose, onSuccess, onAlready }) {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => { inputRef.current?.focus(); }, []);
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!phone.trim()) { toast.error('Please enter your phone number'); return; }
        setLoading(true);
        try {
            await api.post('/donor/donationRequests/create', {
                donorId: donor.id ?? donor.donorId ?? undefined,
                donorPhone: donor.phoneNumber ?? undefined,
                bloodGroup: donor.bloodGroup ?? donor.bloodgroup,
                requesterPhone: phone.trim(),
            });
            onSuccess();
            toast.success(`Request sent to ${donor.name}!`);
            onClose();
        } catch (error) {
            const msg = error.response?.data?.message || '';
            if (msg.toLowerCase().includes('already')) { onAlready(); onClose(); }
            else setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
                {/* Modal header */}
                <div className="px-6 py-5 flex items-center justify-between"
                    style={{ background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)' }}>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl overflow-hidden bg-white shadow-sm flex items-center justify-center">
                            {donor.imageUrl
                                ? <img src={donor.imageUrl} alt={donor.name} className="h-full w-full object-cover" />
                                : <UserIcon className="h-5 w-5 text-gray-400" />}
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-sm">{donor.name}</p>
                            <p className="text-xs text-gray-500">{donor.bloodGroup ?? donor.bloodgroup} · {donor.city}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-white/60 transition">
                        <X className="h-4 w-4 text-gray-500" />
                    </button>
                </div>

                <div className="p-6">
                    <h3 className="text-base font-bold text-gray-900 mb-1">Enter Your Phone Number</h3>
                    <p className="text-sm text-gray-500 mb-5">We'll share this with the donor so they can reach you.</p>

                    <form onSubmit={handleSubmit}>
                        <div className="relative mb-5">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Phone className="h-4 w-4 text-gray-400" />
                            </div>
                            <input ref={inputRef} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                                placeholder="e.g. 9226543210"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 text-sm transition bg-gray-50"
                                maxLength={15} required />
                        </div>
                        <div className="flex gap-3">
                            <button type="button" onClick={onClose}
                                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition">
                                Cancel
                            </button>
                            <button type="submit" disabled={loading}
                                className="flex-1 py-2.5 rounded-xl text-white font-bold text-sm transition disabled:opacity-60 flex items-center justify-center gap-2"
                                style={{ background: 'linear-gradient(135deg, #dc2626, #e11d48)' }}>
                                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : <><Heart className="h-4 w-4" /> Send Request</>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

// ─── Request Button ───────────────────────────────────────────────────────────
function RequestButton({ donor }) {
    const [status, setStatus] = useState('idle');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        if (!localStorage.getItem('token')) {
            toast.error('Please login first');
            navigate('/login');
            return;
        }
        setShowModal(true);
    };

    if (status === 'done') return (
        <button disabled className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}>
            <CheckCircle className="h-4 w-4" /> Request Sent!
        </button>
    );

    if (status === 'already') return (
        <button disabled className="w-full py-2.5 rounded-xl border-2 border-yellow-300 text-yellow-700 bg-yellow-50 text-sm font-bold">
            ✓ Already Requested
        </button>
    );

    return (
        <>
            <button onClick={handleClick}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-90 hover:scale-[1.02] transition-all shadow-md"
                style={{ background: 'linear-gradient(135deg, #dc2626, #e11d48)' }}>
                <Heart className="h-4 w-4" /> Create Request
            </button>
            {showModal && (
                <RequestModal donor={donor} onClose={() => setShowModal(false)}
                    onSuccess={() => setStatus('done')} onAlready={() => setStatus('already')} />
            )}
        </>
    );
}

// ─── Blood Group Colors ───────────────────────────────────────────────────────
const bgColors = {
    'A+': '#f87171', 'A-': '#fb923c', 'B+': '#facc15', 'B-': '#4ade80',
    'AB+': '#38bdf8', 'AB-': '#818cf8', 'O+': '#e879f9', 'O-': '#f472b6',
};

// ─── Donor Card ───────────────────────────────────────────────────────────────
function DonorCard({ donor }) {
    const bg = bgColors[donor.bloodGroup ?? donor.bloodgroup] ?? '#f87171';
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
            {/* Card top color strip */}
            <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${bg}, #dc2626)` }}></div>

            <div className="p-6 flex flex-col items-center text-center flex-1">
                {/* Avatar */}
                <div className="relative mb-4">
                    <div className="h-20 w-20 rounded-2xl overflow-hidden border-2 border-gray-100 shadow-sm"
                        style={{ background: `${bg}22` }}>
                        {donor.imageUrl
                            ? <img src={donor.imageUrl} alt={donor.name} className="h-full w-full object-cover" />
                            : <div className="h-full w-full flex items-center justify-center">
                                <span className="text-2xl font-extrabold" style={{ color: bg }}>{donor.name?.charAt(0)}</span>
                            </div>}
                    </div>
                    {/* Blood group chip */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-white font-extrabold text-xs shadow-md whitespace-nowrap border-2 border-white"
                        style={{ background: bg }}>
                        {donor.bloodGroup ?? donor.bloodgroup}
                    </div>
                </div>

                <div className="mt-3">
                    <h3 className="text-base font-bold text-gray-900">{donor.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5 font-medium">{donor.gender}</p>
                </div>

                <div className="flex items-center justify-center gap-1 text-gray-500 text-xs mt-2 mb-3">
                    <MapPin className="h-3.5 w-3.5 text-red-400" />
                    <span>{donor.city}, {donor.state}</span>
                </div>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mb-4"
                    style={{ background: '#dcfce7', color: '#15803d' }}>
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Available
                </span>

                <div className="mt-auto w-full">
                    <RequestButton donor={donor} />
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SearchDonors() {
    const location = useLocation();
    const initialQuery = new URLSearchParams(location.search).get('q') || '';

    const [filters, setFilters] = useState({ bloodGroup: '', city: '', state: '', country: '', phoneNumber: '' });
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [showFilters, setShowFilters] = useState(true);

    useEffect(() => {
        if (initialQuery) {
            const q = initialQuery.trim();
            const isPhone = /^\d{10,15}$/.test(q);
            const updated = isPhone
                ? { ...filters, phoneNumber: q, city: '' }
                : { ...filters, city: q, phoneNumber: '' };
            setFilters(updated);
            runSearch(updated);
        }
    }, [initialQuery]);

    const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

    const runSearch = async (searchFilters) => {
        setLoading(true);
        setHasSearched(true);
        try {
            if (searchFilters.phoneNumber) {
                const res = await api.get('/donor/searchDonor', { params: { phoneNumber: searchFilters.phoneNumber } });
                const found = res.data ? [res.data] : [];
                setDonors(found);
            } else {
                const payload = {};
                Object.keys(searchFilters).forEach(k => { if (searchFilters[k]) payload[k] = searchFilters[k]; });
                const res = await api.post('/donor/donors', payload);
                setDonors(res.data || []);
            }
            setShowFilters(false); // Always collapse after any search attempt to keep it clean
        } catch (err) {
            setDonors([]);
            setShowFilters(false); // Keep collapsed even on error, user can manually open if they want
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => { e.preventDefault(); runSearch(filters); };

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    return (
        <div className="min-h-screen pb-20" style={{ background: 'linear-gradient(135deg, #fff9f9, #f8fafc)' }}>

            {/* ── Page Header ───────────────────────────────────────────────────── */}
            <div className="relative overflow-hidden py-10 px-4 text-center"
                style={{ background: 'linear-gradient(135deg, #fff1f2, #ffe4e6, #fff7ed)' }}>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 relative">
                    Find Blood <span style={{
                        background: 'linear-gradient(90deg, #dc2626, #f97316)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                    }}>Donors</span>
                </h1>
                <p className="text-gray-500 text-sm relative">Search across 500+ cities to find the right donor for you</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* ── Filter Card ──────────────────────────────────────────────────── */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                    <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-50">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-xl flex items-center justify-center"
                                style={{ background: 'linear-gradient(135deg, #fee2e2, #fecaca)' }}>
                                <Filter className="h-4 w-4 text-red-600" />
                            </div>
                            <h2 className="font-bold text-gray-900">Filter Donors</h2>
                        </div>
                        <button onClick={() => setShowFilters(!showFilters)}
                            className="text-xs font-bold text-red-600 hover:text-red-700 underline decoration-red-200 underline-offset-4">
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    </div>

                    {showFilters && (
                        <div className="p-6 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                            <form onSubmit={handleSearch}>
                                {/* Blood Group Quick Select */}
                                <div className="mb-5">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">Blood Group</label>
                                    <div className="flex flex-wrap gap-2">
                                        <button type="button" onClick={() => setFilters({ ...filters, bloodGroup: '' })}
                                            className={`px-3 py-1.5 rounded-xl text-sm font-bold border-2 transition-all ${filters.bloodGroup === ''
                                                ? 'border-red-600 bg-red-600 text-white shadow'
                                                : 'border-gray-200 text-gray-600 hover:border-red-300'}`}>
                                            Any
                                        </button>
                                        {bloodGroups.map(bg => {
                                            const color = bgColors[bg];
                                            const active = filters.bloodGroup === bg;
                                            return (
                                                <button key={bg} type="button"
                                                    onClick={() => setFilters({ ...filters, bloodGroup: bg })}
                                                    className={`px-3 py-1.5 rounded-xl text-sm font-extrabold border-2 transition-all hover:scale-105 ${active ? 'text-white shadow-md border-transparent' : 'border-gray-200 text-gray-700'}`}
                                                    style={active ? { background: color, borderColor: color } : {}}>
                                                    {bg}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Search by Phone</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
                                            <input type="text" name="phoneNumber" placeholder="Phone Number" value={filters.phoneNumber || ''} onChange={handleChange}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">City</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
                                            <input type="text" name="city" placeholder="e.g. Indore" value={filters.city} onChange={handleChange}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">State</label>
                                        <input type="text" name="state" placeholder="e.g. Madhya Pradesh" value={filters.state} onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Country</label>
                                        <input type="text" name="country" placeholder="e.g. India" value={filters.country} onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition" />
                                    </div>
                                </div>

                                <button type="submit" disabled={loading}
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm disabled:opacity-60 hover:opacity-90 hover:scale-[1.01] transition-all shadow-md"
                                    style={{ background: 'linear-gradient(135deg, #dc2626, #f97316)' }}>
                                    {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Searching...</> : <><Search className="h-4 w-4" /> Search Donors</>}
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                {/* ── Results ──────────────────────────────────────────────────────── */}
                {loading ? (
                    <div className="flex flex-col items-center py-24 text-gray-400">
                        <div className="h-14 w-14 rounded-full border-4 border-t-red-500 border-red-100 animate-spin mb-4"></div>
                        <p className="font-semibold">Finding donors near you…</p>
                    </div>
                ) : hasSearched && donors.length === 0 ? (
                    <div className="text-center py-24">
                        <div className="h-20 w-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
                            style={{ background: 'linear-gradient(135deg, #fee2e2, #fecaca)' }}>
                            <Droplet className="h-10 w-10 text-red-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-700 mb-2">No donors found</h3>
                        <p className="text-gray-400 text-sm">Try adjusting your filters or search a different location</p>
                    </div>
                ) : donors.length > 0 ? (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-sm text-gray-500 font-medium">
                                <span className="font-extrabold text-gray-900 text-lg">{donors.length}</span> donors found
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {donors.map((donor, i) => <DonorCard key={donor.id ?? i} donor={donor} />)}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20 text-gray-400">
                        <Droplet className="h-16 w-16 mx-auto mb-4 opacity-30" />
                        <p className="font-semibold text-gray-500">Use the filters above to search for donors</p>
                    </div>
                )}
            </div>
        </div>
    );
}
