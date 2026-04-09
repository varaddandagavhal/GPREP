import { Link } from 'react-router-dom';

const FEATURES = [
    { icon: '🎯', title: '100+ MCQs', desc: 'Curated GATE-level questions across 8 engineering subjects.' },
    { icon: '📊', title: 'Smart Analytics', desc: 'Track accuracy, subject scores, and performance trends.' },
    { icon: '⏱️', title: 'Timed Practice', desc: 'Simulated exam conditions to build your time management.' },
    { icon: '💡', title: 'Explanations', desc: 'Every question comes with a detailed explanation.' },
    { icon: '🏅', title: 'Progress Tracking', desc: 'Monitor your improvement attempt by attempt.' },
    { icon: '🛡️', title: 'Secure Platform', desc: 'JWT-based auth with role-based access control.' },
];

const SUBJECTS = ['Computer Science', 'Mathematics', 'General Aptitude', 'Electronics', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Chemical Engineering'];

export default function LandingPage() {
    return (
        <div className="min-h-screen overflow-x-hidden">
            {/* Top Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]"
                style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(20px)' }}>
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-black font-black text-sm"
                            style={{ background: 'linear-gradient(135deg,#00C853,#00E676)' }}>G</div>
                        <span className="font-extrabold text-lg tracking-tight">
                            <span style={{ color: '#00C853' }}>G</span>Prep
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="btn-ghost text-sm">Login</Link>
                        <Link to="/register" className="btn-primary text-sm">Get Started →</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
                        style={{ background: 'radial-gradient(circle, #00C853 0%, transparent 70%)', filter: 'blur(60px)' }} />
                </div>

                <div className="max-w-4xl mx-auto px-6 text-center relative z-10 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                        style={{ background: 'rgba(0,200,83,0.1)', border: '1px solid rgba(0,200,83,0.3)', color: '#00C853' }}>
                        🎓 GATE 2025 Preparation Platform
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
                        Ace Your{' '}
                        <span className="text-green-glow">GATE Exam</span>
                        <br />with Confidence
                    </h1>

                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        Practice 100+ curated GATE PYQs with detailed explanations, real-time analytics,
                        and AI-powered performance insights across 8 core engineering subjects.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Link to="/register" className="btn-primary text-base px-8 py-3.5">
                            Start Practicing Free →
                        </Link>
                        <Link to="/login" className="btn-secondary text-base px-8 py-3.5">
                            Login to Dashboard
                        </Link>
                    </div>

                    {/* Stats Row */}
                    <div className="flex flex-col sm:flex-row gap-8 justify-center mt-8">
                        {[['100+', 'Practice Questions'], ['8', 'Core Subjects'], ['12+', 'REST API Endpoints']].map(([val, label]) => (
                            <div key={label} className="text-center">
                                <div className="text-3xl font-black" style={{ color: '#00C853' }}>{val}</div>
                                <div className="text-gray-500 text-sm mt-1">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subjects Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="section-header">8 Core Subjects</h2>
                    <p className="section-sub">Comprehensive coverage across all GATE engineering streams</p>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                    {SUBJECTS.map((s) => (
                        <span key={s} className="px-4 py-2 rounded-full text-sm font-medium"
                            style={{ background: 'rgba(0,200,83,0.08)', border: '1px solid rgba(0,200,83,0.2)', color: '#00C853' }}>
                            {s}
                        </span>
                    ))}
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="section-header">Everything You Need</h2>
                    <p className="section-sub">Built with a focus on exam performance and learning outcomes</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURES.map((f) => (
                        <div key={f.title} className="glass-card p-6">
                            <div className="text-3xl mb-4">{f.icon}</div>
                            <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="max-w-3xl mx-auto px-6 py-20 text-center">
                <div className="glass-card p-10 text-center border-green-500/20">
                    <h2 className="text-3xl font-black text-white mb-4">Ready to Crack GATE?</h2>
                    <p className="text-gray-400 mb-8">Join thousands of aspirants improving their rank every day.</p>
                    <Link to="/register" className="btn-primary text-base px-8 py-3.5">
                        Create Free Account →
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-white/[0.06] py-8 px-6 text-center">
                <p className="text-gray-600 text-sm">
                    © 2024 <span style={{ color: '#00C853' }}>GPrep</span> — GATE Preparation Platform. Built with React, Node.js & MongoDB.
                </p>
            </footer>
        </div>
    );
}
