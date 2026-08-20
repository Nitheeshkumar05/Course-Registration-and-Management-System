import { Link } from 'react-router-dom';
function Home({ user }) {
  const admin = user.role === 'ADMIN';
  return <div className="dashboard">
    <section className="hero-card"><div><p className="eyebrow">{admin ? 'ADMIN DASHBOARD' : 'STUDENT DASHBOARD'}</p><h1>Hello, {user.name.split(' ')[0]}.</h1><p>Manage your course activity from one simple dashboard.</p></div><div className="hero-mark">{admin ? 'A' : 'S'}</div></section>
    <div className="section-heading"><div><p className="eyebrow">QUICK ACCESS</p><h2>What would you like to do?</h2></div></div>
    <div className="feature-grid">
      <Link className="feature-card" to="/available-courses"><span>01</span><h3>Browse Courses</h3><p>Explore the latest courses, trainers and duration.</p></Link>
      {!admin && <Link className="feature-card" to="/my-courses"><span>02</span><h3>My Courses</h3><p>See every course you have registered for.</p></Link>}
      {admin && <Link className="feature-card" to="/enrolled"><span>02</span><h3>View Enrollments</h3><p>Review all student course registrations.</p></Link>}
    </div>
    <div className="info-strip"><strong>Role-based access enabled</strong><span>{admin ? 'You have administrator permissions.' : 'You can browse and register for courses.'}</span></div>
  </div>;
}
export default Home;
