import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
    { to: '/dashboard', label: 'Dashboard', icon: '⊞' },
    { to: '/quiz', label: 'Practice', icon: '✏️' },
    { to: '/analytics', label: 'Analytics', icon: '📊' },
    { to: '/history', label: 'History', icon: '📋' },
];

export default function Navbar() {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]"
            style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(20px)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/dashboard" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-black font-black text-sm"
                            style={{ background: 'linear-gradient(135deg,#00C853,#00E676)' }}>G</div>
                        <span className="font-extrabold text-lg tracking-tight">
                            <span style={{ color: '#00C853' }}>G</span>Prep
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <Link key={link.to} to={link.to}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${location.pathname === link.to
                                        ? 'text-green-500 bg-green-500/10'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}>
                                <span>{link.icon}</span>{link.label}
                            </Link>
                        ))}
                        {isAdmin && (
                            <Link to="/admin"
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${location.pathname === '/admin'
                                        ? 'text-green-500 bg-green-500/10'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}>
                                🛡️ Admin
                            </Link>
                        )}
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-black text-xs font-bold"
                                style={{ background: 'linear-gradient(135deg,#00C853,#00E676)' }}>
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="hidden lg:block">
                                <p className="text-sm font-medium text-white leading-none">{user?.name}</p>
                                <p className="text-xs text-gray-500 mt-0.5 capitalize">{user?.role}</p>
                            </div>
                        </div>
                        <button onClick={handleLogout}
                            className="btn-ghost text-sm px-3 py-1.5">
                            Logout
                        </button>
                        {/* Mobile menu toggle */}
                        <button className="md:hidden p-2 text-gray-400" onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden py-3 border-t border-white/[0.06] animate-fade-in">
                        {NAV_LINKS.map((link) => (
                            <Link key={link.to} to={link.to}
                                onClick={() => setMenuOpen(false)}
                                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${location.pathname === link.to ? 'text-green-500' : 'text-gray-400'
                                    }`}>
                                {link.icon} {link.label}
                            </Link>
                        ))}
                        {isAdmin && (
                            <Link to="/admin" onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-400">
                                🛡️ Admin
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
