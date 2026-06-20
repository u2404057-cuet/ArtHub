"use client";

import { useState, useEffect } from "react";
import BoughtArtCard from "./BoughtArtCard";

export default function ArtworksBrought() {
  const [boughtArtworks, setBoughtArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoughtArtworks = async () => {
      try {
        const res = await fetch("/api/user/purchased");
        if (!res.ok) {
          throw new Error("Failed to fetch purchased artworks");
        }
        const data = await res.json();
        setBoughtArtworks(data.boughtArtworks || []);
      } catch (err) {
        console.error("Error fetching bought artworks:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBoughtArtworks();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1E1E1E]">Bought Artworks</h2>
          <p className="font-['DM_Sans'] text-sm text-[#6B6560] mt-1">Your personal collected vault of original visual crafts.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse bg-[#EDE9E1] rounded-[8px] overflow-hidden border border-[#D6CFC4]/50 h-72">
              <div className="bg-[#D6CFC4] aspect-[4/3] w-full" />
              <div className="p-5 flex justify-between items-center gap-4">
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-[#D6CFC4] rounded w-3/4" />
                  <div className="h-3 bg-[#D6CFC4] rounded w-1/2" />
                </div>
                <div className="h-8 w-20 bg-[#D6CFC4] rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1E1E1E]">Bought Artworks</h2>
        <p className="font-['DM_Sans'] text-sm text-[#6B6560] mt-1">Your personal collected vault of original visual crafts.</p>
      </div>

      {error ? (
        <div className="p-4 rounded-[6px] bg-red-50 text-red-800 border border-red-200 text-sm font-['DM_Sans']">
          Error loading purchased artworks: {error}
        </div>
      ) : boughtArtworks.length === 0 ? (
        <div className="text-center py-16 bg-[#EDE9E1] border border-dashed border-[#D6CFC4] rounded-[8px] p-6 font-['DM_Sans']">
          <p className="text-base text-[#1E1E1E] font-medium">No Purchased Artworks</p>
          <p className="text-xs text-[#6B6560] mt-1.5 max-w-xs mx-auto">
            You haven&apos;t added any artworks to your collection yet. Browse the gallery to find your first masterpiece!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {boughtArtworks.map((artwork) => (
            <BoughtArtCard key={artwork._id || artwork.id} artwork={artwork} />
          ))}
        </div>
      )}
    </div>
  );
}
