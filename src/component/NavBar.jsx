import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import logo from "../assets/logo.svg";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-neutral shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl gap-2">
          <img src={logo} alt="CodersHub Logo" className="w-8 h-8" />
          CodersHub
        </Link>
      </div>
      {user && (
        <div className="hidden md:flex items-center px-5 py-2.5 rounded-full bg-neutral/80 backdrop-blur-md shadow-md hover:shadow-lg hover:bg-neutral/90 transition-all duration-300">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-base-content/50 font-medium leading-none tracking-wide">
              Hello
            </span>
            <span className="text-sm font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight">
              {user.firstName}
              {user.lastName && ` ${user.lastName}`}
            </span>
          </div>
        </div>
      )}
      {user && (
        <div className="flex gap-2">
          <div className="dropdown dropdown-end mx-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img alt="User Photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
