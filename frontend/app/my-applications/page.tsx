"use client";

import Navbar from "../components/Navbar";

export default function MyApplicationsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto pt-28 px-6">
        <h1 className="text-3xl font-bold mb-6">My Applications</h1>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-600">
            Your job applications will appear here.
          </p>
        </div>
      </div>
    </main>
  );
}