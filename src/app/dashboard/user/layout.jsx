import Navbar from "@/components/Navbar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "User Dashboard - ArtHub",
  description: "Manage your purchases, subscription, and user profile.",
};

export default async function UserDashboardLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const role = session.user.role || "buyer";
  if (role === "artist") {
    redirect("/dashboard/artist");
  } else if (role === "admin") {
    redirect("/dashboard/admin");
  }

  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      <Navbar />
      {children}
    </div>
  );
}
