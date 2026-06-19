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
    soldCount: 14,
    category: "Painting",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop"
  },
  {
    _id: "art-2",
    title: "Textures of Time",
    artistName: "Julian Vance",
    price: 2400,
    soldCount: 8,
    category: "Digital",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop"
  },
  {
    _id: "art-3",
    title: "Ocean Whisperings",
    artistName: "Elena Rostova",
    price: 950,
    soldCount: 22,
    category: "Painting",
    imageUrl: "https://images.unsplash.com/photo-1501472312651-726afd116ff1?q=80&w=600&auto=format&fit=crop"
  },
  {
    _id: "art-4",
    title: "Clay and Ochre",
    artistName: "Mateo Silva",
    price: 1200,
    soldCount: 11,
    category: "Sculpture",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop"
  }
];

// Helper to assign diverse avatars to mock artists
const getArtistAvatar = (name) => {
  if (name.includes("Clara")) return "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop";
  if (name.includes("Julian")) return "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop";
  if (name.includes("Elena")) return "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop";
  if (name.includes("Mateo")) return "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop";
  return "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop";
};

export default async function Home() {
  let dbArtworks = [];
  try {
    dbArtworks = await getData("/arts");
  } catch (err) {
    console.error("Failed to fetch artworks from server:", err.message);
  }

  // Set the primary list of artworks (database or fallbacks)
  const allArtworks = dbArtworks && dbArtworks.length > 0 ? dbArtworks : fallbackArtworks;
  const featuredArtworks = allArtworks.slice(0, 6);

  // Dynamic grouping to identify Top 3 Artists based on total soldCount
  const artistMap = {};
  allArtworks.forEach((art) => {
    const name = art.artistName || "Unknown Artist";
    const sales = art.soldCount || 0;
    const avatar = getArtistAvatar(name);
    
    if (!artistMap[name]) {
      artistMap[name] = { name, sales, avatar };
    } else {
      artistMap[name].sales += sales;
    }
  });

  const topArtists = Object.values(artistMap)
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 3);

  // Category Grid definitions (Painting, Digital, Sculpture, photography)
  const categories = [
    { name: "Painting", slug: "painting", description: "Oils, watercolors, and acrylics", bgImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=400" },
    { name: "Digital Art", slug: "digital", description: "Compositions, vectors, and 3D", bgImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=400" },
    { name: "Sculpture", slug: "sculpture", description: "Clay, stone, and raw carvings", bgImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=400" }
  ];

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

      {/* Extra Section 2: Art Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 border-b border-[#D6CFC4]">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-semibold text-[#1E1E1E]">
            Art Categories
          </h2>
          <p className="font-['DM_Sans'] text-sm text-[#6B6560] mt-2">
            Filter our curated catalog by your preferred visual expression format.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.slug}
              href={`/artworks?category=${category.slug}`}
              className="group relative h-48 rounded-[8px] overflow-hidden shadow-[0_2px_12px_rgba(30,30,30,0.07)] border border-[#D6CFC4]/50 flex items-end p-6 bg-[#EDE9E1]"
            >
              {/* background image crop */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={category.bgImage}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-20 group-hover:scale-105 group-hover:opacity-30 transition-all duration-500"
                />
              </div>
              
              {/* Category details */}
              <div className="relative z-10 space-y-1">
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#1E1E1E] group-hover:text-[#C2693F] transition-colors">
                  {category.name}
                </h3>
                <p className="font-['DM_Sans'] text-xs text-[#6B6560] font-light">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Gallery Showcase */}
      <section className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 border-b border-[#D6CFC4]">
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

        {/* Artwork Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArtworks.map((artwork) => (
            <ArtCard key={artwork._id} artwork={artwork} />
          ))}
        </div>
      </section>

      {/* Extra Section 1: Top Artists */}
      <section className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-semibold text-[#1E1E1E]">
            Top Artists
          </h2>
          <p className="font-['DM_Sans'] text-sm text-[#6B6560] mt-2">
            Meet our independent creators who have captured the most interest and sales this month.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topArtists.map((artist, idx) => (
            <div 
              key={artist.name}
              className="flex flex-col items-center text-center p-6 bg-[#EDE9E1] rounded-[8px] shadow-[0_2px_12px_rgba(30,30,30,0.07)] border border-[#D6CFC4]/50 relative"
            >
              {/* Sales Rank Badge */}
              <span className="absolute top-4 right-4 font-['DM_Mono'] text-xs font-semibold text-[#C2693F] uppercase tracking-wider">
                Rank #{idx + 1}
              </span>

              {/* Avatar circle */}
              <div className="w-20 h-20 rounded-full border-2 border-[#D6CFC4] overflow-hidden relative mb-4">
                <Image
                  src={artist.avatar}
                  alt={artist.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-[#1E1E1E]">
                {artist.name}
              </h3>
              <p className="font-['DM_Sans'] text-xs text-[#6B6560] mt-1 font-light">
                {artist.sales} artwork sales reported
              </p>
              
              <Link 
                href={`/artworks?artist=${encodeURIComponent(artist.name)}`}
                className="mt-4 text-xs font-semibold font-['DM_Sans'] text-[#C2693F] hover:text-[#A3522E] transition-colors"
              >
                View Collection →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-[#EDE9E1] py-20 border-t border-[#D6CFC4]">
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
