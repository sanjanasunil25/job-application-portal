const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getJobs() {
  const res = await fetch(`${API}/jobs`);
  return res.json();
}