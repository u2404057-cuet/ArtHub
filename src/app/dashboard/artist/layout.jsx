import Navbar from "@/components/Navbar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Artist Dashboard - ArtHub",
  description: "Manage your gallery, uploaded artworks, sales history, and profile.",
};

export default async function ArtistDashboardLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const role = session.user.role || "buyer";
  if (role !== "artist") {
    redirect("/unauthorize");
  }

  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      <Navbar />
      {children}
    </div>
  );
}
