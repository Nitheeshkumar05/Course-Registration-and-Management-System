const API_BASE_URL = 'http://localhost:8080';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {})
    }
  });

  const text = await response.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!response.ok) throw new Error(typeof data === 'string' ? data : data?.message || `Request failed (${response.status})`);
  return data;
}

export const login = (email, password) => request('/auth/login', {
  method: 'POST', body: JSON.stringify({ email, password })
});

export const register = (name, email, password) => request('/auth/register', {
  method: 'POST', body: JSON.stringify({ name, email, password })
});

export const getCurrentUser = () => request('/auth/me');
export const logout = () => request('/auth/logout', { method: 'POST' });
export const getCourses = () => request('/courses');
export const getEnrolledStudents = () => request('/courses/enrolled');
export const getMyCourses = () => request('/courses/my-courses');

export const registerCourse = (courseName) => {
  const formData = new URLSearchParams({ courseName });
  return request('/courses/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString()
  });
};

export const addCourse = (course) => request('/courses/admin', {
  method: 'POST', body: JSON.stringify(course)
});

export const deleteCourse = (courseId) => request(`/courses/admin/${encodeURIComponent(courseId)}`, {
  method: 'DELETE'
});
