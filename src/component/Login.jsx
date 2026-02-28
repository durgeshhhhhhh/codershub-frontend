import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constant";
import logo from "../assets/logo.svg";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLoginForm((value) => !value);
    setEmailId("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setError("");
    setShowPassword(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email: emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong. Please try again.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email: emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      return navigate("/");
    } catch (error) {
      setEmailId("");
      setPassword("");
      setError(error?.response?.data || "Invalid credentials.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "Find Your Match",
      desc: "Discover developers who share your skills and interests",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      title: "Real-time Chat",
      desc: "Connect and collaborate with your matches instantly",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      title: "Go Premium",
      desc: "Unlock exclusive features and boost your visibility",
    },
  ];

  return (
    <div className="flex self-stretch w-full">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
          20%, 40%, 60%, 80% { transform: translateX(8px); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }

        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-24px); }
        }
      `}</style>

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex w-1/2 bg-neutral flex-col justify-between p-12 relative overflow-hidden border-r border-white/10">

        {/* Background decorative orbs */}
        <div className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-60px] left-[-60px] w-72 h-72 rounded-full bg-secondary/15 blur-[90px] pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
            <img src={logo} alt="CodersHub Logo" className="w-6 h-6" />
          </div>
          <span className="text-lg font-black text-primary tracking-wide">CodersHub</span>
        </div>

        {/* Main copy */}
        <div className="flex flex-col gap-10 relative z-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-black text-base-content leading-tight">
              Where Developers
              <span className="block text-primary">Connect &amp; Grow</span>
            </h1>
            <p className="text-base-content/50 text-base leading-relaxed max-w-sm">
              Find your next coding partner, mentor, or collaborator. Build meaningful connections with developers worldwide.
            </p>
          </div>

          {/* Feature list */}
          <div className="flex flex-col gap-5">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0 text-primary">
                  {f.icon}
                </div>
                <div>
                  <p className="font-semibold text-base-content text-sm">{f.title}</p>
                  <p className="text-base-content/45 text-xs mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom badge */}
        <div className="flex items-center gap-2 relative z-10">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-base-content/40 font-medium">Thousands of developers already connected</span>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex items-center justify-center bg-base-200 px-8 py-12">

        {/* Error toast */}
        {error && (
          <div className="toast toast-top toast-center z-50">
            <div className="alert alert-error shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
              <button type="button" className="btn btn-ghost btn-xs" onClick={() => setError("")}>✕</button>
            </div>
          </div>
        )}

        <div className={`w-full max-w-xs flex flex-col gap-4 ${shake ? "animate-shake" : ""}`}>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-base-content mb-2">
            {isLoginForm ? `Log in to CodersHub` : `Create a new account`}
          </h2>

          {/* Form */}
          <form className="flex flex-col gap-3" onSubmit={isLoginForm ? handleLogin : handleSignUp}>

            {/* First & Last name (signup only) */}
            {!isLoginForm && (
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={firstName}
                  placeholder="First name"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-base-100 border border-white/10 text-base-content text-sm placeholder:text-base-content/35 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                />
                <input
                  type="text"
                  value={lastName}
                  placeholder="Last name"
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-base-100 border border-white/10 text-base-content text-sm placeholder:text-base-content/35 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                />
              </div>
            )}

            {/* Email */}
            <input
              type="email"
              value={emailId}
              placeholder="Email address or mobile number"
              required
              onChange={(e) => setEmailId(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-base-100 border border-white/10 text-base-content text-sm placeholder:text-base-content/35 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all duration-200"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Password"
                required
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 pr-12 rounded-2xl bg-base-100 border border-white/10 text-base-content text-sm placeholder:text-base-content/35 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Log in button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-primary text-primary-content font-bold text-base hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/25 flex items-center justify-center gap-2 mt-1"
            >
              {isLoading
                ? <span className="loading loading-spinner loading-sm" />
                : isLoginForm ? "Log in" : "Sign up"}
            </button>
          </form>

          {/* Forgotten password */}
          {isLoginForm && (
            <p className="text-center">
              <button type="button" className="text-sm font-semibold text-base-content/60 hover:text-primary transition-colors duration-200">
                Forgotten password?
              </button>
            </p>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-base-content/30 font-medium">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Create / Sign in toggle as outlined button */}
          <button
            type="button"
            onClick={toggleForm}
            className="w-full py-3.5 rounded-2xl border-2 border-primary text-primary font-bold text-sm hover:bg-primary/8 active:scale-[0.98] transition-all duration-200"
          >
            {isLoginForm ? "Create new account" : "Log in instead"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default Login;