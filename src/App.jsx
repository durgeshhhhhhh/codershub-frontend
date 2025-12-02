import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Profile from "./component/Profile";
import Body from "./component/Body";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
