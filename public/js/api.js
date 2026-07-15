// API Client - fetch wrappers for all endpoints
const API = {
  async getUsers(search, role) {
    const p = new URLSearchParams();
    if (search) p.set('search', search);
    if (role && role !== 'all') p.set('role', role);
    const res = await fetch(`/api/users?${p}`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  async createUser(data) {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Failed'); }
    return res.json();
  },

  async updateUser(id, data) {
    const res = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update user');
    return res.json();
  },

  async deleteUser(id) {
    const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete user');
    return res.json();
  },

  async getActivities() {
    const res = await fetch('/api/activities');
    if (!res.ok) throw new Error('Failed to fetch activities');
    return res.json();
  },

  async getAnalytics(period) {
    const p = new URLSearchParams();
    if (period) p.set('period', period);
    const res = await fetch(`/api/analytics?${p}`);
    if (!res.ok) throw new Error('Failed to fetch analytics');
    return res.json();
  },
};
