import Link from "next/link";
import Image from "next/image";
import { getData } from "@/lib/action/dataFetch";
import ArtCard from "@/components/ArtCard";

// Fallback artworks in case the database is empty initially
const fallbackArtworks = [
  {
    _id: "art-1",
    title: "Silent Sunlight",
    artistName: "Clara Thorne",
    price: 1850,
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop"
  },
  {
    _id: "art-2",
    title: "Textures of Time",
    artistName: "Julian Vance",
    price: 2400,
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop"
  },
  {
    _id: "art-3",
    title: "Ocean Whisperings",
    artistName: "Elena Rostova",
    price: 950,
    imageUrl: "https://images.unsplash.com/photo-1501472312651-726afd116ff1?q=80&w=600&auto=format&fit=crop"
  },
  {
    _id: "art-4",
    title: "Clay and Ochre",
    artistName: "Mateo Silva",
    price: 1200,
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop"
  }
];

export default async function Home() {
  let dbArtworks = [];
  try {
    dbArtworks = await getData("/arts");
  } catch (err) {
    console.error("Failed to fetch artworks from server:", err.message);
  }

  // Use fetched database artworks if available; otherwise show fallback list.
  // Limit to showing exactly 6 items.
  const artworks = (dbArtworks && dbArtworks.length > 0 ? dbArtworks : fallbackArtworks).slice(0, 6);

  return (
    <div className="w-full bg-[#F7F4EF] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 border-b border-[#D6CFC4] bg-gradient-to-b from-[#EDE9E1]/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side: Tagline & CTA */}
            <div className="space-y-6 text-left">
              <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#1E1E1E] leading-[1.1]">
                Discover & Buy Original Art
              </h1>
              <p className="font-['DM_Sans'] text-lg md:text-xl text-[#6B6560] leading-relaxed font-light max-w-xl">
                Welcome to ArtHub — a quiet, curated online gallery connecting independent artists with collectors who value authenticity and original craftsmanship.
              </p>
              <div className="pt-2">
                <Link
                  href="/artworks"
                  className="h-12 px-8 inline-flex items-center justify-center bg-[#C2693F] text-[#F7F4EF] text-[15px] font-['DM_Sans'] font-medium rounded-[6px] hover:bg-[#A3522E] transition-colors duration-200 cursor-pointer"
                >
                  Browse Artworks
                </Link>
              </div>
            </div>

            {/* Right Side: Composition Image (Optimized via Next Image) */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative max-w-md md:max-w-lg lg:max-w-full rounded-[8px] overflow-hidden shadow-[0_2px_16px_rgba(30,30,30,0.1)] border border-[#D6CFC4] bg-[#EDE9E1] p-2">
                <Image
                  src="/art_tools_composition.png"
                  alt="Artist tools composition including paintbrushes, canvas, camera, and paints"
                  width={600}
                  height={600}
                  priority
                  className="w-full h-auto object-cover rounded-[6px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Gallery Showcase */}
      <section className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-baseline mb-12 border-b border-[#D6CFC4] pb-5">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-semibold text-[#1E1E1E]">
            Featured Collection
          </h2>
          <Link
            href="/artworks"
            className="text-[#C2693F] hover:text-[#A3522E] font-['DM_Sans'] text-sm font-medium transition-colors"
          >
            View all artworks →
          </Link>
        </div>

        {/* Artwork Grid: STRICT 4:3 Aspect Ratio thumbnails */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork) => (
            <ArtCard key={artwork._id} artwork={artwork} />
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-[#EDE9E1] py-20 border-t border-b border-[#D6CFC4]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-[12px] font-['DM_Mono'] font-medium text-[#C2693F] tracking-widest uppercase">
            Platform Philosophy
          </span>
          <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#1E1E1E]">
            Quiet Sunday Morning Aesthetics
          </h2>
          <p className="font-['DM_Sans'] text-[#6B6560] leading-relaxed max-w-2xl mx-auto text-base">
            We believe that art requires silence to be heard. Unlike loud, high-pressure e-commerce shops, ArtHub is built to feel like walking into a quiet gallery. We keep our UI minimalistic so that the artwork remains the loudest and most beautiful element in the room.
          </p>
        </div>
      </section>
    </div>
  );
}
