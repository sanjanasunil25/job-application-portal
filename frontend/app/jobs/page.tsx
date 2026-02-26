"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { FiMapPin, FiDollarSign } from "react-icons/fi";

type Job = {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // use environment variable so the frontend can talk to whichever
  // backend URL is configured (localhost during local development,
  // Render URL in production).
  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    axios.get(`${API}/api/jobs`)
      .then(res => setJobs(res.data))
      .catch(() => console.log("Failed to load jobs"))
      .finally(() => setLoading(false));
  }, [API]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-black dark:via-zinc-900 dark:to-black">

      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">
          Explore Jobs
        </h1>

        {loading && <p className="text-center">Loading jobs...</p>}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map(job => (
            <div
              key={job._id}
              className="bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/40 dark:border-zinc-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition"
            >
              <h3 className="text-xl font-bold mb-2">{job.title}</h3>
              <p className="text-indigo-600 font-semibold mb-4">
                {job.company}
              </p>

              <div className="flex flex-wrap gap-3 text-sm mb-4">
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
                className="block text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-xl"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}