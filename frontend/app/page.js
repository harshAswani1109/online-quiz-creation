"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiEye, HiEyeOff } from "react-icons/hi";

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Validate credentials
    if (username === "admin" && password === "admin") {
      localStorage.setItem("role", "admin");
      router.push("/admin/dashboard");
    } else if (username === "user" && password === "user") {
      localStorage.setItem("role", "user");
      router.push("/user/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login Here
        </h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="m-2 p-2 border border-gray-300 rounded w-full"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="m-2 p-2 border border-gray-300 rounded w-full "
          />
          <span
            className="absolute top-3 right-0 m-2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <HiEyeOff /> : <HiEye />}
          </span>
        </div>
        {error && (
          <p className="text-red-500 my-2 w-full text-center font-semibold">
            {error}
          </p>
        )}
        <button
          onClick={handleLogin}
          className="m-2 p-2 bg-blue-500 text-white rounded w-full hover:bg-purple-500"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
