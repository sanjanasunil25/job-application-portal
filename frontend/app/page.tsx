"use client";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      <Navbar />

      {/* HERO */}
      <section className="min-h-[85vh] flex items-center justify-center px-6 pt-28">
        <div className="text-center max-w-3xl">

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Discover Your Dream Career 🚀
          </h1>

          <p className="text-gray-600 text-lg mb-10">
            Find jobs, apply instantly, and track your applications in one powerful platform built for modern professionals.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/jobs"
              className="px-8 py-4 bg-indigo-600 text-white rounded-xl shadow-lg hover:scale-105 transition"
            >
              Browse Jobs
            </Link>

            <Link
              href="/register"
              className="px-8 py-4 border border-gray-300 rounded-xl hover:bg-white transition"
            >
              Get Started
            </Link>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">

        <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
          <h3 className="text-xl font-semibold mb-3">Smart Job Search</h3>
          <p className="text-gray-600 text-sm">
            Filter jobs by role, company, and location instantly.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
          <h3 className="text-xl font-semibold mb-3">Easy Applications</h3>
          <p className="text-gray-600 text-sm">
            Apply to jobs with one click and track status live.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
          <h3 className="text-xl font-semibold mb-3">Recruiter Tools</h3>
          <p className="text-gray-600 text-sm">
            Post jobs, manage applicants, and hire faster.
          </p>
        </div>

      </section>

      <Footer />

    </main>
  );
}