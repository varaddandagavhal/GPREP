import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getQuizQuestions } from '../api/questionApi';
import { submitAttempt } from '../api/attemptApi';
import { getSubjects } from '../api/questionApi';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

const DIFFICULTIES = ['Any', 'Easy', 'Medium', 'Hard'];
const COUNTS = [5, 10, 15, 20];

export default function QuizPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const timerRef = useRef(null);

    // Config Phase
    const [subjects, setSubjects] = useState([]);
    const [config, setConfig] = useState({
        subject: searchParams.get('subject') || '',
        count: 10,
        difficulty: '',
    });

    // Quiz Phase
    const [phase, setPhase] = useState('config'); // config | quiz | submitting
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getSubjects().then((r) => setSubjects(r.data.data)).catch(() => { });
    }, []);

    // Timer
    useEffect(() => {
        if (phase === 'quiz') {
            timerRef.current = setInterval(() => setTimeElapsed((t) => t + 1), 1000);
        }
        return () => clearInterval(timerRef.current);
    }, [phase]);

    const startQuiz = async () => {
        if (!config.subject) { toast.error('Please select a subject.'); return; }
        setLoading(true);
        try {
            const res = await getQuizQuestions(config.subject, config.count, config.difficulty === 'Any' ? '' : config.difficulty);
            const qs = res.data.data;
            setQuestions(qs);
            setAnswers(new Array(qs.length).fill(-1));
            setPhase('quiz');
            setTimeElapsed(0);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Could not load questions.');
        } finally { setLoading(false); }
    };

    const selectAnswer = (idx) => {
        if (answers[current] !== -1) return; // Already answered
        const newAnswers = [...answers];
        newAnswers[current] = idx;
        setAnswers(newAnswers);
    };

    const handleSubmit = async () => {
        clearInterval(timerRef.current);
        setPhase('submitting');
        try {
            const res = await submitAttempt({
                subject: config.subject,
                questionIds: questions.map((q) => q._id),
                selectedAnswers: answers,
                timeTaken: timeElapsed,
            });
            toast.success(`Quiz submitted! Score: ${res.data.data.score}%`);
            navigate(`/results/${res.data.data._id}`);
        } catch {
            toast.error('Submission failed. Please try again.');
            setPhase('quiz');
        }
    };

    const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
    const answeredCount = answers.filter((a) => a !== -1).length;
    const q = questions[current];

    // ── Config Screen ──
    if (phase === 'config') return (
        <div className="min-h-screen">
            <Navbar />
            <div className="pt-24 pb-12 max-w-2xl mx-auto px-4 sm:px-6">
                <div className="mb-8 text-center animate-fade-in">
                    <h1 className="text-3xl font-black text-white">Start a Quiz</h1>
                    <p className="text-gray-500 mt-2">Configure your practice session</p>
                </div>

                <div className="glass-card p-8 space-y-6">
                    {/* Subject */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">Select Subject *</label>
                        <div className="grid grid-cols-2 gap-2">
                            {subjects.map((s) => (
                                <button key={s._id} onClick={() => setConfig({ ...config, subject: s._id })}
                                    className={`text-left px-4 py-3 rounded-xl text-sm font-medium border transition-all ${config.subject === s._id
                                            ? 'border-green-500 bg-green-500/10 text-white'
                                            : 'border-white/[0.08] bg-white/[0.02] text-gray-400 hover:border-green-500/40 hover:text-white'
                                        }`}>
                                    {s._id}
                                    <span className="ml-1 text-xs text-gray-600">({s.count})</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Count */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">Number of Questions</label>
                        <div className="flex gap-3">
                            {COUNTS.map((c) => (
                                <button key={c} onClick={() => setConfig({ ...config, count: c })}
                                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${config.count === c ? 'border-green-500 bg-green-500/10 text-white' : 'border-white/[0.08] text-gray-400 hover:border-green-500/40'
                                        }`}>{c}</button>
                            ))}
                        </div>
                    </div>

                    {/* Difficulty */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">Difficulty</label>
                        <div className="flex gap-3">
                            {DIFFICULTIES.map((d) => (
                                <button key={d} onClick={() => setConfig({ ...config, difficulty: d })}
                                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${(config.difficulty || 'Any') === d ? 'border-green-500 bg-green-500/10 text-white' : 'border-white/[0.08] text-gray-400 hover:border-green-500/40'
                                        }`}>{d}</button>
                            ))}
                        </div>
                    </div>

                    <button className="btn-primary w-full justify-center py-3.5" onClick={startQuiz} disabled={loading}>
                        {loading ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />Loading...</span> : 'Start Quiz →'}
                    </button>
                </div>
            </div>
        </div>
    );

    // ── Submitting ──
    if (phase === 'submitting') return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Submitting your quiz...</p>
            </div>
        </div>
    );

    // ── Quiz Screen ──
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="pt-20 pb-12">
                {/* Fixed Quiz Header */}
                <div className="sticky top-16 z-40 border-b border-white/[0.06]"
                    style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)' }}>
                    <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500">{config.subject}</p>
                            <p className="text-sm font-semibold text-white">Q {current + 1} of {questions.length}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-400">{answeredCount}/{questions.length} answered</span>
                            <div className="px-3 py-1.5 rounded-lg font-mono font-bold text-sm"
                                style={{ background: 'rgba(0,200,83,0.1)', color: '#00C853', border: '1px solid rgba(0,200,83,0.3)' }}>
                                ⏱ {formatTime(timeElapsed)}
                            </div>
                        </div>
                    </div>
                    {/* Progress */}
                    <div className="h-0.5 bg-white/[0.05]">
                        <div className="h-full bg-green-500 transition-all duration-300"
                            style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 py-8 flex gap-6">
                    {/* Question */}
                    <div className="flex-1">
                        <div className="glass-card p-6 mb-5 animate-fade-in">
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`badge badge-${q.difficulty?.toLowerCase()}`}>{q.difficulty}</span>
                                <span className="text-xs text-gray-600 bg-white/5 px-2 py-1 rounded">{q.topic}</span>
                            </div>
                            <p className="text-white text-base leading-relaxed font-medium" style={{ whiteSpace: 'pre-wrap' }}>{q.question}</p>
                        </div>

                        <div className="space-y-3">
                            {q.options.map((opt, idx) => (
                                <button key={idx} onClick={() => selectAnswer(idx)}
                                    disabled={answers[current] !== -1}
                                    className={`option-btn ${answers[current] === idx ? 'option-selected' : ''
                                        }`}>
                                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                                        style={{ background: answers[current] === idx ? 'rgba(0,200,83,0.3)' : 'rgba(255,255,255,0.08)' }}>
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                    <span>{opt}</span>
                                </button>
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between mt-6">
                            <button className="btn-ghost" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>
                                ← Previous
                            </button>
                            {current < questions.length - 1 ? (
                                <button className="btn-primary" onClick={() => setCurrent((c) => c + 1)}>
                                    Next →
                                </button>
                            ) : (
                                <button className="btn-primary" onClick={handleSubmit}>
                                    Submit Quiz ✓
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Question Navigator */}
                    <div className="hidden lg:block w-48 flex-shrink-0">
                        <div className="glass-card p-4 sticky top-40">
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Navigation</p>
                            <div className="grid grid-cols-5 gap-1.5">
                                {questions.map((_, i) => (
                                    <button key={i} onClick={() => setCurrent(i)}
                                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${i === current ? 'ring-2 ring-green-500 scale-110' :
                                                answers[i] !== -1 ? 'bg-green-500/20 text-green-400' :
                                                    'bg-white/5 text-gray-500 hover:bg-white/10'
                                            }`}>
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-4 space-y-1.5">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <div className="w-3 h-3 rounded bg-green-500/20" />Answered
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <div className="w-3 h-3 rounded bg-white/5" />Unanswered
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
