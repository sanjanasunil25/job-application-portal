"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: string;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (!token) {
      router.push("/login");
      return;
    }

    if (role && role !== userRole) {
      router.push("/");
    }
  }, [router, role]);

  return <>{children}</>;
}