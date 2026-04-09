import { useEffect, useState } from 'react';
import { getAnalyticsSummary, getSubjectwiseAnalytics } from '../api/analyticsApi';
import Navbar from '../components/Navbar';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    LineChart, Line, CartesianGrid, Cell,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) return (
        <div className="glass-card px-3 py-2 text-xs">
            <p className="text-gray-400">{label}</p>
            <p className="text-green-400 font-bold">{payload[0].value?.toFixed(1)}%</p>
        </div>
    );
    return null;
};

export default function AnalyticsPage() {
    const [summary, setSummary] = useState(null);
    const [subjectStats, setSubjectStats] = useState([]);
    const [scoreTrend, setScoreTrend] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getAnalyticsSummary(), getSubjectwiseAnalytics()])
            .then(([sRes, sbRes]) => {
                setSummary(sRes.data.data.summary);
                setSubjectStats(sbRes.data.data.subjectStats);
                setScoreTrend(sbRes.data.data.scoreTrend.map((t, i) => ({
                    quiz: `Q${i + 1}`,
                    score: t.score,
                    subject: t.subject,
                })));
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    const getBarColor = (acc) => acc >= 70 ? '#00C853' : acc >= 50 ? '#FFD740' : '#EF4444';

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="pt-24 pb-12 max-w-6xl mx-auto px-4 sm:px-6">
                <div className="mb-8 animate-fade-in">
                    <h1 className="section-header">Performance Analytics</h1>
                    <p className="section-sub">Track your GATE preparation progress</p>
                </div>

                {!summary ? (
                    <div className="glass-card p-12 text-center text-gray-500">
                        <p className="text-5xl mb-4">📊</p>
                        <p className="text-lg font-semibold text-white mb-2">No data yet!</p>
                        <p className="text-sm">Complete a quiz to see your analytics.</p>
                    </div>
                ) : (
                    <>
                        {/* Summary cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {[
                                { label: 'Total Quizzes', value: summary.totalAttempts, color: '#00C853', icon: '🎯' },
                                { label: 'Avg Accuracy', value: `${summary.avgAccuracy?.toFixed(1)}%`, color: '#00B0FF', icon: '📈' },
                                { label: 'Best Score', value: `${summary.bestScore}%`, color: '#FFD740', icon: '🏆' },
                                { label: 'Questions Done', value: summary.totalQuestions, color: '#D500F9', icon: '📚' },
                            ].map((s) => (
                                <div key={s.label} className="glass-card p-5">
                                    <div className="text-2xl mb-2">{s.icon}</div>
                                    <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
                                    <div className="text-gray-500 text-xs mt-1">{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Correct / Incorrect / Skipped */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {[
                                { label: 'Correct', val: summary.totalCorrect, color: '#00C853' },
                                { label: 'Incorrect', val: summary.totalIncorrect, color: '#EF4444' },
                                { label: 'Skipped', val: summary.totalSkipped, color: '#6B7280' },
                            ].map((s) => {
                                const pct = summary.totalQuestions > 0 ? (s.val / summary.totalQuestions * 100) : 0;
                                return (
                                    <div key={s.label} className="glass-card p-5">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm text-gray-400">{s.label}</span>
                                            <span className="text-sm font-bold" style={{ color: s.color }}>{s.val}</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{ width: `${pct}%`, background: s.color }} />
                                        </div>
                                        <p className="text-xs text-gray-600 mt-1">{pct.toFixed(1)}% of total</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* Subject Accuracy Bar */}
                            <div className="glass-card p-6">
                                <h3 className="text-white font-bold mb-4">Subject-wise Accuracy</h3>
                                {subjectStats.length === 0 ? (
                                    <p className="text-gray-500 text-sm text-center py-8">No data</p>
                                ) : (
                                    <ResponsiveContainer width="100%" height={260}>
                                        <BarChart data={subjectStats} layout="vertical" margin={{ left: 10, right: 20 }}>
                                            <XAxis type="number" domain={[0, 100]} tick={{ fill: '#6B7280', fontSize: 11 }} />
                                            <YAxis type="category" dataKey="subject" width={130} tick={{ fill: '#9CA3AF', fontSize: 10 }}
                                                tickFormatter={(v) => v.length > 14 ? `${v.slice(0, 13)}…` : v} />
                                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                                            <Bar dataKey="avgAccuracy" radius={[0, 6, 6, 0]} maxBarSize={20}>
                                                {subjectStats.map((s, i) => <Cell key={i} fill={getBarColor(s.avgAccuracy)} />)}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                )}
                            </div>

                            {/* Score Trend Line */}
                            <div className="glass-card p-6">
                                <h3 className="text-white font-bold mb-4">Score Trend (Last 10)</h3>
                                {scoreTrend.length < 2 ? (
                                    <p className="text-gray-500 text-sm text-center py-8">Need more attempts</p>
                                ) : (
                                    <ResponsiveContainer width="100%" height={260}>
                                        <LineChart data={scoreTrend} margin={{ left: -20 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                            <XAxis dataKey="quiz" tick={{ fill: '#6B7280', fontSize: 11 }} />
                                            <YAxis domain={[0, 100]} tick={{ fill: '#6B7280', fontSize: 11 }} />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Line type="monotone" dataKey="score" stroke="#00C853" strokeWidth={2.5}
                                                dot={{ fill: '#00C853', r: 4 }} activeDot={{ r: 6, fill: '#00E676' }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                )}
                            </div>
                        </div>

                        {/* Subject Details Table */}
                        {subjectStats.length > 0 && (
                            <div className="glass-card overflow-hidden">
                                <div className="px-5 py-4 border-b border-white/[0.06]">
                                    <h3 className="text-white font-bold">Subject Breakdown</h3>
                                </div>
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/[0.06]">
                                            {['Subject', 'Attempts', 'Avg Accuracy', 'Best Score', 'Questions Done'].map((h) => (
                                                <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase px-5 py-3">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subjectStats.map((s) => (
                                            <tr key={s.subject} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                                <td className="px-5 py-3 text-sm text-white font-medium">{s.subject}</td>
                                                <td className="px-5 py-3 text-sm text-gray-400">{s.attempts}</td>
                                                <td className="px-5 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                            <div className="h-full rounded-full" style={{ width: `${s.avgAccuracy}%`, background: getBarColor(s.avgAccuracy) }} />
                                                        </div>
                                                        <span className="text-sm" style={{ color: getBarColor(s.avgAccuracy) }}>{s.avgAccuracy}%</span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3 text-sm font-bold" style={{ color: getBarColor(s.bestScore) }}>{s.bestScore}%</td>
                                                <td className="px-5 py-3 text-sm text-gray-400">{s.totalCorrect}/{s.totalQuestions}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
