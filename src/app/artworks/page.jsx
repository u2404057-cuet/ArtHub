import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArtCard from "@/components/ArtCard";
import { getData } from "@/lib/action/dataFetch";
import Link from "next/link";

// Fallback artworks in case the database is empty initially
const fallbackArtworks = [
  {
    _id: "art-1",
    title: "Silent Sunlight",
    artistName: "Clara Thorne",
    price: 1850,
    category: "Painting",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop"
  },
  {
    _id: "art-2",
    title: "Textures of Time",
    artistName: "Julian Vance",
    price: 2400,
    category: "Digital",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop"
  },
  {
    _id: "art-3",
    title: "Ocean Whisperings",
    artistName: "Elena Rostova",
    price: 950,
    category: "Painting",
    imageUrl: "https://images.unsplash.com/photo-1501472312651-726afd116ff1?q=80&w=600&auto=format&fit=crop"
  },
  {
    _id: "art-4",
    title: "Clay and Ochre",
    artistName: "Mateo Silva",
    price: 1200,
    category: "Sculpture",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop"
  }
];

export const metadata = {
  title: "Gallery Collection — ArtHub",
  description: "Browse original paintings, digital editions, and hand-crafted sculptures on ArtHub.",
};

export default async function ArtworksPage({ searchParams }) {
  const { category } = (await searchParams) || {};
  
  let dbArtworks = [];
  try {
    dbArtworks = await getData("/arts");
  } catch (err) {
    console.error("Failed to fetch artworks:", err.message);
  }

  // Use dynamic database artworks or fall back to mock collection
  const allArtworks = dbArtworks && dbArtworks.length > 0 ? dbArtworks : fallbackArtworks;

  // Filter artworks by category query if present
  const artworks = category 
    ? allArtworks.filter(art => art.category?.toLowerCase() === category.toLowerCase())
    : allArtworks;

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F4EF] animate-fade-in">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Browse Gallery Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="border-b border-[#D6CFC4] pb-6 mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-4 animate-slide-up">
          <div>
            <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-bold text-[#1E1E1E]">
              {category ? `${category} Gallery` : "Browse Artworks"}
            </h1>
            <p className="font-['DM_Sans'] text-sm text-[#6B6560] mt-2 max-w-xl leading-relaxed">
              Explore a quiet, handpicked showcase of authentic visual expressions. Support independent creators directly.
            </p>
          </div>
          {category && (
            <Link
              href="/artworks"
              className="text-[#C2693F] hover:text-[#A3522E] text-sm font-medium font-['DM_Sans'] transition-colors"
            >
              Clear Filter ×
            </Link>
          )}
        </div>

        {/* Gallery Grid */}
        {artworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up delay-100">
            {artworks.map((artwork) => (
              <ArtCard key={artwork._id} artwork={artwork} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#EDE9E1] rounded-[8px] border border-[#D6CFC4] p-8">
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#1E1E1E]">No Artworks Found</h3>
            <p className="text-sm text-[#6B6560] font-['DM_Sans'] mt-2">There are currently no items matching the 
                ${category} category.</p>
            <Link 
              href="/artworks" 
              className="mt-4 inline-flex h-10 px-6 items-center justify-center bg-[#C2693F] text-[#F7F4EF] rounded-[6px] font-['DM_Sans'] font-medium hover:bg-[#A3522E] transition-colors"
            >
              Show All Art
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
