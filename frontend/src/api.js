const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('homemeal_token');
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data.message || res.statusText || 'Request failed');
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const authApi = {
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  getMe: () => request('/auth/me'),
};

export const userApi = {
  getProfile: () => request('/users/profile'),
  updateProfile: (body) => request('/users/profile', { method: 'PUT', body: JSON.stringify(body) }),
};

export const mealsApi = {
  getAll: (params) => request('/meals' + (params ? '?' + new URLSearchParams(params).toString() : '')),
  getById: (id) => request(`/meals/${id}`),
  create: (body) => request('/meals', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => request(`/meals/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (id) => request(`/meals/${id}`, { method: 'DELETE' }),
};

export const subscriptionsApi = {
  create: (body) => request('/subscriptions', { method: 'POST', body: JSON.stringify(body) }),
  getMy: () => request('/subscriptions/my'),
  updateStatus: (id, status) => request(`/subscriptions/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  getSubscribers: (mealId) => request(`/subscriptions/meal/${mealId}/subscribers`),
};

export const ordersApi = {
  create: (body) => request('/orders', { method: 'POST', body: JSON.stringify(body) }),
  getMy: () => request('/orders/my'),
  getHomemaker: () => request('/orders/homemaker'),
  updateStatus: (id, delivery_status) =>
    request(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ delivery_status }) }),
};

export const feedbackApi = {
  create: (body) => request('/feedback', { method: 'POST', body: JSON.stringify(body) }),
  getByMeal: (mealId) => request(`/feedback/meal/${mealId}`),
  getMy: () => request('/feedback/my'),
};

export const adminApi = {
  getUsers: () => request('/admin/users'),
  updateUser: (id, body) => request(`/admin/users/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  approveHomemaker: (id) => request(`/admin/users/${id}/approve-homemaker`, { method: 'POST' }),
  getAnalytics: () => request('/admin/analytics'),
  getOrders: () => request('/admin/orders'),
};

export default request;
