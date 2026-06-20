"use client";

import Image from "next/image";
import Link from "next/link";

export default function BoughtArtCard({ artwork }) {
  const id = artwork?._id || artwork?.id || "#";
  const title = artwork?.title || "Untitled Artwork";
  const artist = artwork?.artistName || artwork?.artist || "Unknown Artist";
  const imageSrc = artwork?.imageUrl || artwork?.image || "/art_tools_composition.png";

  return (
    <div className="group bg-[#EDE9E1] rounded-[8px] overflow-hidden shadow-[0_2px_12px_rgba(30,30,30,0.07)] border border-[#D6CFC4]/50 transition-all duration-300 hover:-translate-y-0.5">
      {/* Aspect Ratio 4:3 */}
      <div className="w-full aspect-[4/3] relative overflow-hidden bg-zinc-200">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="p-5 flex justify-between items-center gap-4">
        <div className="overflow-hidden">
          <h3 className="font-['DM_Sans'] font-semibold text-[16px] text-[#1E1E1E] truncate leading-tight">
            {title}
          </h3>
          <p className="font-['DM_Sans'] text-xs text-[#6B6560] font-light mt-1 truncate">
            by {artist}
          </p>
        </div>
        <Link
          href={`/artworks/${id}`}
          className="h-8 px-4 flex-shrink-0 inline-flex items-center justify-center border border-[#D6CFC4] bg-transparent text-[#1E1E1E] text-xs font-['DM_Sans'] font-medium rounded-[6px] hover:bg-[#F7F4EF] hover:border-[#C2693F] hover:text-[#C2693F] transition-colors duration-200 cursor-pointer"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
