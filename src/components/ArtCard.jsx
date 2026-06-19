import Image from "next/image";
import Link from "next/link";

export default function ArtCard({ artwork }) {
  // Safe fallbacks and database property mapping
  const id = artwork?._id || artwork?.id || "#";
  const title = artwork?.title || "Untitled Artwork";
  const artist = artwork?.artistName || artwork?.artist || "Unknown Artist";
  const rawPrice = artwork?.price;
  const price = typeof rawPrice === "number" ? `$${rawPrice.toLocaleString()}` : rawPrice || "Contact for Price";
  const imageSrc = artwork?.imageUrl || artwork?.image || "/art_tools_composition.png";

  return (
    <div className="group bg-[#EDE9E1] rounded-[8px] overflow-hidden shadow-[0_2px_12px_rgba(30,30,30,0.07)] transition-transform duration-300 hover:-translate-y-1">
      {/* Thumbnail Container: Strict 4:3 Aspect Ratio */}
      <div className="w-full aspect-[4/3] overflow-hidden bg-[#D6CFC4] relative">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Details Footer */}
      <div className="p-5 space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-['DM_Sans'] font-semibold text-[17px] text-[#1E1E1E] leading-tight truncate">
              {title}
            </h3>
            <span className="font-['DM_Mono'] text-sm font-semibold text-[#C2693F] whitespace-nowrap">
              {price}
            </span>
          </div>
          <p className="font-['DM_Sans'] font-light text-[13px] text-[#6B6560]">
            by {artist}
          </p>
        </div>

        {/* Action Button: Show Details */}
        <div className="pt-3 border-t border-[#D6CFC4]/50">
          <Link
            href={`/artworks/${id}`}
            className="w-full h-9 inline-flex items-center justify-center border border-[#D6CFC4] bg-transparent text-[#1E1E1E] text-xs font-['DM_Sans'] font-medium rounded-[6px] hover:bg-[#F7F4EF] hover:border-[#C2693F] hover:text-[#C2693F] transition-colors duration-200 cursor-pointer text-center"
          >
            Show Details
          </Link>
        </div>
      </div>
    </div>
  );
}
