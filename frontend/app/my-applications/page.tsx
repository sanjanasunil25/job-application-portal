"use client";

import { useEffect, useState } from "react";

type Application = {
  id: number;
  status: string;
  job: {
    title: string;
    location: string;
  };
};

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const API = "https://job-application-portal-2zud.onrender.com";

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API}/api/applications/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await res.json();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>

      {applications.length === 0 ? (
        <p className="text-gray-600">You have not applied to any jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="p-4 bg-white rounded-xl shadow border"
            >
              <h2 className="text-xl font-semibold">{app.job.title}</h2>
              <p className="text-gray-600">{app.job.location}</p>
              <p className="mt-2 font-medium">
                Status: <span className="text-indigo-600">{app.status}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}