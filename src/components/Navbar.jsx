"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Bars, 
  Xmark, 
  Person, 
  ArrowRightFromSquare,
  ArrowChevronDown
} from "@gravity-ui/icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDashboardDropdownOpen, setIsDashboardDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Mock authentication status (can be wired to Better Auth later)
  const [user, setUser] = useState({
    name: "Evelyn Reed",
    email: "evelyn@arthub.com",
    role: "artist" // 'user' (buyer), 'artist', 'admin'
  });

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Artworks", href: "/artworks" },
  ];

  // Dynamic Dashboard links based on role
  const getDashboardLinks = (role) => {
    switch (role) {
      case "admin":
        return [
          { name: "Overview", href: "/dashboard/admin" },
          { name: "Manage Users", href: "/dashboard/admin/users" },
          { name: "Manage Artworks", href: "/dashboard/admin/artworks" },
        ];
      case "artist":
        return [
          { name: "Overview", href: "/dashboard/artist" },
          { name: "My Gallery", href: "/dashboard/artist/gallery" },
          { name: "Upload Artwork", href: "/dashboard/artist/upload" },
        ];
      case "user":
      default:
        return [
          { name: "Overview", href: "/dashboard/user" },
          { name: "My Orders", href: "/dashboard/user/orders" },
          { name: "Wishlist", href: "/dashboard/user/wishlist" },
        ];
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsProfileOpen(false);
    setIsDashboardDropdownOpen(false);
  };

  const cycleRole = () => {
    if (!user) {
      setUser({ name: "Evelyn Reed", email: "evelyn@arthub.com", role: "user" });
    } else if (user.role === "user") {
      setUser({ ...user, role: "artist" });
    } else if (user.role === "artist") {
      setUser({ ...user, role: "admin" });
    } else {
      setUser(null);
    }
    setIsDashboardDropdownOpen(false);
  };

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  return (
    <nav className="w-full bg-[#F7F4EF] border-b border-[#D6CFC4] sticky top-0 z-50 transition-colors duration-200">
      {/* Dev Role Switcher Badge */}
      <div className="bg-[#EDE9E1]/50 border-b border-[#D6CFC4] px-4 py-1 text-center text-xs text-[#6B6560] flex justify-between items-center sm:px-6 lg:px-8">
        <span className="font-['DM_Mono'] text-[11px]">ArtHub Dev Preview</span>
        <button 
          onClick={cycleRole} 
          className="text-[#C2693F] hover:text-[#A3522E] font-medium underline transition-colors cursor-pointer"
        >
          {user ? `Role: ${user.role} (Click to switch)` : "Status: Logged Out (Click to log in)"}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo & Links */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="font-['Cormorant_Garamond'] text-2xl font-bold tracking-wide text-[#1E1E1E] hover:opacity-90 transition-opacity mr-12"
            >
              ArtHub
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative inline-flex items-center px-1 pt-1 text-[15px] font-['DM_Sans'] font-medium transition-colors duration-200 h-20 ${
                      active 
                        ? "text-[#C2693F]" 
                        : "text-[#6B6560] hover:text-[#1E1E1E]"
                    }`}
                  >
                    {link.name}
                    {active && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C2693F] transition-all duration-200" />
                    )}
                  </Link>
                );
              })}

              {/* Dynamic Dashboard Dropdown in main links */}
              {user && (
                <div className="relative inline-flex items-center">
                  <button
                    onClick={() => setIsDashboardDropdownOpen(!isDashboardDropdownOpen)}
                    onMouseEnter={() => setIsDashboardDropdownOpen(true)}
                    className={`relative inline-flex items-center gap-1 px-1 pt-1 text-[15px] font-['DM_Sans'] font-medium transition-colors duration-200 h-20 focus:outline-none cursor-pointer ${
                      pathname?.startsWith("/dashboard") 
                        ? "text-[#C2693F]" 
                        : "text-[#6B6560] hover:text-[#1E1E1E]"
                    }`}
                  >
                    <span>Dashboard</span>
                    <ArrowChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDashboardDropdownOpen ? "rotate-180" : ""}`} />
                    {pathname?.startsWith("/dashboard") && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C2693F]" />
                    )}
                  </button>

                  {/* Submenu on Hover/Click */}
                  {isDashboardDropdownOpen && (
                    <div 
                      onMouseLeave={() => setIsDashboardDropdownOpen(false)}
                      className="absolute left-0 top-20 w-48 bg-[#F7F4EF] border border-[#D6CFC4] rounded-[8px] shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    >
                      {getDashboardLinks(user.role).map((subLink) => (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          onClick={() => setIsDashboardDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm font-['DM_Sans'] transition-colors ${
                            pathname === subLink.href
                              ? "text-[#C2693F] bg-[#EDE9E1]/55"
                              : "text-[#6B6560] hover:text-[#1E1E1E] hover:bg-[#EDE9E1]"
                          }`}
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Tools / Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-[#EDE9E1] border border-transparent hover:border-[#D6CFC4] transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-[#EDE9E1] border border-[#D6CFC4] flex items-center justify-center text-[#6B6560]">
                    <Person className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-[#1E1E1E] font-['DM_Sans']">
                    {user.name}
                  </span>
                  <ArrowChevronDown className="w-4 h-4 text-[#6B6560]" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#F7F4EF] border border-[#D6CFC4] rounded-[8px] shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-[#D6CFC4] text-left">
                      <span className="block text-xs font-semibold text-[#6B6560] uppercase tracking-wider font-['DM_Mono']">
                        {user.role} Account
                      </span>
                    </div>

                    <Link
                      href={
                        user.role === "admin" 
                          ? "/dashboard/admin" 
                          : user.role === "artist" 
                            ? "/dashboard/artist" 
                            : "/dashboard/user"
                      }
                      className="block px-4 py-2 text-sm text-[#6B6560] hover:text-[#1E1E1E] hover:bg-[#EDE9E1] transition-colors font-['DM_Sans']"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Dashboard Home
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-[#B94A3A] hover:bg-[#B94A3A]/5 border-t border-[#D6CFC4] mt-1.5 flex items-center gap-2 transition-colors font-['DM_Sans'] cursor-pointer"
                    >
                      <ArrowRightFromSquare className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="px-4 py-2 text-[14px] font-['DM_Sans'] font-medium text-[#1E1E1E] hover:text-[#C2693F] transition-colors duration-200"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="h-10 px-5 inline-flex items-center justify-center bg-[#C2693F] text-[#F7F4EF] text-[14px] font-['DM_Sans'] font-medium rounded-[6px] hover:bg-[#A3522E] transition-colors duration-200"
                >
                  Join ArtHub
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-[#6B6560] hover:text-[#1E1E1E] focus:outline-none transition-colors"
            >
              {isOpen ? <Xmark className="w-6 h-6" /> : <Bars className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-[#D6CFC4] bg-[#F7F4EF] animate-in slide-in-from-top duration-200">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium font-['DM_Sans'] ${
                    active 
                      ? "text-[#C2693F] bg-[#EDE9E1]" 
                      : "text-[#6B6560] hover:text-[#1E1E1E] hover:bg-[#EDE9E1]"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}

            {user ? (
              <div className="pt-4 border-t border-[#D6CFC4] mt-4">
                <div className="flex items-center px-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[#EDE9E1] border border-[#D6CFC4] flex items-center justify-center text-[#6B6560]">
                    <Person className="w-5 h-5" />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-semibold text-[#1E1E1E] font-['DM_Sans']">{user.name}</div>
                    <div className="text-xs text-[#6B6560] font-['DM_Sans'] uppercase tracking-wider font-['DM_Mono']">{user.role}</div>
                  </div>
                </div>
                
                {/* Dynamic Mobile Dashboard Links */}
                <div className="pl-3 border-l border-[#D6CFC4] my-2 space-y-1">
                  <span className="block text-[11px] uppercase tracking-wider font-['DM_Mono'] text-[#6B6560] mb-2">Dashboard Actions</span>
                  {getDashboardLinks(user.role).map((subLink) => (
                    <Link
                      key={subLink.href}
                      href={subLink.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-1.5 text-sm font-medium font-['DM_Sans'] ${
                        pathname === subLink.href ? "text-[#C2693F]" : "text-[#6B6560]"
                      }`}
                    >
                      • {subLink.name}
                    </Link>
                  ))}
                </div>
                
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-[#B94A3A] hover:bg-[#B94A3A]/5 font-['DM_Sans'] mt-3"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-[#D6CFC4] mt-4 px-3 space-y-3">
                <Link
                  href="/login"
                  className="block w-full text-center py-2 text-base font-medium text-[#1E1E1E] hover:text-[#C2693F] font-['DM_Sans']"
                  onClick={() => setIsOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="block w-full text-center py-2.5 bg-[#C2693F] text-[#F7F4EF] text-base font-medium rounded-[6px] hover:bg-[#A3522E] font-['DM_Sans'] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Join ArtHub
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
