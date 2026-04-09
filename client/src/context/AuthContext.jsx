import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loginUser, registerUser, getMe } from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('gprep_token'));
    const [loading, setLoading] = useState(true);

    // Load user on mount
    useEffect(() => {
        const initAuth = async () => {
            const savedToken = localStorage.getItem('gprep_token');
            if (savedToken) {
                try {
                    const res = await getMe();
                    setUser(res.data.user);
                } catch {
                    logout();
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email, password) => {
        const res = await loginUser({ email, password });
        const { token: newToken, user: newUser } = res.data;
        localStorage.setItem('gprep_token', newToken);
        localStorage.setItem('gprep_user', JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
        return newUser;
    };

    const register = async (name, email, password) => {
        const res = await registerUser({ name, email, password });
        const { token: newToken, user: newUser } = res.data;
        localStorage.setItem('gprep_token', newToken);
        localStorage.setItem('gprep_user', JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
        return newUser;
    };

    const logout = useCallback(() => {
        localStorage.removeItem('gprep_token');
        localStorage.removeItem('gprep_user');
        setToken(null);
        setUser(null);
    }, []);

    const isAdmin = user?.role === 'admin';

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
