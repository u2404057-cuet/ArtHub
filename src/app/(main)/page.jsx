"use client";

import Link from "next/link";
import { Magnifier } from "@gravity-ui/icons";

export default function Home() {
  // Mock artworks following the strict 4:3 aspect ratio rule
  const featuredArtworks = [
    {
      id: "art-1",
      title: "Silent Sunlight",
      artist: "Clara Thorne",
      price: "$1,850.00",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "art-2",
      title: "Textures of Time",
      artist: "Julian Vance",
      price: "$2,400.00",
      image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "art-3",
      title: "Ocean Whisperings",
      artist: "Elena Rostova",
      price: "$950.00",
      image: "https://images.unsplash.com/photo-1501472312651-726afd116ff1?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "art-4",
      title: "Clay and Ochre",
      artist: "Mateo Silva",
      price: "$1,200.00",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <div className="w-full bg-[#F7F4EF] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32 border-b border-[#D6CFC4] bg-gradient-to-b from-[#EDE9E1]/30 to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl font-bold tracking-tight text-[#1E1E1E] leading-[1.1] max-w-4xl mx-auto">
            A sunlit space for original craft.
          </h1>
          <p className="font-['DM_Sans'] text-lg md:text-xl text-[#6B6560] max-w-2xl mx-auto leading-relaxed font-light">
            Welcome to ArtHub — a quiet, curated online gallery connecting independent artists with collectors who value authenticity.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/artworks"
              className="w-full sm:w-auto h-12 px-8 inline-flex items-center justify-center bg-[#C2693F] text-[#F7F4EF] text-[15px] font-['DM_Sans'] font-medium rounded-[6px] hover:bg-[#A3522E] transition-colors duration-200"
            >
              Browse Gallery
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto h-12 px-8 inline-flex items-center justify-center border border-[#D6CFC4] text-[#1E1E1E] text-[15px] font-['DM_Sans'] font-medium rounded-[6px] hover:bg-[#EDE9E1] transition-colors duration-200"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Main Gallery Showcase */}
      <section className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-baseline mb-12 border-b border-[#D6CFC4] pb-5">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-semibold text-[#1E1E1E]">
            Spotlight Collection
          </h2>
          <Link
            href="/artworks"
            className="text-[#C2693F] hover:text-[#A3522E] font-['DM_Sans'] text-sm font-medium transition-colors"
          >
            View all artworks →
          </Link>
        </div>

        {/* Artwork Grid: STRICT 4:3 Aspect Ratio thumbnails */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredArtworks.map((artwork) => (
            <div 
              key={artwork.id}
              className="group bg-[#EDE9E1] rounded-[8px] overflow-hidden shadow-[0_2px_12px_rgba(30,30,30,0.07)] transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Image Container: Strict 4:3 Aspect Ratio */}
              <div className="w-full aspect-[4/3] overflow-hidden bg-zinc-200 relative">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Artwork Details */}
              <div className="p-5 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-['DM_Sans'] font-semibold text-[17px] text-[#1E1E1E] leading-tight truncate">
                    {artwork.title}
                  </h3>
                  <span className="font-['DM_Mono'] text-sm font-semibold text-[#C2693F] whitespace-nowrap">
                    {artwork.price}
                  </span>
                </div>
                <p className="font-['DM_Sans'] font-light text-[13px] text-[#6B6560]">
                  by {artwork.artist}
                </p>
              </div>
            </div>
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
