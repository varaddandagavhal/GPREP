import { Link } from 'react-router-dom';

const SUBJECT_META = {
    'Computer Science': { icon: '💻', color: '#00C853' },
    'Mathematics': { icon: '∑', color: '#00B0FF' },
    'General Aptitude': { icon: '🧠', color: '#FF6D00' },
    'Electronics': { icon: '⚡', color: '#D500F9' },
    'Electrical Engineering': { icon: '🔌', color: '#FFD740' },
    'Mechanical Engineering': { icon: '⚙️', color: '#FF5252' },
    'Civil Engineering': { icon: '🏗️', color: '#69F0AE' },
    'Chemical Engineering': { icon: '🧪', color: '#40C4FF' },
};

export default function SubjectCard({ subject, count, easy, medium, hard, avgAccuracy }) {
    const meta = SUBJECT_META[subject] || { icon: '📚', color: '#00C853' };

    return (
        <Link to={`/quiz?subject=${encodeURIComponent(subject)}`}
            className="glass-card p-5 group block hover:scale-[1.02] transition-transform duration-200">
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: `${meta.color}18`, border: `1px solid ${meta.color}30` }}>
                    {meta.icon}
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full"
                    style={{ background: `${meta.color}15`, color: meta.color }}>
                    {count} Q's
                </span>
            </div>

            <h3 className="font-bold text-white text-sm leading-tight mb-1 group-hover:text-green-400 transition-colors">
                {subject}
            </h3>

            {avgAccuracy !== undefined && (
                <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Avg. Accuracy</span>
                        <span style={{ color: meta.color }}>{avgAccuracy.toFixed(1)}%</span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${avgAccuracy}%`, background: `linear-gradient(90deg, ${meta.color}, ${meta.color}99)` }} />
                    </div>
                </div>
            )}

            <div className="flex gap-2 mt-3">
                {easy > 0 && <span className="badge badge-easy">{easy} E</span>}
                {medium > 0 && <span className="badge badge-medium">{medium} M</span>}
                {hard > 0 && <span className="badge badge-hard">{hard} H</span>}
            </div>

            <div className="mt-4 flex items-center gap-1 text-xs font-semibold"
                style={{ color: meta.color }}>
                Start Quiz <span>→</span>
            </div>
        </Link>
    );
}
