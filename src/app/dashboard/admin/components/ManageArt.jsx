"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Check, Xmark } from "@gravity-ui/icons";

export default function ManageArt() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Custom Modal & Toast States
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [artToDelete, setArtToDelete] = useState(null);
  const [toast, setToast] = useState({ type: "", message: "" });

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

  // Dismiss toast alert automatically
  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => {
        setToast({ type: "", message: "" });
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleDeleteClick = (id, title) => {
    setArtToDelete({ id, title });
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!artToDelete) return;
    const { id } = artToDelete;
    setIsConfirmOpen(false);

    try {
      const res = await fetch("/api/artworks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();

      if (res.ok) {
        setToast({ type: "success", message: data.message || "Artwork deleted successfully!" });
        fetchArtworks();
      } else {
        setToast({ type: "error", message: data.error || "Failed to delete artwork." });
      }
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Error deleting artwork." });
    } finally {
      setArtToDelete(null);
    }
  };

  return (
    <div className="space-y-6 relative">
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
        <div className="bg-[#EDE9E1] border border-[#D6CFC4] rounded-[8px] overflow-hidden shadow-[0_2px_12px_rgba(30,30,30,0.07)] animate-slide-up">
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
                        onClick={() => handleDeleteClick(art._id, art.title)}
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

      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-[#1E1E1E]/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsConfirmOpen(false)}
          />
          <div className="relative bg-[#EDE9E1] border border-[#D6CFC4] rounded-[12px] p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200 font-['DM_Sans']">
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#1E1E1E] border-b border-[#D6CFC4] pb-3 mb-4">
              Confirm Delete
            </h3>
            <p className="text-sm text-[#6B6560] leading-relaxed mb-6">
              Are you sure you want to delete the artwork <strong className="text-[#1E1E1E]">{artToDelete?.title}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="h-10 px-4 inline-flex items-center justify-center border border-[#D6CFC4] bg-transparent text-[#1E1E1E] text-xs font-medium rounded-[6px] hover:bg-[#F7F4EF] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="h-10 px-5 inline-flex items-center justify-center bg-[#B94A3A] text-[#F7F4EF] text-xs font-semibold rounded-[6px] hover:bg-[#973224] transition-colors cursor-pointer shadow-sm"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Floating Toast Alert */}
      {toast.message && (
        <div className={`fixed bottom-6 right-6 z-[110] max-w-xs w-full bg-[#EDE9E1] border-l-4 rounded-[6px] p-4 shadow-[0_4px_20px_rgba(30,30,30,0.15)] flex items-start justify-between gap-3 animate-in slide-in-from-bottom-5 duration-300 font-['DM_Sans'] text-xs ${
          toast.type === "success" ? "border-[#C2693F]" : "border-red-600"
        }`}>
          <div className="flex gap-2">
            {toast.type === "success" ? (
              <Check className="w-4 h-4 text-[#C2693F] flex-shrink-0 mt-0.5" />
            ) : (
              <svg className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            )}
            <div>
              <p className="font-semibold text-[#1E1E1E]">
                {toast.type === "success" ? "Operation Successful" : "Operation Error"}
              </p>
              <p className="text-[#6B6560] mt-1">{toast.message}</p>
            </div>
          </div>
          <button 
            onClick={() => setToast({ type: "", message: "" })}
            className="text-[#6B6560] hover:text-[#1E1E1E] transition-colors cursor-pointer"
          >
            <Xmark className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
