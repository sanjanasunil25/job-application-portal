"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import AuthGuard from "../../components/AuthGuard";

export default function RecruiterDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobs, setJobs] = useState<any[]>([]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchMyJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setJobs(res.data);
    } catch (err) {
      console.log("Failed to fetch jobs");
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const createJob = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/jobs",
        {
          title,
          description,
          company,
          location,
          salary,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job created successfully");

      setTitle("");
      setDescription("");
      setCompany("");
      setLocation("");
      setSalary("");

      fetchMyJobs();
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="max-w-5xl mx-auto pt-28 px-6">

          <h1 className="text-3xl font-bold mb-8">
            Recruiter Dashboard
          </h1>

          {/* CREATE JOB FORM */}
          <div className="bg-white p-6 rounded-xl shadow mb-10">
            <h2 className="text-xl font-semibold mb-4">
              Post a Job
            </h2>

            <input
              placeholder="Job Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4"
            />

            <input
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4"
            />

            <input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4"
            />

            <input
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4"
            />

            <textarea
              placeholder="Job Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4"
            />

            <button
              onClick={createJob}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
            >
              Create Job
            </button>
          </div>

          {/* JOB LIST */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Posted Jobs
            </h2>

            {jobs.length === 0 && <p>No jobs found</p>}

            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="p-5 bg-white rounded-xl shadow"
                >
                  <h3 className="font-bold text-lg">
                    {job.title}
                  </h3>
                  <p>{job.company}</p>
                  <p className="text-sm text-gray-500">
                    {job.location}
                  </p>
                  <p className="text-sm text-gray-500">
                    Status: {job.status}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </AuthGuard>
  );
}