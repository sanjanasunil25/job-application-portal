"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function CreateJobPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");

  const handleCreateJob = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/jobs",
        { title, description, company, location, salary },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job created successfully");
      router.push("/dashboard/recruiter");

    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-xl mx-auto pt-28 px-6">
        <h1 className="text-3xl font-bold mb-6">Create Job</h1>

        <input
          placeholder="Job Title"
          className="w-full border p-3 rounded-lg mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          className="w-full border p-3 rounded-lg mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Company"
          className="w-full border p-3 rounded-lg mb-4"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          placeholder="Location"
          className="w-full border p-3 rounded-lg mb-4"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          placeholder="Salary"
          className="w-full border p-3 rounded-lg mb-6"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <button
          onClick={handleCreateJob}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg"
        >
          Create Job
        </button>
      </div>
    </main>
  );
}