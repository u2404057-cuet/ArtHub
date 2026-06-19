import Image from "next/image";
import Link from "next/link";

export default function ArtworksBrought() {
  const boughtArtworks = [
    {
      _id: "art-1",
      title: "Silent Sunlight",
      artistName: "Clara Thorne",
      imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop"
    },
    {
      _id: "art-3",
      title: "Ocean Whisperings",
      artistName: "Elena Rostova",
      imageUrl: "https://images.unsplash.com/photo-1501472312651-726afd116ff1?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1E1E1E]">Bought Artworks</h2>
        <p className="font-['DM_Sans'] text-sm text-[#6B6560] mt-1">Your personal collected vault of original visual crafts.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {boughtArtworks.map((artwork) => (
          <div 
            key={artwork._id}
            className="group bg-[#EDE9E1] rounded-[8px] overflow-hidden shadow-[0_2px_12px_rgba(30,30,30,0.07)] border border-[#D6CFC4]/50"
          >
            {/* Aspect Ratio 4:3 */}
            <div className="w-full aspect-[4/3] relative overflow-hidden bg-zinc-200">
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <div className="p-5 flex justify-between items-center gap-4">
              <div>
                <h3 className="font-['DM_Sans'] font-semibold text-[16px] text-[#1E1E1E] truncate">{artwork.title}</h3>
                <p className="font-['DM_Sans'] text-xs text-[#6B6560] font-light">by {artwork.artistName}</p>
              </div>
              <Link
                href={`/artworks/${artwork._id}`}
                className="h-8 px-4 inline-flex items-center justify-center border border-[#D6CFC4] bg-transparent text-[#1E1E1E] text-xs font-['DM_Sans'] font-medium rounded-[6px] hover:bg-[#F7F4EF] hover:border-[#C2693F] hover:text-[#C2693F] transition-colors duration-200 cursor-pointer"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
