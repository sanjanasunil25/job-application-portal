import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Job Portal",
  description: "Modern Job Application Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="transition-colors duration-300">
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}