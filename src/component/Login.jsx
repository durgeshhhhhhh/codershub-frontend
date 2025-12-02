import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="card glass w-96 shadow-xl p-6 mx-auto">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            value={email}
            placeholder="Email"
            className="input input-bordered"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            value={password}
            placeholder="Password"
            className="input input-bordered"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary mt-6 w-full" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
