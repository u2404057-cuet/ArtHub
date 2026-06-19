import Navbar from "@/components/Navbar";

// Layout wrapper for authentication routes
export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
