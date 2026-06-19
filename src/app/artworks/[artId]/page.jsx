
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getData } from "@/lib/action/dataFetch";

export async function generateMetadata({ params }) {
  const { artId } = await params;
  let artwork = null;
  try {
    artwork = await getData(`/arts/${artId}`);
  } catch (e) {}

  return {
    title: `${artwork?.title || "Artwork Detail"} — ArtHub`,
  };
}

export default async function ArtworkDetailsPage({ params }) {
  const { artId } = await params;
  let artwork = null;

  try {
    artwork = await getData(`/arts/${artId}`);
  } catch (err) {
    console.error("Failed to fetch artwork detail:", err.message);
  }

  // Handle case where artwork is not found in db
  if (!artwork) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F7F4EF]">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <h1 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#1E1E1E]">Artwork Not Found</h1>
            <p className="font-['DM_Sans'] text-sm text-[#6B6560]">We couldn find the artwork you are looking for.</p>
            <Link href="/artworks" className="inline-flex h-10 px-6 items-center justify-center bg-[#C2693F] text-[#F7F4EF] rounded-[6px] font-['DM_Sans'] font-medium hover:bg-[#A3522E] transition-colors">
              Back to Gallery
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const title = artwork.title || "Untitled";
  const artist = artwork.artistName || "Unknown Artist";
  const category = artwork.category || "Original Work";
  const description = artwork.description || "No description provided for this work.";
  const rawPrice = artwork.price;
  const price = typeof rawPrice === "number" ? `$${rawPrice.toLocaleString()}` : rawPrice || "Contact for Price";
  const imageSrc = artwork.imageUrl || artwork.image || "/art_tools_composition.png";

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F4EF]">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link 
          href="/artworks" 
          className="inline-flex items-center text-sm font-medium text-[#6B6560] hover:text-[#C2693F] transition-colors mb-8 font-['DM_Sans']"
        >
          ← Back to Gallery
        </Link>

        {/* Dynamic Detail Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start">
          
          {/* Left Column: Huge Artwork Image (optimized) */}
          <div className="lg:col-span-7 bg-[#EDE9E1] border border-[#D6CFC4] rounded-[8px] p-3 shadow-[0_2px_12px_rgba(30,30,30,0.07)]">
            <div className="w-full aspect-[4/3] relative overflow-hidden rounded-[6px]">
              <Image
                src={imageSrc}
                alt={title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: Detailed Info & CTA Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              {/* Category Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-[4px] text-xs font-semibold font-['DM_Sans'] bg-[#7A9E8E]/15 text-[#7A9E8E] border border-[#7A9E8E]/20">
                {category}
              </div>
              <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-bold text-[#1E1E1E] leading-tight">
                {title}
              </h1>
              <p className="font-['DM_Sans'] text-[15px] text-[#6B6560]">
                by <span className="font-medium text-[#1E1E1E]">{artist}</span>
              </p>
            </div>

            {/* Price section */}
            <div className="py-4 border-t border-b border-[#D6CFC4] flex justify-between items-center">
              <span className="font-['DM_Sans'] text-sm text-[#6B6560]">Price</span>
              <span className="font-['DM_Mono'] text-2xl font-bold text-[#C2693F] tracking-tight">
                {price}
              </span>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-['DM_Sans'] text-sm font-semibold text-[#1E1E1E] uppercase tracking-wider">
                About the Artwork
              </h3>
              <p className="font-['DM_Sans'] text-[15px] text-[#6B6560] leading-relaxed font-light">
                {description}
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-4">
              <button 
                className="w-full h-11 px-5 inline-flex items-center justify-center bg-[#C2693F] text-[#F7F4EF] text-sm font-['DM_Sans'] font-medium rounded-[6px] hover:bg-[#A3522E] transition-colors duration-200 cursor-pointer shadow-sm"
              >
                Buy Artwork
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
