"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ManageArt() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArtworks = async () => {
    try {
      const res = await fetch("/api/artworks");
      if (res.ok) {
        const data = await res.json();
        setArtworks(data.artworks || []);
      }
    } catch (err) {
      console.error("Failed to load artworks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete the artwork "${title}"?`)) return;

    try {
      const res = await fetch("/api/artworks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Artwork deleted!");
        fetchArtworks();
      } else {
        alert(data.error || "Failed to delete artwork.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting artwork.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1E1E1E]">Manage Artworks</h2>
        <p className="font-['DM_Sans'] text-sm text-[#6B6560] mt-1">Review all listed artwork pieces and remove obsolete/offending items.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-t-transparent border-[#C2693F] rounded-full animate-spin"></div>
        </div>
      ) : artworks.length === 0 ? (
        <div className="text-center py-16 bg-[#EDE9E1] border border-dashed border-[#D6CFC4] rounded-[8px] p-6 font-['DM_Sans']">
          <p className="text-base text-[#1E1E1E] font-medium">No Artworks Listed</p>
        </div>
      ) : (
        <div className="bg-[#EDE9E1] border border-[#D6CFC4] rounded-[8px] overflow-hidden shadow-[0_2px_12px_rgba(30,30,30,0.07)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-['DM_Sans']">
              <thead>
                <tr className="border-b border-[#D6CFC4] bg-[#EDE9E1]">
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Preview</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Artist</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D6CFC4]/55 bg-[#F7F4EF]/40">
                {artworks.map((art) => (
                  <tr key={art._id} className="hover:bg-[#EDE9E1]/50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="w-12 h-9 rounded bg-zinc-200 overflow-hidden relative border border-[#D6CFC4]">
                        <Image src={art.imageUrl || art.image} alt={art.title} fill className="object-cover" />
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm font-semibold text-[#1E1E1E]">{art.title}</td>
                    <td className="px-6 py-3 text-sm text-[#1E1E1E] font-medium">
                      <div>{art.artistName || "Anonymous Creator"}</div>
                      <div className="text-xs text-[#6B6560]/75">{art.artistEmail}</div>
                    </td>
                    <td className="px-6 py-3 text-sm text-[#6B6560]">{art.category}</td>
                    <td className="px-6 py-3 text-sm font-semibold font-['DM_Mono'] text-[#C2693F]">
                      ${art.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-sm text-right">
                      <button
                        onClick={() => handleDelete(art._id, art.title)}
                        className="h-8 px-3 inline-flex items-center text-xs font-medium bg-[#B94A3A]/10 text-[#B94A3A] rounded-[6px] hover:bg-[#B94A3A]/20 transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
