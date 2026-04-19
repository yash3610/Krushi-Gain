import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../services/authService';
import { useAuth } from '../hooks/useAuth';

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const data = await signupUser(formData);
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex min-h-[85vh] w-full max-w-md items-center px-4 py-14 sm:px-0">
      <div className="w-full rounded-3xl border border-white/20 bg-white/10 p-8 shadow-glass backdrop-blur-xl">
        <h1 className="mb-6 text-3xl font-bold text-white">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-white/20 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-white/20 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-white/20 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-white/20 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-white/20 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none"
          />
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <p className="mt-5 text-sm text-slate-300">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-emerald-200 hover:text-emerald-100">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignupPage;
