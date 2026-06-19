import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DetailsLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F4EF]">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Back Link Skeleton */}
        <div className="h-4 w-28 bg-[#EDE9E1] rounded-[4px] mb-8 animate-pulse"></div>

        {/* Dynamic Detail Columns Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start animate-pulse">
          
          {/* Left Column: Image Skeleton */}
          <div className="lg:col-span-7 bg-[#EDE9E1] border border-[#D6CFC4] rounded-[8px] p-3 shadow-[0_2px_12px_rgba(30,30,30,0.07)]">
            <div className="w-full aspect-[4/3] bg-[#D6CFC4] rounded-[6px]"></div>
          </div>

          {/* Right Column: Detailed Info Skeleton */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              {/* Category Badge Skeleton */}
              <div className="h-6 w-24 bg-[#EDE9E1] rounded-[4px]"></div>
              {/* Title Skeleton */}
              <div className="h-10 w-3/4 bg-[#EDE9E1] rounded-[6px]"></div>
              {/* Artist Skeleton */}
              <div className="h-5 w-1/3 bg-[#EDE9E1] rounded-[4px]"></div>
            </div>

            {/* Price section Skeleton */}
            <div className="py-4 border-t border-b border-[#D6CFC4] flex justify-between items-center">
              <div className="h-5 w-12 bg-[#EDE9E1] rounded-[4px]"></div>
              <div className="h-7 w-20 bg-[#EDE9E1] rounded-[4px]"></div>
            </div>

            {/* Description Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-32 bg-[#EDE9E1] rounded-[4px]"></div>
              <div className="space-y-1.5">
                <div className="h-4 w-full bg-[#EDE9E1] rounded-[4px]"></div>
                <div className="h-4 w-5/6 bg-[#EDE9E1] rounded-[4px]"></div>
                <div className="h-4 w-2/3 bg-[#EDE9E1] rounded-[4px]"></div>
              </div>
            </div>

            {/* CTAs Skeletons */}
            <div className="pt-4 space-y-3">
              <div className="h-11 w-full bg-[#EDE9E1] rounded-[6px]"></div>
              <div className="h-11 w-full bg-[#EDE9E1] rounded-[6px]"></div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
