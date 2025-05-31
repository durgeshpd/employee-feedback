import React, { useState } from "react";
import { HiEye, HiEyeOff, HiExclamationCircle } from "react-icons/hi";
import { loginAdmin } from "../utils/api";

function AdminLogin({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginAdmin({ username, password });
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center text-primary mb-6">Admin Login</h2>

          {error && (
            <div className="alert alert-error shadow-lg mb-4 flex items-center gap-2">
              <HiExclamationCircle className="w-6 h-6" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="form-control flex flex-row items-center gap-4">
              <label htmlFor="username" className="w-28 font-semibold text-base">
                Username:
              </label>
              <input
                type="text"
                id="username"
                className="input input-bordered flex-grow"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-control flex flex-row items-center gap-4 relative">
              <label htmlFor="password" className="w-28 font-semibold text-base">
                Password:
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="input input-bordered pr-12 flex-grow"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>

            <button className="btn btn-primary mt-4" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
