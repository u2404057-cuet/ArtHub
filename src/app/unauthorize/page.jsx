"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function UnauthorizedPage() {
  const { data: session } = useSession();
  const user = session?.user;

  // Determine correct dashboard path based on role
  const getDashboardHref = () => {
    if (!user) return "/login";
    const role = user.role || "buyer";
    if (role === "admin") return "/dashboard/admin";
    if (role === "artist") return "/dashboard/artist";
    return "/dashboard/user";
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EF]">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-md w-full bg-[#EDE9E1] border border-[#D6CFC4] rounded-[12px] p-8 text-center shadow-[0_4px_24px_rgba(30,30,30,0.06)] font-['DM_Sans']">
          
          {/* Lock/Warning Shield Icon */}
          <div className="mx-auto w-16 h-16 bg-[#B94A3A]/10 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-[#B94A3A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#1E1E1E] mb-3">
            Access Restricted
          </h1>

          {/* Subtext info */}
          <p className="text-sm text-[#6B6560] leading-relaxed mb-8">
            You do not have authorization to view this area of the ArtHub workspace. Please use your correct account privileges.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            {user ? (
              <Link
                href={getDashboardHref()}
                className="w-full h-11 inline-flex items-center justify-center bg-[#C2693F] text-[#F7F4EF] text-sm font-semibold rounded-[6px] hover:bg-[#A3522E] transition-colors duration-200"
              >
                Go to My Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="w-full h-11 inline-flex items-center justify-center bg-[#C2693F] text-[#F7F4EF] text-sm font-semibold rounded-[6px] hover:bg-[#A3522E] transition-colors duration-200"
              >
                Log In
              </Link>
            )}
            
            <Link
              href="/"
              className="w-full h-11 inline-flex items-center justify-center border border-[#D6CFC4] bg-transparent text-[#1E1E1E] text-sm font-medium rounded-[6px] hover:bg-[#F7F4EF] hover:border-[#1E1E1E] transition-colors duration-200"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
