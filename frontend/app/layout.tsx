export const metadata = {
  title: "Job Portal",
  description: "Find and apply to jobs easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}