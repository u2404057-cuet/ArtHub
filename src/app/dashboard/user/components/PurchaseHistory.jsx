export default function PurchaseHistory() {
  const purchases = [
    { id: "p1", name: "Silent Sunlight", artist: "Clara Thorne", price: 1850, date: "2026-05-12" },
    { id: "p2", name: "Ocean Whisperings", artist: "Elena Rostova", price: 950, date: "2026-06-01" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1E1E1E]">Purchase History</h2>
        <p className="font-['DM_Sans'] text-sm text-[#6B6560] mt-1">Review your collected artworks and transaction details.</p>
      </div>

      <div className="bg-[#EDE9E1] border border-[#D6CFC4] rounded-[8px] overflow-hidden shadow-[0_2px_12px_rgba(30,30,30,0.07)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-['DM_Sans']">
            <thead>
              <tr className="border-b border-[#D6CFC4] bg-[#EDE9E1]">
                <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Artwork Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Artist</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Purchase Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D6CFC4]/55 bg-[#F7F4EF]/40">
              {purchases.map((purchase) => (
                <tr key={purchase.id} className="hover:bg-[#EDE9E1]/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-[#1E1E1E]">{purchase.name}</td>
                  <td className="px-6 py-4 text-sm text-[#6B6560]">{purchase.artist}</td>
                  <td className="px-6 py-4 text-sm font-semibold font-['DM_Mono'] text-[#C2693F]">
                    ${purchase.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#6B6560]">{purchase.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
