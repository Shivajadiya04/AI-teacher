// src/pages/Register.jsx
import React, { useState } from 'react';
import bgImage from '../assets/charlesdeluvio-rRWiVQzLm7k-unsplash.jpg';

const Register = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agree: false,
  });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.agree) return setMsg('You must agree to the Terms & Conditions');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) setMsg('Registration successful!');
      else setMsg(data.message || 'Registration failed.');
    } catch {
      setMsg('Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 text-white rounded-2xl shadow-lg flex w-[95%] max-w-6xl overflow-hidden">
        
        {/* Left Image */}
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
          <h2 className="text-3xl font-semibold mb-6">Create an account</h2>
          <p className="mb-4 text-sm">
            Already have an account? <a href="/" className="text-purple-400 underline">Log in</a>
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
                className="w-1/2 p-3 rounded bg-gray-700"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
                className="w-1/2 p-3 rounded bg-gray-700"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
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
                I agree to the <a href="#" className="underline text-purple-400">Terms & Conditions</a>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 p-3 rounded text-white font-semibold"
            >
              Create account
            </button>
          </form>

          {msg && <p className="mt-4 text-sm text-center text-red-400">{msg}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;
