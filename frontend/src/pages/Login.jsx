import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, School, User, Lock, Eye, EyeOff } from 'lucide-react';
import useAuthStore from '../store/authStore';
import api from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({
    schoolCode: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', formData);
      setUser(res.data);
      navigate('/');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-dark-bg relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/30 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]"></div>

      <div className="max-w-md w-full glassmorphism p-8 rounded-2xl shadow-2xl z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-xl mb-4 shadow-lg">
            <School size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">LODH School ERP AI</h1>
          <p className="text-slate-400">Welcome back! Please login to your account.</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">School Code</label>
            <div className="relative">
              <School className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                name="schoolCode"
                value={formData.schoolCode}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Enter school code"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email / Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Enter email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-12 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500" />
              <label htmlFor="remember" className="ml-2 text-sm text-slate-400">Remember me</label>
            </div>
            <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-btn flex items-center justify-center gap-2"
          >
            {loading ? 'Logging in...' : <><LogIn size={18} /> Login</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
