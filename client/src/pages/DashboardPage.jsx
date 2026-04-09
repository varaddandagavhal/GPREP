import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getSubjects } from '../api/questionApi';
import { getAnalyticsSummary } from '../api/analyticsApi';
import { getUserAttempts } from '../api/attemptApi';
import Navbar from '../components/Navbar';
import SubjectCard from '../components/SubjectCard';

const STAT_CARDS = (s) => [
    { label: 'Total Attempts', value: s?.totalAttempts ?? 0, icon: '🎯', color: '#00C853' },
    { label: 'Avg. Accuracy', value: s ? `${s.avgAccuracy?.toFixed(1)}%` : '-%', icon: '📈', color: '#00B0FF' },
    { label: 'Best Score', value: s ? `${s.bestScore}%` : '-%', icon: '🏆', color: '#FFD740' },
    { label: 'Qs Attempted', value: s?.totalQuestions ?? 0, icon: '📚', color: '#D500F9' },
];

export default function DashboardPage() {
    const { user } = useAuth();
    const [subjects, setSubjects] = useState([]);
    const [summary, setSummary] = useState(null);
    const [recentAttempts, setRecentAttempts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [subRes, sumRes, attRes] = await Promise.all([
                    getSubjects(),
                    getAnalyticsSummary(),
                    getUserAttempts({ limit: 5 }),
                ]);
                setSubjects(subRes.data.data);
                setSummary(sumRes.data.data.summary);
                setRecentAttempts(sumRes.data.data.recentAttempts || attRes.data.data);
            } catch { /* silent */ }
            finally { setLoading(false); }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" /></div>
    );

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
                    <div>
                        <h1 className="text-3xl font-black text-white">
                            Hey, <span style={{ color: '#00C853' }}>{user?.name?.split(' ')[0]}</span> 👋
                        </h1>
                        <p className="text-gray-500 mt-1">Ready to crack GATE today?</p>
                    </div>
                    <Link to="/quiz" className="btn-primary">
                        Start Practice →
                    </Link>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 animate-slide-up">
                    {STAT_CARDS(summary).map((s) => (
                        <div key={s.label} className="glass-card p-5">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-2xl">{s.icon}</span>
                                <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                            </div>
                            <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
                            <div className="text-gray-500 text-xs mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Subjects */}
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="text-xl font-bold text-white">Practice by Subject</h2>
                            <p className="text-gray-500 text-sm">Click a subject to start a quiz</p>
                        </div>
                    </div>
                    {subjects.length === 0 ? (
                        <div className="glass-card p-12 text-center text-gray-500">
                            <p className="text-4xl mb-3">📭</p>
                            <p>No questions loaded yet. Ask admin to run the seeder.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {subjects.map((s) => (
                                <SubjectCard key={s._id} subject={s._id} count={s.count}
                                    easy={s.easy} medium={s.medium} hard={s.hard} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Attempts */}
                {recentAttempts.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xl font-bold text-white">Recent Attempts</h2>
                            <Link to="/history" className="text-green-500 text-sm hover:text-green-400">View All →</Link>
                        </div>
                        <div className="glass-card overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/[0.06]">
                                        {['Subject', 'Score', 'Accuracy', 'Questions', 'Date'].map((h) => (
                                            <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase px-5 py-3">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentAttempts.map((a) => (
                                        <tr key={a._id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                            <td className="px-5 py-3 text-sm text-white font-medium">{a.subject}</td>
                                            <td className="px-5 py-3">
                                                <span className="font-bold" style={{ color: a.score >= 60 ? '#00C853' : a.score >= 40 ? '#FFD740' : '#EF4444' }}>
                                                    {a.score}%
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-sm text-gray-400">{a.accuracy?.toFixed(1)}%</td>
                                            <td className="px-5 py-3 text-sm text-gray-400">{a.correctCount}/{a.totalQuestions}</td>
                                            <td className="px-5 py-3 text-sm text-gray-500">{new Date(a.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
