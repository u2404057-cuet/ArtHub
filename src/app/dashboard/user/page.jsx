"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { Bars, Xmark } from "@gravity-ui/icons";

// Import subcomponents
import PurchaseHistory from "./components/PurchaseHistory";
import ArtworksBrought from "./components/ArtworksBrought";
import Profile from "./components/Profile";
import Subscription from "./components/Subscription";

export default function UserDashboard() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // Active tab state
  const [activeTab, setActiveTab] = useState("bought-artworks");
  // Mobile sidebar open state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    {
      id: "bought-artworks",
      name: "Bought Artworks",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
    },
    {
      id: "purchase-history",
      name: "Purchase History",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
    {
      id: "profile",
      name: "Profile Management",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    },
    {
      id: "subscription",
      name: "Subscription Tier",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
    },
  ];

  // Render components dynamically
  const renderActiveComponent = () => {
    switch (activeTab) {
      case "bought-artworks":
        return <ArtworksBrought />;
      case "purchase-history":
        return <PurchaseHistory />;
      case "profile":
        return <Profile />;
      case "subscription":
        return <Subscription />;
      default:
        return <ArtworksBrought />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row bg-[#F7F4EF]">
      {/* Mobile Top Bar (Visible on mobile/tablet) */}
      <div className="md:hidden flex items-center justify-between px-4 py-4 bg-[#EDE9E1] border-b border-[#D6CFC4]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D6CFC4] overflow-hidden relative">
            {user?.image ? (
              <Image src={user.image} alt={user.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-xs text-[#1E1E1E]">
                {user?.name ? user.name[0] : "U"}
              </div>
            )}
          </div>
          <div>
            <h1 className="font-['DM_Sans'] text-sm font-semibold text-[#1E1E1E] leading-none">{user?.name || "User Dashboard"}</h1>
            <span className="text-[11px] text-[#C2693F] font-semibold tracking-wider uppercase font-['DM_Mono'] mt-0.5 block">
              {(user?.plan || "Free")} Member
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

      {/* Desktop Sidebar (Hidden on mobile/tablet) */}
      <aside className="hidden md:flex flex-col w-64 bg-[#EDE9E1] border-r border-[#D6CFC4] py-8 px-4 justify-between select-none">
        <div className="space-y-6">
          <div className="px-3">
            <span className="text-[11px] font-semibold text-[#C2693F] tracking-widest uppercase font-['DM_Mono'] block">
              Workspace
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#1E1E1E] mt-1">
              Collector Hub
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
                  {user.name ? user.name[0] : "U"}
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

      {/* Mobile Drawer (Visible when isSidebarOpen is true) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#1E1E1E]/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative flex flex-col w-72 max-w-xs bg-[#EDE9E1] h-full shadow-2xl p-6 justify-between z-10 animate-in slide-in-from-left duration-300">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-2 border-b border-[#D6CFC4]">
                <div>
                  <span className="text-[10px] font-semibold text-[#C2693F] tracking-widest uppercase font-['DM_Mono'] block">
                    Workspace
                  </span>
                  <h2 className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#1E1E1E]">
                    Collector Hub
                  </h2>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 rounded-md text-[#6B6560] hover:text-[#1E1E1E] transition-colors cursor-pointer"
                >
                  <Xmark className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation */}
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

            {/* User Details */}
            {user && (
              <div className="p-3 border-t border-[#D6CFC4] pt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D6CFC4] overflow-hidden relative">
                  {user.image ? (
                    <Image src={user.image} alt={user.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-sm text-[#1E1E1E]">
                      {user.name ? user.name[0] : "U"}
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
