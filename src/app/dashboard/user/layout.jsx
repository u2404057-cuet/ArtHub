import Navbar from "@/components/Navbar";

export const metadata = {
  title: "User Dashboard - ArtHub",
  description: "Manage your purchases, subscription, and user profile.",
};

export default function UserDashboardLayout({ children }) {
  return <div className="min-h-screen bg-[#F7F4EF]">
    <Navbar></Navbar>
    {children}
    </div>;
}
