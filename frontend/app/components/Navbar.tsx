"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    const storedRole = localStorage.getItem("role");
    setRole(storedRole);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const goToDashboard = () => {
    if (role === "admin") router.push("/dashboard/admin");
    else if (role === "recruiter") router.push("/dashboard/recruiter");
    else if (role === "user") router.push("/dashboard/user");
    else router.push("/login");
    closeMenu();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/");
    closeMenu();
  };

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          scrolled
            ? "backdrop-blur-xl bg-white/70 dark:bg-black/60 shadow-md"
            : "bg-transparent"
        }
      `}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="text-xl font-bold text-indigo-600"
          onClick={closeMenu}
        >
          JobPortal
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 dark:text-gray-200 font-medium">

          <Link href="/" className="hover:text-indigo-600 transition">
            Home
          </Link>

          <Link href="/jobs" className="hover:text-indigo-600 transition">
            Jobs
          </Link>

          {role && (
            <button
              onClick={goToDashboard}
              className="hover:text-indigo-600 transition"
            >
              Dashboard
            </button>
          )}

        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-3">

          {!role ? (
            <>
              <Link
                href="/login"
                className="px-5 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:opacity-90 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="px-5 py-2 rounded-lg bg-red-500 text-white hover:opacity-90 transition"
            >
              Logout
            </button>
          )}

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-gray-700 dark:text-white"
        >
          ☰
        </button>

      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 bg-white dark:bg-black border-t border-gray-200 dark:border-zinc-800">

          <div className="flex flex-col gap-4 pt-4 text-gray-700 dark:text-gray-200 font-medium">

            <Link href="/" onClick={closeMenu}>
              Home
            </Link>

            <Link href="/jobs" onClick={closeMenu}>
              Jobs
            </Link>

            {role && (
              <button onClick={goToDashboard} className="text-left">
                Dashboard
              </button>
            )}

            {!role ? (
              <>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="mt-2 px-5 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 text-center"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="px-5 py-2 rounded-lg bg-red-500 text-white"
              >
                Logout
              </button>
            )}

          </div>

        </div>
      )}
    </header>
  );
}