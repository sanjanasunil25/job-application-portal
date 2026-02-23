"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registration successful! Please login.");
      router.push("/login");

    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-black dark:via-zinc-900 dark:to-black">

      <Navbar />

      <div className="flex items-center justify-center px-6 py-20">
        <div className="bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/40 dark:border-zinc-800 rounded-3xl shadow-2xl p-10 w-full max-w-md">

          <h2 className="text-3xl font-bold text-center mb-8">
            Create Account
          </h2>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <input
            placeholder="Full name"
            className="w-full border rounded-lg px-4 py-3 mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-3 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-3 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ROLE SELECT */}
          <select
            className="w-full border rounded-lg px-4 py-3 mb-6"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="recruiter">Recruiter</option>
            <option value="admin">Admin</option>
          </select>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

        </div>
      </div>
    </main>
  );
}