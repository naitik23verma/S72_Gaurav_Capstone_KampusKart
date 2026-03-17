import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const imageUrl = '/login-side.jpg';

const RightPanel: React.FC = () => (
  <div className="hidden md:flex flex-1 items-center justify-center bg-gray-100">
    <img
      src={imageUrl}
      alt="Campus"
      className="object-cover w-full h-full"
      onError={(e) => { e.currentTarget.style.display = 'none'; }}
    />
  </div>
);

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (emailError && validateEmail(val)) {
      setEmailError('');
    }
  };

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) { setEmailError('Please enter a valid email address'); return; }
    try {
      setError('');
      setLoading(true);
      await login(email, password, remember);
      navigate('/home');
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col font-sans bg-white overflow-hidden">
      <div className="flex flex-1 min-h-0">
        {/* Left: form */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-4 sm:px-6 md:px-8 py-4 bg-white overflow-y-auto">
        <div className="w-full max-w-sm">

          {/* Logo */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              <img src="/Logo.png" alt="KampusKart Logo" className="h-8 w-8 sm:h-10 sm:w-10 object-contain" />
              <span className="text-lg sm:text-xl font-extrabold text-black tracking-tight">KampusKart</span>
            </Link>
          </div>

          <h2 className="mb-1 text-xl sm:text-2xl font-extrabold text-black text-center">Welcome back</h2>
          <p className="text-xs sm:text-sm text-gray-500 text-center mb-4 sm:mb-6">Sign in to your account</p>

          {/* Error */}
          {error && (
            <div className="mb-3 rounded-lg bg-red-50 border-2 border-red-200 p-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                className={`w-full px-3 py-2.5 border-2 ${emailError ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-900 text-sm placeholder:text-gray-400 transition-colors duration-200 min-h-touch`}
                placeholder="you@example.com"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
              />
              {emailError && <p className="mt-1 text-xs text-red-500">{emailError}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="w-full px-3 py-2.5 pr-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-900 text-sm placeholder:text-gray-400 transition-colors duration-200 min-h-touch"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200 bg-transparent p-2 border-0 min-h-touch min-w-touch"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Forgot password + Remember me row */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#00C6A7] focus:ring-[#00C6A7]"
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-xs text-[#F05A25] hover:underline font-medium">Forgot password?</Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !!emailError}
              className={`w-full py-2.5 px-4 rounded-lg text-sm font-bold text-white bg-[#181818] hover:bg-[#00C6A7] active:bg-[#181818] transition-colors duration-200 min-h-touch ${(loading || !!emailError) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-gray-400 font-medium">or continue with</span>
              </div>
            </div>

            {/* Google */}
            <button
              type="button"
              onClick={() => loginWithGoogle()}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50 active:bg-white transition-colors duration-200 min-h-touch"
            >
              <img src="/google-icon.svg" alt="Google" className="w-4 h-4 sm:w-5 sm:h-5" />
              Sign in with Google
            </button>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#F05A25] font-semibold hover:underline">Sign up</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right: image */}
      <RightPanel />
      </div>
    </div>
  );
};

export default Login;
