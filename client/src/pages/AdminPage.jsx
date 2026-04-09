import { useEffect, useState } from 'react';
import { getPlatformStats, getAllUsers, getAdminQuestions, addQuestion, updateQuestion, deleteQuestion } from '../api/adminApi';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

const SUBJECTS = ['Computer Science', 'Mathematics', 'General Aptitude', 'Electronics', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Chemical Engineering'];
const EMPTY_FORM = { subject: 'Computer Science', topic: '', question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '', difficulty: 'Medium', year: '' };

export default function AdminPage() {
    const [tab, setTab] = useState('stats');
    const [stats, setStats] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [subjFilter, setSubjFilter] = useState('');

    const fetchAll = async () => {
        setLoading(true);
        try {
            const [sRes, qRes, uRes] = await Promise.all([
                getPlatformStats(), getAdminQuestions({ limit: 100 }), getAllUsers(),
            ]);
            setStats(sRes.data.data);
            setQuestions(qRes.data.data);
            setUsers(uRes.data.data);
        } catch { toast.error('Failed to load data'); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchAll(); }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        if (form.options.some((o) => !o.trim())) { toast.error('All 4 options are required.'); return; }
        if (!form.topic || !form.question || !form.explanation) { toast.error('Fill in all required fields.'); return; }
        setSaving(true);
        try {
            const payload = { ...form, correctAnswer: parseInt(form.correctAnswer), year: form.year ? parseInt(form.year) : null };
            if (editId) {
                await updateQuestion(editId, payload);
                toast.success('Question updated!');
            } else {
                await addQuestion(payload);
                toast.success('Question added!');
            }
            setShowForm(false); setEditId(null); setForm(EMPTY_FORM);
            fetchAll();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Save failed.');
        } finally { setSaving(false); }
    };

    const handleEdit = (q) => {
        setForm({ subject: q.subject, topic: q.topic, question: q.question, options: q.options, correctAnswer: q.correctAnswer, explanation: q.explanation, difficulty: q.difficulty, year: q.year || '' });
        setEditId(q._id); setShowForm(true); setTab('questions');
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Soft delete this question?')) return;
        try { await deleteQuestion(id); toast.success('Question deleted.'); fetchAll(); }
        catch { toast.error('Delete failed.'); }
    };

    const filteredQ = subjFilter ? questions.filter((q) => q.subject === subjFilter) : questions;

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between mb-6 animate-fade-in">
                    <div>
                        <h1 className="text-3xl font-black text-white flex items-center gap-2">🛡️ Admin Panel</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage questions, users, and platform statistics</p>
                    </div>
                    {tab === 'questions' && !showForm && (
                        <button className="btn-primary" onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY_FORM); }}>
                            + Add Question
                        </button>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-white/[0.06] pb-0">
                    {[['stats', '📊 Stats'], ['questions', '📚 Questions'], ['users', '👥 Users']].map(([t, label]) => (
                        <button key={t} onClick={() => setTab(t)}
                            className={`px-4 py-2.5 text-sm font-semibold transition-all rounded-t-lg -mb-px ${tab === t ? 'text-white border-b-2 border-green-500' : 'text-gray-500 hover:text-white'
                                }`}>{label}</button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" /></div>
                ) : (
                    <>
                        {/* ── Stats Tab ── */}
                        {tab === 'stats' && stats && (
                            <div className="animate-fade-in">
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    {[
                                        { label: 'Users', value: stats.totalUsers, color: '#00C853', icon: '👥' },
                                        { label: 'Questions', value: stats.totalQuestions, color: '#00B0FF', icon: '📚' },
                                        { label: 'Attempts', value: stats.totalAttempts, color: '#FFD740', icon: '🎯' },
                                    ].map((s) => (
                                        <div key={s.label} className="glass-card p-6 text-center">
                                            <div className="text-3xl mb-3">{s.icon}</div>
                                            <div className="text-4xl font-black" style={{ color: s.color }}>{s.value}</div>
                                            <div className="text-gray-500 text-sm mt-1">{s.label}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-white font-bold mb-4">Questions per Subject</h3>
                                    <div className="space-y-3">
                                        {stats.subjectBreakdown.map((s) => {
                                            const pct = stats.totalQuestions > 0 ? (s.count / stats.totalQuestions * 100) : 0;
                                            return (
                                                <div key={s._id}>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="text-gray-400">{s._id}</span>
                                                        <span className="text-green-400 font-bold">{s.count}</span>
                                                    </div>
                                                    <div className="progress-bar">
                                                        <div className="progress-fill" style={{ width: `${pct}%` }} />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── Questions Tab ── */}
                        {tab === 'questions' && (
                            <div className="animate-fade-in">
                                {/* Add/Edit Form */}
                                {showForm && (
                                    <div className="glass-card p-6 mb-6 border-green-500/20">
                                        <h3 className="text-white font-bold mb-5">{editId ? '✏️ Edit Question' : '➕ Add Question'}</h3>
                                        <form onSubmit={handleSave} className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">Subject *</label>
                                                    <select className="input-field" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                                                        {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">Topic *</label>
                                                    <input className="input-field" placeholder="e.g. Data Structures" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} required />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">Difficulty</label>
                                                    <select className="input-field" value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}>
                                                        {['Easy', 'Medium', 'Hard'].map((d) => <option key={d}>{d}</option>)}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">Year (optional)</label>
                                                    <input className="input-field" type="number" placeholder="e.g. 2023" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Question *</label>
                                                <textarea className="input-field resize-none" rows={3} placeholder="Enter the question..." value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-2">Options * (select correct answer)</label>
                                                <div className="space-y-2">
                                                    {form.options.map((opt, i) => (
                                                        <div key={i} className="flex items-center gap-3">
                                                            <button type="button" onClick={() => setForm({ ...form, correctAnswer: i })}
                                                                className={`w-7 h-7 rounded-full text-xs font-bold flex-shrink-0 border-2 transition-all flex items-center justify-center ${form.correctAnswer === i ? 'bg-green-500 border-green-500 text-black' : 'border-white/20 text-gray-600 hover:border-green-500'
                                                                    }`}>{String.fromCharCode(65 + i)}</button>
                                                            <input className="input-field" placeholder={`Option ${String.fromCharCode(65 + i)}`}
                                                                value={opt} onChange={(e) => { const o = [...form.options]; o[i] = e.target.value; setForm({ ...form, options: o }); }} required />
                                                        </div>
                                                    ))}
                                                    <p className="text-xs text-gray-600">Click A/B/C/D to mark correct answer</p>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Explanation *</label>
                                                <textarea className="input-field resize-none" rows={3} placeholder="Explain the correct answer..." value={form.explanation} onChange={(e) => setForm({ ...form, explanation: e.target.value })} required />
                                            </div>
                                            <div className="flex gap-3">
                                                <button type="submit" className="btn-primary" disabled={saving}>
                                                    {saving ? 'Saving...' : editId ? 'Update Question' : 'Add Question'}
                                                </button>
                                                <button type="button" className="btn-ghost" onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {/* Filter + List */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <button onClick={() => setSubjFilter('')} className={`px-3 py-1 rounded-full text-xs font-semibold ${!subjFilter ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/5 text-gray-500 border border-white/[0.08]'}`}>All ({questions.length})</button>
                                    {SUBJECTS.map((s) => {
                                        const cnt = questions.filter((q) => q.subject === s).length;
                                        if (!cnt) return null;
                                        return (
                                            <button key={s} onClick={() => setSubjFilter(s)}
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${subjFilter === s ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/5 text-gray-500 border border-white/[0.08]'}`}>
                                                {s.split(' ')[0]} ({cnt})
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="glass-card overflow-hidden">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-white/[0.06]">
                                                {['Question', 'Subject', 'Topic', 'Diff', 'Actions'].map((h) => (
                                                    <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredQ.map((q) => (
                                                <tr key={q._id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                                    <td className="px-4 py-3 max-w-xs">
                                                        <p className="text-sm text-white leading-snug line-clamp-2">{q.question}</p>
                                                    </td>
                                                    <td className="px-4 py-3 text-xs text-gray-400">{q.subject.split(' ')[0]}</td>
                                                    <td className="px-4 py-3 text-xs text-gray-500">{q.topic}</td>
                                                    <td className="px-4 py-3">
                                                        <span className={`badge badge-${q.difficulty?.toLowerCase()}`}>{q.difficulty}</span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex gap-2">
                                                            <button onClick={() => handleEdit(q)} className="text-blue-400 hover:text-blue-300 text-xs font-medium">Edit</button>
                                                            <button onClick={() => handleDelete(q._id)} className="text-red-400 hover:text-red-300 text-xs font-medium">Delete</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {filteredQ.length === 0 && (
                                        <div className="text-center py-12 text-gray-500">No questions found.</div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ── Users Tab ── */}
                        {tab === 'users' && (
                            <div className="glass-card overflow-hidden animate-fade-in">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/[0.06]">
                                            {['Name', 'Email', 'Role', 'Joined'].map((h) => (
                                                <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase px-5 py-3">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((u) => (
                                            <tr key={u._id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                                <td className="px-5 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-black text-xs font-bold flex-shrink-0"
                                                            style={{ background: 'linear-gradient(135deg,#00C853,#00E676)' }}>
                                                            {u.name?.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="text-sm text-white font-medium">{u.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3 text-sm text-gray-400">{u.email}</td>
                                                <td className="px-5 py-3">
                                                    <span className={`badge ${u.role === 'admin' ? 'badge-hard' : 'badge-easy'}`}>{u.role}</span>
                                                </td>
                                                <td className="px-5 py-3 text-sm text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
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
