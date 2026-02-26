"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AuthGuard from "../../components/AuthGuard";
import Navbar from "../../components/Navbar";

type Stats = {
  jobs: {
    totalJobs: number;
    openJobs: number;
    closedJobs: number;
  };
  applications: {
    totalApplications: number;
    pendingApplications: number;
    acceptedApplications: number;
    rejectedApplications: number;
  };
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await axios.get(
          `${API}/api/dashboard/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(res.data);
      } catch (err) {
        console.log("Failed to load stats");
      }
    };

    fetchStats();
  }, []);

  return (
    <AuthGuard role="admin">
      <main className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="max-w-6xl mx-auto pt-28 px-6">
          <h1 className="text-3xl font-bold mb-10">
            Admin Dashboard
          </h1>

          {!stats && <p>Loading stats...</p>}

          {stats && (
            <div className="grid md:grid-cols-2 gap-6">

              {/* JOB STATS */}
              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-bold mb-4">Jobs</h2>
                <p>Total Jobs: {stats.jobs.totalJobs}</p>
                <p>Open Jobs: {stats.jobs.openJobs}</p>
                <p>Closed Jobs: {stats.jobs.closedJobs}</p>
              </div>

              {/* APPLICATION STATS */}
              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-bold mb-4">Applications</h2>
                <p>Total: {stats.applications.totalApplications}</p>
                <p>Pending: {stats.applications.pendingApplications}</p>
                <p>Accepted: {stats.applications.acceptedApplications}</p>
                <p>Rejected: {stats.applications.rejectedApplications}</p>
              </div>

            </div>
          )}
        </div>
      </main>
    </AuthGuard>
  );
}