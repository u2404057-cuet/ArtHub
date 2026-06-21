import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F4EF] animate-fade-in">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center max-w-7xl w-full mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-md mx-auto space-y-6 animate-scale-up">
          {/* Custom SVG Empty Exhibit Frame Illustration */}
          <div className="flex justify-center">
            <div className="relative p-6 bg-[#EDE9E1] rounded-[12px] border border-[#D6CFC4] shadow-[0_4px_20px_rgba(30,30,30,0.05)]">
              <svg
                className="w-32 h-32 text-[#6B6560]/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1" />
                <path d="M12 8v4m0 4h.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 16l-4-4a2 2 0 00-3 0l-5 5" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="font-['Cormorant_Garamond'] text-4xl font-bold text-[#1E1E1E]">Page Not Found</h1>
            <p className="font-['DM_Sans'] text-sm text-[#6B6560] leading-relaxed">
              The exhibition room you are looking for does not exist. The canvas is blank, or the artwork has been moved.
            </p>
          </div>
          
          <div>
            <Link
              href="/"
              className="h-10 px-6 inline-flex items-center justify-center bg-[#C2693F] text-[#F7F4EF] rounded-[6px] font-['DM_Sans'] font-medium hover:bg-[#A3522E] transition-colors cursor-pointer shadow-sm hover:shadow"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
