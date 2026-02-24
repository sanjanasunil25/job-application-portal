"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        router.push("/dashboard/admin");
      } 
      else if (res.data.role === "recruiter") {
        router.push("/dashboard/recruiter");
      } 
      else {
        router.push("/dashboard/user");
      }

    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">

      <Navbar />

      <div className="flex items-center justify-center px-6 py-20">
        <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-10 w-full max-w-md">

          <h2 className="text-3xl font-bold text-center mb-8">
            Welcome Back
          </h2>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <input
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-3 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-3 mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

        </div>
      </div>
    </main>
  );
}