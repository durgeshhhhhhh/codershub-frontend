import { useSelector } from "react-redux";
import { Link } from "react-router";
import logo from "../assets/logo.svg";

const Header = () => {
  const user = useSelector((store) => store.user);

  return (
    <>
    <style>{`
      @keyframes nameShimmer {
        0%   { background-position: 0% center; }
        100% { background-position: -200% center; }
      }
      .shimmer-name {
        background: linear-gradient(
          90deg,
          var(--color-base-content) 0%,
          var(--color-primary) 30%,
          var(--color-secondary) 60%,
          var(--color-primary) 80%,
          var(--color-base-content) 100%
        );
        background-size: 200% auto;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: nameShimmer 3s linear infinite;
      }
    `}</style>
    <header className="h-14 bg-neutral border-b border-white/10 flex items-center justify-between px-6 shrink-0 z-10">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
          <img src={logo} alt="CodersHub Logo" className="w-5 h-5" />
        </div>
        <span className="text-base font-black text-primary tracking-wide">CodersHub</span>
      </Link>

      {/* Profile */}
      {user && (
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] tracking-[0.18em] uppercase text-base-content/40 font-semibold leading-none mb-1">
              Hello,
            </p>
            <p className="text-sm font-bold leading-tight shimmer-name">
              {user.firstName}{user.lastName && ` ${user.lastName}`}
            </p>
          </div>
          <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-primary/50 ring-offset-2 ring-offset-neutral shrink-0">
            <img alt="User Photo" src={user.photoUrl} className="w-full h-full object-cover" />
          </div>
        </div>
      )}
    </header>
    </>
  );
};

export default Header;