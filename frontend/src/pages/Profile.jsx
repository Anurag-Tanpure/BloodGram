import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';
import {
    MapPin, User as UserIcon, Inbox, Send,
    CheckCircle2, XCircle, Clock, Droplet,
    Phone, Heart, AlertCircle, ArrowRight, Scale, Calendar
} from 'lucide-react';

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
    const map = {
        PENDING: { bg: '#fef9c3', color: '#a16207', icon: <Clock className="h-3 w-3" />, label: 'Pending' },
        ACCEPTED: { bg: '#dcfce7', color: '#15803d', icon: <CheckCircle2 className="h-3 w-3" />, label: 'Accepted' },
        REJECTED: { bg: '#fee2e2', color: '#b91c1c', icon: <XCircle className="h-3 w-3" />, label: 'Rejected' },
    };
    const s = map[status] ?? map.PENDING;
    return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: s.bg, color: s.color }}>
            {s.icon} {s.label}
        </span>
    );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ icon, title, subtitle, iconBg }) {
    return (
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
            <div className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: iconBg }}>
                {icon}
            </div>
            <div>
                <h2 className="font-bold text-gray-900 text-base">{title}</h2>
                {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
            </div>
        </div>
    );
}

// ─── Requests Received (Donor) ────────────────────────────────────────────────
function ReceivedRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actioning, setActioning] = useState({});

    useEffect(() => { fetchRequests(); }, []);

    const fetchRequests = async () => {
        try {
            const res = await api.get('/donor/donationRequests/receivedRequests');
            setRequests(res.data || []);
        } catch { } finally { setLoading(false); }
    };

    const handleAction = async (id, action) => {
        setActioning(prev => ({ ...prev, [id]: action }));
        try {
            const res = await api.put(`/donor/donationRequests/${action}/${id}`);
            const newStatus = res.data?.status ?? (action === 'accept' ? 'ACCEPTED' : 'REJECTED');
            setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
            toast.success(`Request ${action === 'accept' ? 'Accepted ✅' : 'Rejected'}`);
        } catch { } finally {
            setActioning(prev => { const n = { ...prev }; delete n[id]; return n; });
        }
    };

    if (loading) return (
        <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        </div>
    );

    if (requests.length === 0) return (
        <div className="flex flex-col items-center py-12 text-gray-400">
            <div className="h-16 w-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-3">
                <Inbox className="h-8 w-8 text-gray-300" />
            </div>
            <p className="font-semibold text-gray-500">No requests received yet</p>
            <p className="text-sm mt-1">Share your profile to get donation requests</p>
        </div>
    );

    return (
        <div className="space-y-3">
            {requests.map(req => {
                const isBusy = !!actioning[req.id];
                const isSettled = req.status === 'ACCEPTED' || req.status === 'REJECTED';
                return (
                    <div key={req.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl px-5 py-4 border transition hover:shadow-sm"
                        style={{ background: isSettled ? '#f9fafb' : '#fff9f9', borderColor: isSettled ? '#e5e7eb' : '#fecaca' }}>

                        <div className="flex items-start gap-4">
                            <div className="h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ background: 'linear-gradient(135deg, #fee2e2, #fecaca)' }}>
                                <UserIcon className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">Request from Receiver #{req.receiverId}</p>
                                {req.userPhone && (
                                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                        <Phone className="h-3 w-3" /> {req.userPhone}
                                    </p>
                                )}
                                <p className="text-xs text-gray-400 mt-1">
                                    📅 {new Date(req.requestDate).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 flex-shrink-0">
                            <StatusBadge status={req.status} />
                            {!isSettled && (
                                <>
                                    <button onClick={() => handleAction(req.id, 'accept')} disabled={isBusy}
                                        className="px-4 py-2 text-white text-xs font-bold rounded-xl transition disabled:opacity-50 hover:scale-105"
                                        style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}>
                                        {actioning[req.id] === 'accept' ? 'Accepting…' : '✓ Accept'}
                                    </button>
                                    <button onClick={() => handleAction(req.id, 'reject')} disabled={isBusy}
                                        className="px-4 py-2 text-red-600 bg-red-50 border border-red-200 text-xs font-bold rounded-xl transition disabled:opacity-50 hover:bg-red-100 hover:scale-105">
                                        {actioning[req.id] === 'reject' ? 'Rejecting…' : '✕ Reject'}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// ─── Requests Sent (User) ─────────────────────────────────────────────────────
function SentRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchRequests(); }, []);

    const fetchRequests = async () => {
        try {
            const res = await api.get('/donor/donationRequests/sentRequests');
            setRequests(res.data || []);
        } catch { } finally { setLoading(false); }
    };

    if (loading) return (
        <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
    );

    if (requests.length === 0) return (
        <div className="flex flex-col items-center py-12 text-gray-400">
            <div className="h-16 w-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-3">
                <Send className="h-8 w-8 text-gray-300" />
            </div>
            <p className="font-semibold text-gray-500">No requests sent yet</p>
            <Link to="/search-donors"
                className="mt-3 inline-flex items-center gap-1 text-sm text-red-600 font-bold hover:underline">
                Find Donors <ArrowRight className="h-4 w-4" />
            </Link>
        </div>
    );

    return (
        <div className="space-y-3">
            {requests.map(req => (
                <div key={req.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl px-5 py-4 border border-blue-100 hover:shadow-sm transition"
                    style={{ background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)' }}>

                    <div className="flex items-start gap-4">
                        <div className="h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: 'linear-gradient(135deg, #bfdbfe, #93c5fd)' }}>
                            <Droplet className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-sm">{req.donorname ?? `Donor #${req.donorId}`}</p>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <span className="text-xs font-bold px-2 py-0.5 rounded-full text-red-700"
                                    style={{ background: '#fee2e2' }}>
                                    {req.bloodGroup}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <MapPin className="h-3 w-3" /> {req.city}
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                                📅 {new Date(req.requestDate).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                            </p>
                        </div>
                    </div>

                    <div className="flex-shrink-0">
                        <StatusBadge status={req.status} />
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─── Stat Chip ────────────────────────────────────────────────────────────────
function StatChip({ value, label, color, bg }) {
    return (
        <div className="flex flex-col items-center px-6 py-4 rounded-2xl" style={{ background: bg }}>
            <span className="text-2xl font-extrabold" style={{ color }}>{value}</span>
            <span className="text-xs text-gray-500 mt-0.5 font-medium">{label}</span>
        </div>
    );
}

// ─── Main Profile Page ────────────────────────────────────────────────────────
export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [isDonor, setIsDonor] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) { navigate('/login'); return; }
        fetchProfile();
    }, [token]);

    const fetchProfile = async () => {
        try {
            const res = await api.get('/donor/profile');
            setProfile(res.data);
            setIsDonor(true);
        } catch (error) {
            const msg = error.response?.data?.message ?? error.response?.data ?? '';
            const notDonor = typeof msg === 'string' &&
                (msg.toLowerCase().includes('not registered') || msg.toLowerCase().includes('not a donor'));
            if (notDonor || error.response?.status === 404) {
                setIsDonor(false); setProfile(null);
            }
        } finally {
            setPageLoading(false);
        }
    };

    if (pageLoading) return (
        <div className="min-h-screen flex justify-center items-center" style={{ background: '#fff9f9' }}>
            <div className="flex flex-col items-center gap-4">
                <div className="h-14 w-14 rounded-full border-4 border-t-red-500 border-red-100 animate-spin"></div>
                <p className="text-sm text-gray-400 font-medium">Loading your profile…</p>
            </div>
        </div>
    );

    // ── Non-donor (user/receiver) ─────────────────────────────────────────────
    if (!isDonor) return (
        <div className="min-h-screen py-10 px-4" style={{ background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)' }}>
            <div className="max-w-3xl mx-auto space-y-6">

                {/* Profile banner */}
                <div className="rounded-3xl overflow-hidden shadow-sm border border-gray-200 bg-white">
                    <div className="h-24 w-full" style={{ background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)' }}></div>
                    <div className="px-6 pb-6 -mt-10 relative z-10 flex flex-col sm:flex-row items-start sm:items-end gap-4">
                        <div className="h-20 w-20 rounded-2xl bg-white shadow-lg border-4 border-white overflow-hidden flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #dbeafe, #93c5fd)' }}>
                            <UserIcon className="h-10 w-10 text-blue-400" />
                        </div>
                        <div className="flex-1 pb-2">
                            <h1 className="font-extrabold text-gray-900 text-xl">My Profile</h1>
                            <p className="text-sm text-gray-400">You are not registered as a donor</p>
                        </div>
                        <Link to="/register-donor"
                            className="inline-flex items-center gap-2 px-5 py-2.5 font-bold text-sm text-white rounded-xl shadow hover:scale-105 transition"
                            style={{ background: 'linear-gradient(135deg, #dc2626, #9f1239)' }}>
                            <Heart className="h-4 w-4" /> Become a Donor
                        </Link>
                    </div>
                </div>

                {/* Sent requests */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <SectionHeader
                        icon={<Send className="h-5 w-5 text-blue-600" />}
                        iconBg="linear-gradient(135deg, #dbeafe, #bfdbfe)"
                        title="Requests Sent"
                        subtitle="Track the status of your blood donation requests"
                    />
                    <div className="p-6"><SentRequests /></div>
                </div>

            </div>
        </div>
    );

    // ── Donor view ────────────────────────────────────────────────────────────
    const bloodGroupColors = {
        'A+': '#f87171', 'A-': '#fb923c', 'B+': '#facc15', 'B-': '#4ade80',
        'AB+': '#38bdf8', 'AB-': '#818cf8', 'O+': '#e879f9', 'O-': '#f472b6',
    };
    const bg = bloodGroupColors[profile.bloodGroup ?? profile.bloodgroup] ?? '#dc2626';

    return (
        <div className="min-h-screen py-10 px-4" style={{ background: 'linear-gradient(135deg, #fff9f9, #fff1f2, #fff7ed)' }}>
            <div className="max-w-4xl mx-auto space-y-6">

                {/* ── Profile Card ──────────────────────────────────────────────── */}
                <div className="rounded-3xl overflow-hidden shadow-md border border-red-100 bg-white">
                    {/* Cover */}
                    <div className="h-32 w-full relative" style={{
                        background: 'linear-gradient(135deg, #fce7f3, #fee2e2, #ffedd5)'
                    }}>
                        <div className="absolute right-6 top-6">
                            <button className="px-4 py-1.5 bg-white/80 backdrop-blur-sm text-gray-700 text-xs font-semibold rounded-xl border border-white shadow hover:bg-white transition">
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Avatar + name */}
                    <div className="px-8 pb-8 -mt-14 relative z-10">
                        <div className="flex flex-col sm:flex-row sm:items-end gap-5">
                            {/* Avatar ring */}
                            <div className="h-24 w-24 rounded-2xl p-1 shadow-xl flex-shrink-0"
                                style={{ background: `linear-gradient(135deg, ${bg}, #dc2626)` }}>
                                <div className="h-full w-full rounded-xl bg-white overflow-hidden flex items-center justify-center">
                                    {profile.imageUrl ? (
                                        <img src={profile.imageUrl} alt={profile.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="text-3xl font-extrabold text-gray-400">{profile.name?.charAt(0)}</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 pt-4 sm:pt-0">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <h1 className="text-2xl font-extrabold text-gray-900">{profile.name}</h1>
                                    {/* Blood group badge */}
                                    <span className="px-3 py-1 rounded-xl text-white text-sm font-extrabold shadow"
                                        style={{ background: bg }}>
                                        {profile.bloodGroup ?? profile.bloodgroup}
                                    </span>
                                    <span className="px-3 py-1 rounded-xl bg-green-100 text-green-700 text-xs font-bold flex items-center gap-1">
                                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span> Available
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                    <MapPin className="h-4 w-4 text-red-400" />
                                    {profile.city}, {profile.state}, {profile.country}
                                </p>
                            </div>
                        </div>

                        {/* Stats row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-7">
                            <StatChip value={profile.donationCount ?? 0} label="Donations" color="#dc2626" bg="#fff1f2" />
                            <StatChip value={`${profile.weight ?? '—'} kg`} label="Weight" color="#d97706" bg="#fffbeb" />
                            <StatChip value={profile.gender?.charAt(0) ?? '—'} label="Gender" color="#7c3aed" bg="#f5f3ff" />
                            <StatChip value={profile.lastDonationDate ? new Date(profile.lastDonationDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : 'Never'} label="Last Donation" color="#0369a1" bg="#f0f9ff" />
                        </div>
                    </div>
                </div>

                {/* ── Requests Received ─────────────────────────────────────────── */}
                <div className="bg-white rounded-3xl shadow-sm border border-red-100 overflow-hidden">
                    <SectionHeader
                        icon={<Inbox className="h-5 w-5 text-red-600" />}
                        iconBg="linear-gradient(135deg, #fee2e2, #fecaca)"
                        title="Requests Received"
                        subtitle="Accept or reject incoming donation requests"
                    />
                    <div className="p-6"><ReceivedRequests /></div>
                </div>

                {/* ── Requests Sent ─────────────────────────────────────────────── */}
                <div className="bg-white rounded-3xl shadow-sm border border-blue-100 overflow-hidden">
                    <SectionHeader
                        icon={<Send className="h-5 w-5 text-blue-500" />}
                        iconBg="linear-gradient(135deg, #dbeafe, #bfdbfe)"
                        title="Requests Sent"
                        subtitle="Track your outgoing donation requests (read-only)"
                    />
                    <div className="p-6"><SentRequests /></div>
                </div>

            </div>
        </div>
    );
}
