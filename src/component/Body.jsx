import { Outlet } from "react-router";
import NavBar from "./NavBar";

const Body = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Body;
