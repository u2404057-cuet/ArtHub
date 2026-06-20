"use client";

import { useSession } from "@/lib/auth-client";
import { useState, useEffect } from "react";

export default function PurchaseHistory() {
  const { data: session } = useSession();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await fetch("/api/user/purchased");
        if (!res.ok) {
          throw new Error("Failed to fetch purchase history");
        }
        const data = await res.json();
        setPurchases(data.boughtArtworks || []);
      } catch (err) {
        console.error("Error loading purchase history:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1E1E1E]">Purchase History</h2>
          <p className="font-['DM_Sans'] text-sm text-[#6B6560] mt-1">Review your collected artworks and transaction details.</p>
        </div>
        <div className="bg-[#EDE9E1] border border-[#D6CFC4] rounded-[8px] overflow-hidden shadow-[0_2px_12px_rgba(30,30,30,0.07)] p-8 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-t-transparent border-[#C2693F] rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1E1E1E]">Purchase History</h2>
        <p className="font-['DM_Sans'] text-sm text-[#6B6560] mt-1">Review your collected artworks and transaction details.</p>
      </div>

      {error ? (
        <div className="p-4 rounded-[6px] bg-red-50 text-red-800 border border-red-200 text-sm font-['DM_Sans']">
          Error loading purchase history: {error}
        </div>
      ) : purchases.length === 0 ? (
        <div className="text-center py-16 bg-[#EDE9E1] border border-dashed border-[#D6CFC4] rounded-[8px] p-6 font-['DM_Sans']">
          <p className="text-base text-[#1E1E1E] font-medium">No Transactions Found</p>
          <p className="text-xs text-[#6B6560] mt-1.5 max-w-xs mx-auto">
            You haven&apos;t purchased any artworks yet. Once you complete a purchase, your transaction history will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-[#EDE9E1] border border-[#D6CFC4] rounded-[8px] overflow-hidden shadow-[0_2px_12px_rgba(30,30,30,0.07)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-['DM_Sans']">
              <thead>
                <tr className="border-b border-[#D6CFC4] bg-[#EDE9E1]">
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Artwork Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Artist</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D6CFC4]/55 bg-[#F7F4EF]/40">
                {purchases.map((purchase) => {
                  const rawPrice = purchase?.price;
                  const displayPrice = typeof rawPrice === "number" ? `$${rawPrice.toLocaleString()}` : rawPrice || "Contact for Price";
                  
                  return (
                    <tr key={purchase._id || purchase.id} className="hover:bg-[#EDE9E1]/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-[#1E1E1E]">{purchase.title || "Untitled Artwork"}</td>
                      <td className="px-6 py-4 text-sm text-[#6B6560]">{purchase.artistName || purchase.artist || "Unknown Artist"}</td>
                      <td className="px-6 py-4 text-sm font-semibold font-['DM_Mono'] text-[#C2693F]">
                        {displayPrice}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6B6560]">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
