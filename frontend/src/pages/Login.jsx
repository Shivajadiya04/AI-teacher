// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // NEW
import bgImage from '../assets/charlesdeluvio-rRWiVQzLm7k-unsplash.jpg';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '', agree: false });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate(); // NEW

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.agree) return setMsg('You must agree to the Terms & Conditions');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (data.success) {
         localStorage.setItem('token', data.token); // ✅ Save the JWT
         setMsg('Login successful!');
        navigate('/dashboard'); // ✅ Redirect to protected page
      } else {
        setMsg(data.message || 'Login failed.');
      }
    } catch {
      setMsg('Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 text-white rounded-2xl shadow-lg flex w-[95%] max-w-6xl overflow-hidden">
        {/* Left Panel with Background Image */}
        <div
          className="w-1/2 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <p className="absolute bottom-6 left-6 text-white text-3xl font-bold leading-tight">
            Prepare, Clear, and grab the Job
          </p>
        </div>

        {/* Right Form */}
        <div className="w-1/2 p-12">
          <h2 className="text-3xl font-semibold mb-6">Log in</h2>
          <p className="mb-4 text-sm">
            Don't have an account?{' '}
            <a href="/register" className="text-purple-400 underline">
              Sign up
            </a>
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded bg-gray-700"
              required
            />
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded bg-gray-700"
              required
            />
            <div className="flex items-center text-sm">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="mr-2"
              />
              <label>
                I agree to the{' '}
                <a href="#" className="underline text-purple-400">
                  Terms & Conditions
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 p-3 rounded text-white font-semibold"
            >
              Log in
            </button>
          </form>

          {msg && <p className="mt-4 text-sm text-center text-red-400">{msg}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
