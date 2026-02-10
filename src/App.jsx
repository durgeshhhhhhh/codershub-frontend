import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./component/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("./component/Login"));
const Profile = lazy(() => import("./component/Profile"));
const Feed = lazy(() => import("./component/Feed"));
const Connections = lazy(() => import("./component/Connections"));
const Requests = lazy(() => import("./component/Requests"));
const Premium = lazy(() => import("./component/Premium"));
const Chat = lazy(() => import("./component/Chat"));

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Body />}>
                <Route index element={<Feed />} />
                <Route path="login" element={<Login />} />
                <Route path="profile" element={<Profile />} />
                <Route path="connections" element={<Connections />} />
                <Route path="requests" element={<Requests />} />
                <Route path="premium" element={<Premium />} />
                <Route path="chat/:targetUserId" element={<Chat />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
