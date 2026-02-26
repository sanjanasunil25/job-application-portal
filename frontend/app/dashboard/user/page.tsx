"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import axios from "axios";
import { FiMapPin, FiDollarSign } from "react-icons/fi";
import Footer from "../../components/Footer";

type Job = {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
};

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    axios
      .get(`${API}/api/jobs`)
      .then((res) => setJobs(res.data))
      .catch(() => console.log("Failed to load jobs"))
      .finally(() => setLoading(false));
  }, [API]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-black dark:via-zinc-900 dark:to-black">

      <Navbar />

      {/* ================= HERO ================= */}
      <section className="text-center px-6 pt-24 pb-20">
        <div className="max-w-4xl mx-auto">

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Trusted by professionals worldwide
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            Discover Your Dream Career
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
            Explore top companies, apply instantly, and track your applications in one beautiful platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#jobs"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition"
            >
              Browse Jobs
            </Link>

            <Link
              href="/register"
              className="px-8 py-4 rounded-xl border border-gray-300 dark:border-zinc-700 text-gray-800 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-3 gap-8">

          <FeatureCard
            title="Smart Job Search"
            desc="Find jobs based on skills, salary and location instantly."
          />

          <FeatureCard
            title="One Click Apply"
            desc="Apply to multiple companies without repeating details."
          />

          <FeatureCard
            title="Career Growth"
            desc="Track your applications and grow professionally."
          />

        </div>
      </section>

      {/* ================= JOBS ================= */}
      <section id="jobs" className="max-w-6xl mx-auto px-6 pb-24">

        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Latest Opportunities
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Discover jobs from top companies around the world
          </p>
        </div>

        {loading && (
          <p className="text-center text-gray-500">Loading jobs...</p>
        )}

        {!loading && jobs.length === 0 && (
          <p className="text-center text-gray-500">No jobs available</p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>

      </section>
      <Footer />
    </main>
  );
}

/* ================= FEATURE CARD ================= */
function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="
      bg-white/70 dark:bg-zinc-900/60
      backdrop-blur-xl
      border border-white/40 dark:border-zinc-800
      rounded-2xl p-8
      shadow-xl
      hover:shadow-2xl
      hover:-translate-y-1
      transition-all duration-300
      text-center
    ">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {desc}
      </p>
    </div>
  );
}

/* ================= JOB CARD ================= */
function JobCard({ job }: { job: Job }) {
  return (
    <div className="
      group
      bg-white/70 dark:bg-zinc-900/60
      backdrop-blur-xl
      border border-white/40 dark:border-zinc-800
      rounded-2xl p-6
      shadow-xl
      hover:shadow-2xl
      hover:-translate-y-1
      transition-all duration-300
    ">

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {job.title}
      </h3>

      <p className="text-indigo-600 font-medium mb-4">
        {job.company}
      </p>

      <div className="flex flex-wrap gap-3 text-sm mb-6">

        <span className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/40 px-3 py-1 rounded-full">
          <FiMapPin />
          {job.location}
        </span>

        <span className="flex items-center gap-2 bg-green-50 dark:bg-green-900/40 px-3 py-1 rounded-full">
          <FiDollarSign />
          {job.salary}
        </span>

      </div>

      <Link
        href={`/jobs/${job._id}`}
        className="
          block text-center
          bg-gradient-to-r from-indigo-600 to-purple-600
          text-white py-3 rounded-xl
          font-semibold
          shadow-lg
          hover:opacity-90
          transition
        "
      >
        View Details
      </Link>

    </div>
  );
}