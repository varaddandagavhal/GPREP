import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getAttemptById } from '../api/attemptApi';
import Navbar from '../components/Navbar';

export default function ResultsPage() {
    const { id } = useParams();
    const [attempt, setAttempt] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedIdx, setExpandedIdx] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getAttemptById(id)
            .then((r) => setAttempt(r.data.data))
            .catch(() => navigate('/dashboard'))
            .finally(() => setLoading(false));
    }, [id, navigate]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    const { score, accuracy, correctCount, incorrectCount, skippedCount, totalQuestions, subject, timeTaken, questions, selectedAnswers } = attempt;
    const formatTime = (s) => s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="pt-24 pb-12 max-w-4xl mx-auto px-4 sm:px-6">

                {/* Score Header */}
                <div className="glass-card p-8 mb-8 text-center animate-fade-in relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: `radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,200,83,${score >= 60 ? 0.15 : score >= 40 ? 0.08 : 0.05}) 0%, transparent 70%)` }} />
                    <h1 className="text-xl text-gray-400 mb-2">Quiz Completed 🎉</h1>
                    <p className="text-gray-500 text-sm mb-6">{subject}</p>
                    <div className="text-8xl font-black mb-2"
                        style={{ color: score >= 60 ? '#00C853' : score >= 40 ? '#FFD740' : '#EF4444' }}>
                        {score}%
                    </div>
                    <p className="text-gray-400 mb-6">
                        {score >= 75 ? '🏆 Excellent! You\'re GATE ready!' : score >= 50 ? '👍 Good effort! Keep practicing.' : '💪 Keep pushing! Consistency is key.'}
                    </p>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                        {[
                            { label: 'Correct', value: correctCount, color: '#00C853' },
                            { label: 'Incorrect', value: incorrectCount, color: '#EF4444' },
                            { label: 'Skipped', value: skippedCount, color: '#6B7280' },
                            { label: 'Time', value: formatTime(timeTaken), color: '#00B0FF' },
                        ].map((s) => (
                            <div key={s.label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
                                <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
                                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-3 mt-6">
                        <Link to="/quiz" className="btn-primary text-sm">Try Again →</Link>
                        <Link to="/analytics" className="btn-secondary text-sm">View Analytics</Link>
                    </div>
                </div>

                {/* Question Review */}
                <h2 className="text-xl font-bold text-white mb-4">Question Review</h2>
                <div className="space-y-3">
                    {questions.map((q, i) => {
                        const selected = selectedAnswers[i] ?? -1;
                        const isCorrect = selected === q.correctAnswer;
                        const isSkipped = selected === -1;
                        const isOpen = expandedIdx === i;

                        return (
                            <div key={i} className={`glass-card overflow-hidden transition-all duration-200 ${isCorrect ? 'border-green-500/30' : isSkipped ? 'border-white/[0.06]' : 'border-red-500/30'
                                }`}>
                                <button className="w-full text-left p-5 flex items-start gap-4" onClick={() => setExpandedIdx(isOpen ? null : i)}>
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${isCorrect ? 'bg-green-500/20 text-green-400' : isSkipped ? 'bg-gray-500/20 text-gray-400' : 'bg-red-500/20 text-red-400'
                                        }`}>
                                        {isCorrect ? '✓' : isSkipped ? '–' : '✗'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-300 leading-relaxed pr-4">{q.questionText}</p>
                                    </div>
                                    <span className="text-gray-600 text-xs mt-1 flex-shrink-0">{isOpen ? '▲' : '▼'}</span>
                                </button>

                                {isOpen && (
                                    <div className="px-5 pb-5 border-t border-white/[0.04] pt-4 animate-fade-in">
                                        <div className="space-y-2 mb-4">
                                            {q.options.map((opt, oi) => (
                                                <div key={oi} className={`flex items-start gap-3 px-4 py-2.5 rounded-xl text-sm ${oi === q.correctAnswer ? 'bg-green-500/10 border border-green-500/30 text-green-300' :
                                                        oi === selected && !isCorrect ? 'bg-red-500/10 border border-red-500/30 text-red-300' :
                                                            'text-gray-500'
                                                    }`}>
                                                    <span className="font-bold flex-shrink-0">{String.fromCharCode(65 + oi)}.</span>
                                                    <span>{opt}</span>
                                                    {oi === q.correctAnswer && <span className="ml-auto text-green-400 text-xs font-bold">✓ Correct</span>}
                                                    {oi === selected && !isCorrect && <span className="ml-auto text-red-400 text-xs font-bold">✗ Your Answer</span>}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-4 rounded-xl" style={{ background: 'rgba(0,200,83,0.06)', border: '1px solid rgba(0,200,83,0.15)' }}>
                                            <p className="text-xs font-bold text-green-500 mb-1">💡 Explanation</p>
                                            <p className="text-gray-300 text-sm leading-relaxed">{q.explanation}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
