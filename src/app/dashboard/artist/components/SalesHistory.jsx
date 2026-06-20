"use client";

import { useState, useEffect } from "react";

export default function SalesHistory() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await fetch("/api/artist/sales");
        if (res.ok) {
          const data = await res.json();
          setSales(data.salesHistory || []);
        }
      } catch (err) {
        console.error("Failed to load sales history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1E1E1E]">Sales History</h2>
        <p className="font-['DM_Sans'] text-sm text-[#6B6560] mt-1">Monitor purchases and collector transaction details.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-t-transparent border-[#C2693F] rounded-full animate-spin"></div>
        </div>
      ) : sales.length === 0 ? (
        <div className="text-center py-16 bg-[#EDE9E1] border border-dashed border-[#D6CFC4] rounded-[8px] p-6 font-['DM_Sans']">
          <p className="text-base text-[#1E1E1E] font-medium">No Sales Yet</p>
          <p className="text-xs text-[#6B6560] mt-1.5 max-w-xs mx-auto">
            Once collectors purchase your artworks, transaction records will display here.
          </p>
        </div>
      ) : (
        <div className="bg-[#EDE9E1] border border-[#D6CFC4] rounded-[8px] overflow-hidden shadow-[0_2px_12px_rgba(30,30,30,0.07)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-['DM_Sans']">
              <thead>
                <tr className="border-b border-[#D6CFC4] bg-[#EDE9E1]">
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Artwork Title</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Buyer</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Purchase Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D6CFC4]/55 bg-[#F7F4EF]/40">
                {sales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-[#EDE9E1]/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-[#1E1E1E]">{sale.title}</td>
                    <td className="px-6 py-4 text-sm text-[#6B6560]">
                      <p className="font-medium text-[#1E1E1E]">{sale.buyerName}</p>
                      <p className="text-xs text-[#6B6560]/75">{sale.buyerEmail}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B6560]">{sale.purchaseDate}</td>
                    <td className="px-6 py-4 text-sm font-semibold font-['DM_Mono'] text-[#C2693F]">
                      ${sale.amount.toLocaleString()}
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
