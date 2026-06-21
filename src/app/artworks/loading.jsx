import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArtworkCardSkeleton } from "@/components/Skeletons";

export default function GalleryLoading() {
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
            <ArtworkCardSkeleton key={i} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
