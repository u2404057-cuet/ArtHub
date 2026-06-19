"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#EDE9E1] border-t border-[#D6CFC4] mt-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand/About */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <Link 
              href="/" 
              className="font-['Cormorant_Garamond'] text-2xl font-bold tracking-wide text-[#1E1E1E] hover:opacity-90 transition-opacity"
            >
              ArtHub
            </Link>
            <p className="text-sm text-[#6B6560] font-['DM_Sans'] leading-relaxed max-w-sm">
              A quiet, curated gallery space connecting independent, passionate artists with collectors who appreciate authentic craft.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-[#1E1E1E] uppercase tracking-wider font-['DM_Sans'] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-sm text-[#6B6560] hover:text-[#1E1E1E] font-['DM_Sans'] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-[#6B6560] hover:text-[#1E1E1E] font-['DM_Sans'] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-[#6B6560] hover:text-[#1E1E1E] font-['DM_Sans'] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-[#6B6560] hover:text-[#1E1E1E] font-['DM_Sans'] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Stay Tuned */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-[#1E1E1E] uppercase tracking-wider font-['DM_Sans']">
              Collector Letter
            </h3>
            <p className="text-sm text-[#6B6560] font-['DM_Sans'] leading-relaxed">
              Subscribe to receive updates on new exhibitions and artist spotlights.
            </p>
            <form className="flex max-w-sm" onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing!");
            }}>
              <input
                type="email"
                placeholder="Email address"
                required
                className="w-full px-4 py-2 text-sm bg-[#F7F4EF] border border-[#D6CFC4] rounded-l-[6px] text-[#1E1E1E] focus:outline-none focus:border-[#C2693F] transition-colors font-['DM_Sans'] placeholder:text-[#6B6560]/70"
              />
              <button
                type="submit"
                className="h-10 px-5 bg-[#C2693F] hover:bg-[#A3522E] text-[#F7F4EF] text-sm font-['DM_Sans'] font-medium rounded-r-[6px] transition-colors cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#D6CFC4] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#6B6560] font-['DM_Sans']">
            &copy; {currentYear} ArtHub. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-xs text-[#6B6560] hover:text-[#1E1E1E] font-['DM_Sans'] transition-colors">
              Instagram
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-xs text-[#6B6560] hover:text-[#1E1E1E] font-['DM_Sans'] transition-colors">
              Twitter
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="text-xs text-[#6B6560] hover:text-[#1E1E1E] font-['DM_Sans'] transition-colors">
              Pinterest
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
