"use client";

import { useEffect, useState } from "react";

export default function AllTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/admin/transactions");
        if (res.ok) {
          const data = await res.json();
          setTransactions(data || []);
        }
      } catch (err) {
        console.error("Failed to load transactions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1E1E1E]">View Transactions</h2>
        <p className="font-['DM_Sans'] text-sm text-[#6B6560] mt-1">Review all revenue streams including membership upgrades and artwork checkout histories.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-t-transparent border-[#C2693F] rounded-full animate-spin"></div>
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-16 bg-[#EDE9E1] border border-dashed border-[#D6CFC4] rounded-[8px] p-6 font-['DM_Sans']">
          <p className="text-base text-[#1E1E1E] font-medium">No Transactions Found</p>
        </div>
      ) : (
        <div className="bg-[#EDE9E1] border border-[#D6CFC4] rounded-[8px] overflow-hidden shadow-[0_2px_12px_rgba(30,30,30,0.07)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-['DM_Sans']">
              <thead>
                <tr className="border-b border-[#D6CFC4] bg-[#EDE9E1]">
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">User Email</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D6CFC4]/55 bg-[#F7F4EF]/40">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-[#EDE9E1]/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-[#1E1E1E] font-mono">{t.id}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        t.type === "subscription" 
                          ? "bg-indigo-100 text-indigo-800" 
                          : "bg-emerald-100 text-emerald-800"
                      }`}>
                        {t.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B6560] font-mono">{t.email}</td>
                    <td className="px-6 py-4 text-sm text-[#6B6560]">{t.date}</td>
                    <td className="px-6 py-4 text-sm text-right font-semibold font-['DM_Mono'] text-[#C2693F]">
                      ${t.amount.toLocaleString()}
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
