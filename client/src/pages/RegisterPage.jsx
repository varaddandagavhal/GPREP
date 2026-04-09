import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirm) {
            toast.error('Passwords do not match.');
            return;
        }
        if (form.password.length < 6) {
            toast.error('Password must be at least 6 characters.');
            return;
        }
        setLoading(true);
        try {
            const user = await register(form.name, form.email, form.password);
            toast.success(`Account created! Welcome, ${user.name}! 🎉`);
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12"
            style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,200,83,0.12) 0%, transparent 60%)' }}>
            <div className="w-full max-w-md animate-slide-up">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-black font-black text-lg"
                            style={{ background: 'linear-gradient(135deg,#00C853,#00E676)' }}>G</div>
                        <span className="font-extrabold text-2xl"><span style={{ color: '#00C853' }}>G</span>Prep</span>
                    </Link>
                    <h1 className="text-2xl font-black text-white">Create Your Account</h1>
                    <p className="text-gray-500 text-sm mt-1">Start your GATE preparation journey today</p>
                </div>

                <div className="glass-card p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                            <input type="text" required className="input-field" placeholder="Your Name"
                                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                            <input type="email" required className="input-field" placeholder="you@example.com"
                                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                            <input type="password" required className="input-field" placeholder="Min. 6 characters"
                                value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Confirm Password</label>
                            <input type="password" required className="input-field" placeholder="Repeat password"
                                value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
                        </div>
                        <button type="submit" className="btn-primary w-full justify-center py-3 mt-2" disabled={loading}>
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                                    Creating account...
                                </span>
                            ) : 'Create Account →'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-500 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-green-500 font-semibold hover:text-green-400">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
