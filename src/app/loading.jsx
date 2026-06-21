export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F7F4EF]/85 backdrop-blur-[4px] transition-all duration-300">
      <div className="flex flex-col items-center space-y-4">
        {/* Brand elegant circular spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-[#EDE9E1]"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-[#C2693F] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        <p className="font-['DM_Sans'] text-[11px] font-semibold tracking-widest text-[#6B6560] uppercase animate-pulse">
          Loading ArtHub
        </p>
      </div>
    </div>
  );
}
