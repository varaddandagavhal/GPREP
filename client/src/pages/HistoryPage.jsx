import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserAttempts } from '../api/attemptApi';
import Navbar from '../components/Navbar';

export default function HistoryPage() {
    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        getUserAttempts({ limit: 50 })
            .then((r) => setAttempts(r.data.data))
            .finally(() => setLoading(false));
    }, []);

    const filtered = filter ? attempts.filter((a) => a.subject === filter) : attempts;
    const subjects = [...new Set(attempts.map((a) => a.subject))];

    const formatTime = (s) => s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="pt-24 pb-12 max-w-5xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between mb-8 animate-fade-in">
                    <div>
                        <h1 className="section-header">Attempt History</h1>
                        <p className="section-sub">{attempts.length} total attempts</p>
                    </div>
                    <Link to="/quiz" className="btn-primary text-sm">New Quiz →</Link>
                </div>

                {/* Subject Filter */}
                {subjects.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        <button onClick={() => setFilter('')}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${!filter ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/5 text-gray-500 border border-white/[0.08] hover:border-green-500/30'
                                }`}>All</button>
                        {subjects.map((s) => (
                            <button key={s} onClick={() => setFilter(s)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${filter === s ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/5 text-gray-500 border border-white/[0.08] hover:border-green-500/30'
                                    }`}>{s}</button>
                        ))}
                    </div>
                )}

                {filtered.length === 0 ? (
                    <div className="glass-card p-12 text-center">
                        <p className="text-4xl mb-3">📋</p>
                        <p className="text-gray-400">No attempts yet. Start a quiz to see history here.</p>
                        <Link to="/quiz" className="btn-primary mt-4 inline-flex">Start Quiz →</Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filtered.map((a) => (
                            <Link key={a._id} to={`/results/${a._id}`}
                                className="glass-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-green-500/20 block">
                                <div>
                                    <p className="text-white font-semibold text-sm">{a.subject}</p>
                                    <p className="text-gray-500 text-xs mt-0.5">{new Date(a.createdAt).toLocaleString()}</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-center">
                                        <p className="text-xl font-black"
                                            style={{ color: a.score >= 60 ? '#00C853' : a.score >= 40 ? '#FFD740' : '#EF4444' }}>
                                            {a.score}%
                                        </p>
                                        <p className="text-xs text-gray-600">Score</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-gray-300">{a.correctCount}/{a.totalQuestions}</p>
                                        <p className="text-xs text-gray-600">Correct</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-gray-300">{formatTime(a.timeTaken)}</p>
                                        <p className="text-xs text-gray-600">Time</p>
                                    </div>
                                    <span className="text-green-500 text-sm">→</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
