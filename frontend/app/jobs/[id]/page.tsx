"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "../../components/Navbar";
import AuthGuard from "../../components/AuthGuard";
import { motion } from "framer-motion";
import { FiMapPin, FiDollarSign, FiBriefcase } from "react-icons/fi";

type Job = {
  _id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
};

export default function JobDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  const API = "https://job-application-portal-2zud.onrender.com";

  useEffect(() => {
    if (!id) return;

    axios
      .get(`${API}/api/jobs/${id}`)
      .then((res) => setJob(res.data))
      .catch(() => console.log("Failed to load job"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleApply = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    alert("Application submitted successfully!");
  };

  return (
    <AuthGuard>
      <main className="min-h-screen">
        <Navbar />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto px-6 pt-28 pb-16"
        >
          {loading && (
            <div className="text-center text-gray-500 text-lg">
              Loading job...
            </div>
          )}

          {!loading && !job && (
            <div className="text-center text-gray-700 text-lg">
              Job not found
            </div>
          )}

          {job && (
            <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-10">

              <h1 className="text-4xl font-extrabold mb-3">
                {job.title}
              </h1>

              <p className="text-indigo-600 font-semibold text-lg mb-8">
                {job.company}
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <span className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full">
                  <FiMapPin />
                  {job.location}
                </span>

                <span className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                  <FiDollarSign />
                  {job.salary}
                </span>

                <span className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full">
                  <FiBriefcase />
                  Full Time
                </span>
              </div>

              <div className="text-gray-700 leading-relaxed">
                <h2 className="text-2xl font-bold mb-3">Job Description</h2>
                <p>{job.description}</p>
              </div>

              <button
                onClick={handleApply}
                className="mt-12 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:opacity-90 transition"
              >
                Apply Now
              </button>
            </div>
          )}
        </motion.div>
      </main>
    </AuthGuard>
  );
}