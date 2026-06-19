import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GalleryLoading() {
  // Skeleton slots representing the 6 grid cards
  const skeletons = Array.from({ length: 6 });

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F4EF]">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Title skeleton */}
        <div className="border-b border-[#D6CFC4] pb-6 mb-12 animate-pulse">
          <div className="h-10 w-64 bg-[#EDE9E1] rounded-[6px] mb-3"></div>
          <div className="h-4 w-96 bg-[#EDE9E1] rounded-[4px]"></div>
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skeletons.map((_, i) => (
            <div 
              key={i} 
              className="bg-[#EDE9E1] rounded-[8px] overflow-hidden shadow-[0_2px_12px_rgba(30,30,30,0.07)] border border-[#D6CFC4]/30 animate-pulse p-4 space-y-4"
            >
              {/* Aspect Ratio 4:3 image skeleton */}
              <div className="w-full aspect-[4/3] bg-[#D6CFC4] rounded-[6px]"></div>

              {/* Detail block skeletons */}
              <div className="space-y-3">
                <div className="flex justify-between items-center gap-4">
                  <div className="h-5 w-1/2 bg-[#D6CFC4] rounded-[4px]"></div>
                  <div className="h-5 w-1/4 bg-[#D6CFC4] rounded-[4px]"></div>
                </div>
                <div className="h-4 w-1/3 bg-[#D6CFC4] rounded-[4px]"></div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
