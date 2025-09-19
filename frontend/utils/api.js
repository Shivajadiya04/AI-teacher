// frontend/src/utils/api.js
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const authHeaders = (isFormData = false) => {
  const token = localStorage.getItem('token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  if (!isFormData) headers['Content-Type'] = 'application/json';
  return headers;
};

export async function apiGet(path) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'GET',
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  } catch (err) {
    console.error('apiGet error:', err);
    throw err;
  }
}

export async function apiPost(path, body, extraOptions = {}) {
  try {
    const isFormData = body instanceof FormData;
    const options = {
      method: 'POST',
      headers: authHeaders(isFormData),
      body: isFormData ? body : JSON.stringify(body),
      ...extraOptions,
    };
    if (isFormData && options.headers['Content-Type']) delete options.headers['Content-Type'];

    const res = await fetch(`${API_BASE}${path}`, options);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  } catch (err) {
    console.error('apiPost error:', err);
    throw err;
  }
}

export async function apiPatch(path, body, extraOptions = {}) {
  try {
    const isFormData = body instanceof FormData;
    const options = {
      method: 'PATCH',
      headers: authHeaders(isFormData),
      body: isFormData ? body : JSON.stringify(body),
      ...extraOptions,
    };
    if (isFormData && options.headers['Content-Type']) delete options.headers['Content-Type'];

    const res = await fetch(`${API_BASE}${path}`, options);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  } catch (err) {
    console.error('apiPatch error:', err);
    throw err;
  }
}
