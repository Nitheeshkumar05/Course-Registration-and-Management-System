import { useEffect, useState } from 'react';
import { getCourses, registerCourse, addCourse, deleteCourse } from '../api';
function AvailableCourses({ user }) {
  const [courses, setCourses] = useState([]); const [selected, setSelected] = useState(''); const [message, setMessage] = useState(''); const [error, setError] = useState(''); const [newCourse, setNewCourse] = useState({ courseId:'', courseName:'', trainer:'', durationInWeeks:6 });
  const admin = user.role === 'ADMIN';
  const load = () => getCourses().then(setCourses).catch(e => setError(e.message));
  useEffect(load, []);
  async function enroll() { setMessage(''); setError(''); try { const m=await registerCourse(selected); setMessage(m); } catch(e){setError(e.message);} }
  async function create(e) { e.preventDefault(); try { await addCourse({...newCourse, durationInWeeks:Number(newCourse.durationInWeeks)}); setNewCourse({courseId:'',courseName:'',trainer:'',durationInWeeks:6}); setMessage('Course added successfully.'); load(); } catch(e){setError(e.message);} }
  async function remove(id) { if(!confirm('Delete this course?')) return; try { await deleteCourse(id); setMessage('Course deleted.'); load(); } catch(e){setError(e.message);} }
  return <div className="content-page"><div className="section-heading"><div><p className="eyebrow">COURSE CATALOG</p><h1>Available courses</h1><p className="muted">Choose from the courses currently offered.</p></div></div>
    {message && <div className="alert success-message">{message}</div>}{error && <div className="alert error-message">{error}</div>}
    {user.role === 'STUDENT' && <div className="enroll-panel"><div><strong>Ready to learn?</strong><span>Select a course and register with your account.</span></div><select value={selected} onChange={e=>setSelected(e.target.value)}><option value="">Choose a course</option>{courses.map(c=><option key={c.courseId} value={c.courseName}>{c.courseName}</option>)}</select><button className="primary-button small" disabled={!selected} onClick={enroll}>Register</button></div>}
    <div className="course-grid">{courses.map(c=><div className="course-card" key={c.courseId}><div className="course-code">{c.courseId}</div><h3>{c.courseName}</h3><p>Trainer · {c.trainer}</p><div className="course-bottom"><span>{c.durationInWeeks} weeks</span>{admin && <button className="text-danger" onClick={()=>remove(c.courseId)}>Delete</button>}</div></div>)}</div>
    {admin && <form className="admin-form" onSubmit={create}><div><p className="eyebrow">ADMIN ONLY</p><h2>Add a course</h2></div><input placeholder="Course ID" value={newCourse.courseId} onChange={e=>setNewCourse({...newCourse,courseId:e.target.value})} required /><input placeholder="Course name" value={newCourse.courseName} onChange={e=>setNewCourse({...newCourse,courseName:e.target.value})} required /><input placeholder="Trainer" value={newCourse.trainer} onChange={e=>setNewCourse({...newCourse,trainer:e.target.value})} required /><input type="number" min="1" placeholder="Weeks" value={newCourse.durationInWeeks} onChange={e=>setNewCourse({...newCourse,durationInWeeks:e.target.value})} required /><button className="primary-button small">Add Course</button></form>}
  </div>;
}
export default AvailableCourses;
