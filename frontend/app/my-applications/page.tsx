"use client";

import { useEffect, useState } from "react";

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    fetch("https://job-portal-backend.onrender.com/api/applications/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setApplications(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>

      {applications.length === 0 ? (
        <p>No applications found</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h2 className="font-semibold">{app.job?.title}</h2>
              <p>Status: {app.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}