'use client';

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Runtime error caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F4EF] animate-fade-in">
      {/* Navbar wrapper */}
      <Navbar />
      
      {/* Error state display block */}
      <main className="flex-grow flex items-center justify-center max-w-7xl w-full mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-md mx-auto space-y-6 animate-scale-up">
          <div className="flex justify-center">
            <div className="p-4 bg-red-50 rounded-[12px] border border-red-200/50 shadow-sm">
              <svg
                className="w-12 h-12 text-[#C2693F]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#1E1E1E]">Something went wrong.</h1>
            <p className="font-['DM_Sans'] text-sm text-[#6B6560]">
              The page failed to load due to a runtime error. Please try reloading.
            </p>
          </div>
          
          <div>
            <button
              onClick={() => reset()}
              className="h-10 px-6 inline-flex items-center justify-center bg-[#C2693F] text-[#F7F4EF] rounded-[6px] font-['DM_Sans'] font-medium hover:bg-[#A3522E] transition-colors cursor-pointer shadow-sm hover:shadow"
            >
              Reload
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
