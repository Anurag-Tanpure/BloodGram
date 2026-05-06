import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, AlertCircle, ArrowRight, Droplet, Users, Award, Shield } from 'lucide-react';

export default function Home() {
    return (
        <div className="bg-white min-h-screen">

            {/* ── Hero ─────────────────────────────────────────────────────────── */}
            <div className="relative overflow-hidden" style={{
                background: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 35%, #fff7ed 70%, #fef3c7 100%)'
            }}>
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #f87171, transparent)' }}></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #fb923c, transparent)' }}></div>

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-28 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-red-100 text-red-600 text-sm font-semibold px-4 py-2 rounded-full mb-8 shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                        Join 10,000+ donors across India
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                        Save Lives Through
                        <span className="block" style={{
                            background: 'linear-gradient(90deg, #dc2626, #f97316)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>Blood Donation</span>
                    </h1>

                    <p className="text-lg lg:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Connect with life-saving donors in your city. Every drop counts — be someone's reason to smile today.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register-donor" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 text-white font-bold rounded-2xl text-base shadow-lg hover:bg-red-700 hover:scale-105 hover:shadow-xl transition-all duration-200">
                            <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" /> Become a Donor
                        </Link>
                        <Link to="/search-donors" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-800 font-bold rounded-2xl text-base shadow-md border border-gray-200 hover:border-red-300 hover:text-red-600 hover:scale-105 transition-all duration-200">
                            <Search className="h-5 w-5" /> Find Donors
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── How BloodGram Works — directly below hero ──────────────────── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <span className="inline-block bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-red-100">
                        How It Works
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">How BloodGram Works</h2>
                    <p className="text-gray-500 text-base max-w-xl mx-auto">Three simple steps to connect donors with those in need</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {/* Card 1 */}
                    <div className="group rounded-3xl p-8 flex flex-col items-center text-center hover:scale-[1.03] transition-all duration-300 shadow-sm hover:shadow-xl border border-blue-100"
                        style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)' }}>
                        <div className="h-16 w-16 rounded-2xl flex items-center justify-center mb-5 shadow-lg"
                            style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
                            <Search className="h-8 w-8 text-white" />
                        </div>
                        <div className="h-7 w-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mb-4">1</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Search Donors</h3>
                        <p className="text-gray-600 mb-6 flex-grow leading-relaxed text-sm">Filter by blood group, city, state or country to find the right donor in seconds.</p>
                        <Link to="/search-donors" className="inline-flex items-center gap-1 bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow hover:bg-blue-700 group-hover:gap-2 transition-all">
                            Search Now <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Card 2 — elevated center */}
                    <div className="group rounded-3xl p-8 flex flex-col items-center text-center hover:scale-[1.03] transition-all duration-300 shadow-xl hover:shadow-2xl border border-red-200 relative md:-mt-6"
                        style={{ background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)' }}>
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg whitespace-nowrap"
                            style={{ background: 'linear-gradient(90deg, #dc2626, #f97316)' }}>
                            ⭐ Most Popular
                        </div>
                        <div className="h-16 w-16 rounded-2xl flex items-center justify-center mb-5 shadow-lg"
                            style={{ background: 'linear-gradient(135deg, #f43f5e, #dc2626)' }}>
                            <Heart className="h-8 w-8 text-white" />
                        </div>
                        <div className="h-7 w-7 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center mb-4">2</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Register as Donor</h3>
                        <p className="text-gray-600 mb-6 flex-grow leading-relaxed text-sm">Join our growing community of heroes. Get notified instantly when someone nearby needs your blood type.</p>
                        <Link to="/register-donor" className="inline-flex items-center gap-1 bg-red-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow hover:bg-red-700 group-hover:gap-2 transition-all">
                            Join Now <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Card 3 */}
                    <div className="group rounded-3xl p-8 flex flex-col items-center text-center hover:scale-[1.03] transition-all duration-300 shadow-sm hover:shadow-xl border border-orange-100"
                        style={{ background: 'linear-gradient(135deg, #fff7ed, #fed7aa)' }}>
                        <div className="h-16 w-16 rounded-2xl flex items-center justify-center mb-5 shadow-lg"
                            style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}>
                            <AlertCircle className="h-8 w-8 text-white" />
                        </div>
                        <div className="h-7 w-7 rounded-full bg-orange-600 text-white text-xs font-bold flex items-center justify-center mb-4">3</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Emergency Request</h3>
                        <p className="text-gray-600 mb-6 flex-grow leading-relaxed text-sm">Urgent need? Broadcast an emergency request and reach all available donors near your location.</p>
                        <Link to="/emergency" className="inline-flex items-center gap-1 bg-orange-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow hover:bg-orange-600 group-hover:gap-2 transition-all">
                            Request Now <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── Stats Strip ───────────────────────────────────────────────────── */}
            <div style={{ background: 'linear-gradient(135deg, #fff1f2, #fff7ed)' }}>
                <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-5">
                    {[
                        { value: '10,000+', label: 'Registered Donors', color: '#dc2626', bg: '#fee2e2', icon: '🩸' },
                        { value: '500+', label: 'Cities Covered', color: '#ea580c', bg: '#ffedd5', icon: '📍' },
                        { value: '8', label: 'Blood Groups', color: '#7c3aed', bg: '#f5f3ff', icon: '💉' },
                        { value: '24/7', label: 'Emergency Support', color: '#0369a1', bg: '#f0f9ff', icon: '🚨' },
                    ].map((s, i) => (
                        <div key={i} className="flex flex-col items-center text-center rounded-2xl py-7 px-4 shadow-sm border border-white"
                            style={{ background: s.bg }}>
                            <span className="text-3xl mb-2">{s.icon}</span>
                            <p className="text-3xl lg:text-4xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
                            <p className="text-sm text-gray-500 mt-1.5 font-semibold">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Blood Group Rainbow ───────────────────────────────────────────── */}
            <div className="py-16" style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)' }}>
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-8">All Blood Types Covered</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { bg: 'A+', color: '#f87171' }, { bg: 'A-', color: '#fb923c' },
                            { bg: 'B+', color: '#facc15' }, { bg: 'B-', color: '#4ade80' },
                            { bg: 'AB+', color: '#38bdf8' }, { bg: 'AB-', color: '#818cf8' },
                            { bg: 'O+', color: '#e879f9' }, { bg: 'O-', color: '#f472b6' },
                        ].map(({ bg, color }) => (
                            <div key={bg} className="h-16 w-16 rounded-2xl flex items-center justify-center font-extrabold text-white text-lg shadow-xl hover:scale-110 transition-transform cursor-default"
                                style={{ background: color }}>
                                {bg}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Why BloodGram ─────────────────────────────────────────────────── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">Why BloodGram?</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {[
                        { icon: <Shield className="h-6 w-6 text-violet-600" />, bg: '#f5f3ff', title: 'Safe & Verified', desc: 'All donors are verified through our secure registration system.' },
                        { icon: <Users className="h-6 w-6 text-sky-600" />, bg: '#f0f9ff', title: 'Large Network', desc: 'Thousands of active donors across 500+ cities ready to help.' },
                        { icon: <Award className="h-6 w-6 text-amber-600" />, bg: '#fffbeb', title: 'Earn Recognition', desc: 'Get recognized as a life-saving hero in your community.' },
                    ].map((f, i) => (
                        <div key={i} className="rounded-2xl p-6 flex gap-4 items-start border border-gray-100 hover:shadow-md transition" style={{ background: f.bg }}>
                            <div className="p-3 bg-white rounded-xl shadow-sm flex-shrink-0">{f.icon}</div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">{f.title}</h4>
                                <p className="text-sm text-gray-500">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── CTA Banner ───────────────────────────────────────────────────── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #dc2626, #9f1239)' }}>
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-2xl" style={{ background: 'white' }}></div>
                    <Droplet className="h-12 w-12 text-white/30 mx-auto mb-4" />
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">Ready to save a life today?</h2>
                    <p className="text-red-200 mb-8 text-base max-w-md mx-auto">It only takes a few minutes to register. Your blood can give someone a second chance at life.</p>
                    <Link to="/register-donor" className="inline-flex items-center gap-2 bg-white text-red-700 font-bold px-8 py-4 rounded-2xl hover:bg-red-50 transition shadow-lg text-base">
                        <Heart className="h-5 w-5" /> Register as Donor
                    </Link>
                </div>
            </div>

        </div>
    );
}
