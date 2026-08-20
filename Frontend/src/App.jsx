import { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from './api';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AvailableCourses from './pages/AvailableCourses';
import EnrolledStudents from './pages/EnrolledStudents';
import MyCourses from './pages/MyCourses';

function ProtectedRoute({ user, role, children }) {
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser().then(setUser).catch(() => setUser(null)).finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    try { await logout(); } finally { setUser(null); navigate('/login'); }
  }

  if (loading) return <div className="loading-screen">Loading your account...</div>;

  return (
    <div className="app-shell">
      {user && (
        <header className="navbar">
          <Link className="brand" to="/">Course<span>Hub</span></Link>
          <nav>
            <Link to="/available-courses">Courses</Link>
            {user.role === 'STUDENT' && <Link to="/my-courses">My Courses</Link>}
            {user.role === 'ADMIN' && <Link to="/enrolled">Enrollments</Link>}
          </nav>
          <div className="nav-user">
            <div><strong>{user.name}</strong><small>{user.role}</small></div>
            <button className="ghost-button" onClick={handleLogout}>Logout</button>
          </div>
        </header>
      )}

      <main className="page-content">
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login onLogin={setUser} />} />
          <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
          <Route path="/" element={<ProtectedRoute user={user}><Home user={user} /></ProtectedRoute>} />
          <Route path="/available-courses" element={<ProtectedRoute user={user}><AvailableCourses user={user} /></ProtectedRoute>} />
          <Route path="/my-courses" element={<ProtectedRoute user={user} role="STUDENT"><MyCourses /></ProtectedRoute>} />
          <Route path="/enrolled" element={<ProtectedRoute user={user} role="ADMIN"><EnrolledStudents /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
