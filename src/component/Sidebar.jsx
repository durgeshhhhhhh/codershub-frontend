import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const Sidebar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    {
      to: "/connections",
      label: "Connections",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      to: "/requests",
      label: "Requests",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
    },
    {
      to: "/profile",
      label: "Profile",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      to: "/premium",
      label: "Premium",
      premium: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="w-60 bg-neutral flex flex-col shrink-0 border-r border-white/10 overflow-y-auto">

      {/* Home */}
      <Link
        to="/"
        className={`flex items-center gap-4 px-5 py-3.5 text-sm font-semibold transition-all duration-200 ${
          isActive("/")
            ? "bg-primary/10 text-primary"
            : "text-base-content/70 hover:bg-white/5 hover:text-base-content"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 shrink-0 transition-colors ${isActive("/") ? "text-primary" : "text-base-content/40"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        Home
      </Link>

      {/* Single divider after Home */}
      <div className="border-b border-white/10" />

      {/* Rest of nav items */}
      {user && (
        <nav className="flex-1 flex flex-col py-2">
          {navItems.map((item) => {
            const active = isActive(item.to);
            const premiumStyle = item.premium && !active;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center gap-4 px-5 py-3.5 text-sm font-medium transition-all duration-200 ${
                  active
                    ? item.premium
                      ? "bg-amber-400/10 text-amber-400"
                      : "bg-primary/10 text-primary"
                    : premiumStyle
                    ? "text-amber-400/60 hover:bg-amber-400/8 hover:text-amber-400"
                    : "text-base-content/65 hover:bg-white/5 hover:text-base-content"
                }`}
              >
                <span className={`transition-colors ${
                  active
                    ? item.premium ? "text-amber-400" : "text-primary"
                    : premiumStyle
                    ? "text-amber-400/50 group-hover:text-amber-400"
                    : "text-base-content/35 group-hover:text-base-content"
                }`}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}

      {/* Logout */}
      {user && (
        <div className="border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full group flex items-center gap-4 px-5 py-3.5 text-sm font-medium text-base-content/45 hover:bg-error/10 hover:text-error transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0 text-base-content/30 group-hover:text-error transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;