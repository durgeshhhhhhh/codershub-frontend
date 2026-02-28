import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.error(error);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {!isLoginRoute && <Header />}
      <div className="flex flex-1 overflow-hidden">
        {!isLoginRoute && <Sidebar />}
        <main className="flex-1 overflow-y-auto bg-base-200 flex items-center justify-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Body;
