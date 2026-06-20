"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { Bars, Xmark } from "@gravity-ui/icons";

// Import divided components
import Overview from "./components/Overview";
import ManageUser from "./components/ManageUser";
import ManageArt from "./components/ManageArt";
import AllTransaction from "./components/AllTransaction";

export default function AdminDashboardPage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // Active tab state
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    {
      id: "overview",
      name: "Analytics Overview",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
        </svg>
      ),
    },
    {
      id: "manage-users",
      name: "Manage Users",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.978 11.978 0 0112 20.25a11.98 11.98 0 01-3-1.013v-.109m0 .109A9.38 9.38 0 0112 19.5a9.38 9.38 0 012.625.372M9 19.128v-.003c0-1.113.285-2.16.786-3.07M9 19.128v.109A12.042 12.042 0 015.625 18 4.125 4.125 0 001.5 20.493a9.34 9.34 0 004.125.757 9.38 9.38 0 002.625-.372" />
        </svg>
      ),
    },
    {
      id: "manage-artworks",
      name: "Manage Artworks",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 00.75 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
    },
    {
      id: "transactions",
      name: "View Transactions",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.22.11a3 3 0 003.818-4.364L12 10.5m-3-1.636l.22-.11a3 3 0 003.818-4.364L12 3m0 0v18" />
        </svg>
      ),
    },
  ];

  // Render components dynamically
  const renderActiveComponent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "manage-users":
        return <ManageUser />;
      case "manage-artworks":
        return <ManageArt />;
      case "transactions":
        return <AllTransaction />;
      default:
        return <Overview />;
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-[#F7F4EF]">
        <div className="w-8 h-8 border-2 border-t-transparent border-[#C2693F] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row bg-[#F7F4EF]">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-4 bg-[#EDE9E1] border-b border-[#D6CFC4]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D6CFC4] overflow-hidden relative">
            {user?.image ? (
              <Image src={user.image} alt={user.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-xs text-[#1E1E1E]">
                {user?.name ? user.name[0] : "A"}
              </div>
            )}
          </div>
          <div>
            <h1 className="font-['DM_Sans'] text-sm font-semibold text-[#1E1E1E] leading-none">{user?.name || "Admin"}</h1>
            <span className="text-[11px] text-[#4A6B5D] font-semibold tracking-wider uppercase font-['DM_Mono'] mt-0.5 block">
              Control Panel
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-[#6B6560] hover:text-[#1E1E1E] transition-colors cursor-pointer"
        >
          <Bars className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#EDE9E1] border-r border-[#D6CFC4] py-8 px-4 justify-between select-none">
        <div className="space-y-6">
          <div className="px-3">
            <span className="text-[11px] font-semibold text-[#C2693F] tracking-widest uppercase font-['DM_Mono'] block">
              Administration
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#1E1E1E] mt-1">
              Admin Console
            </h2>
          </div>

          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-[6px] text-sm font-medium font-['DM_Sans'] transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-[#C2693F] text-[#F7F4EF] shadow-[0_2px_8px_rgba(194,105,63,0.15)]"
                      : "text-[#6B6560] hover:text-[#1E1E1E] hover:bg-[#F7F4EF]/70"
                  }`}
                >
                  <span className={active ? "text-[#F7F4EF]" : "text-[#C2693F]"}>{item.icon}</span>
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card */}
        {user && (
          <div className="p-3 border-t border-[#D6CFC4] pt-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D6CFC4] overflow-hidden relative border border-[#D6CFC4]">
              {user.image ? (
                <Image src={user.image} alt={user.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-sm text-[#1E1E1E]">
                  {user.name ? user.name[0] : "A"}
                </div>
              )}
            </div>
            <div className="overflow-hidden">
              <p className="font-['DM_Sans'] text-sm font-semibold text-[#1E1E1E] truncate leading-none">{user.name}</p>
              <p className="font-['DM_Sans'] text-xs text-[#6B6560] truncate mt-1">{user.email}</p>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-[#1E1E1E]/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative flex flex-col w-72 max-w-xs bg-[#EDE9E1] h-full shadow-2xl p-6 justify-between z-10 animate-in slide-in-from-left duration-300">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#D6CFC4]">
                <div>
                  <span className="text-[10px] font-semibold text-[#C2693F] tracking-widest uppercase font-['DM_Mono'] block">
                    Administration
                  </span>
                  <h2 className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#1E1E1E]">
                    Admin Console
                  </h2>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 rounded-md text-[#6B6560] hover:text-[#1E1E1E] transition-colors cursor-pointer"
                >
                  <Xmark className="w-6 h-6" />
                </button>
              </div>

              <nav className="space-y-1.5">
                {menuItems.map((item) => {
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-[6px] text-sm font-medium font-['DM_Sans'] transition-all duration-200 cursor-pointer ${
                        active
                          ? "bg-[#C2693F] text-[#F7F4EF] shadow-[0_2px_8px_rgba(194,105,63,0.15)]"
                          : "text-[#6B6560] hover:text-[#1E1E1E] hover:bg-[#F7F4EF]/70"
                      }`}
                    >
                      <span className={active ? "text-[#F7F4EF]" : "text-[#C2693F]"}>{item.icon}</span>
                      {item.name}
                    </button>
                  );
                })}
              </nav>
            </div>

            {user && (
              <div className="p-3 border-t border-[#D6CFC4] pt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D6CFC4] overflow-hidden relative">
                  {user.image ? (
                    <Image src={user.image} alt={user.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-sm text-[#1E1E1E]">
                      {user.name ? user.name[0] : "A"}
                    </div>
                  )}
                </div>
                <div className="overflow-hidden">
                  <p className="font-['DM_Sans'] text-sm font-semibold text-[#1E1E1E] truncate leading-none">{user.name}</p>
                  <p className="font-['DM_Sans'] text-xs text-[#6B6560] truncate mt-1">{user.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl overflow-y-auto">
        {renderActiveComponent()}
      </main>
    </div>
  );
}
