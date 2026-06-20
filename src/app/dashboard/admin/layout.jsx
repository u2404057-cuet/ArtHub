import Navbar from "@/components/Navbar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Dashboard - ArtHub",
  description: "Administrator dashboard to manage users, artworks, and global settings.",
};

export default async function AdminDashboardLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const role = session.user.role || "buyer";
  if (role === "buyer" || role === "user") {
    redirect("/dashboard/user");
  } else if (role === "artist") {
    redirect("/dashboard/artist");
  }

  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      <Navbar />
      {children}
    </div>
  );
}
