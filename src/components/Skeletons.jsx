export function ArtworkCardSkeleton() {
  return (
    <div className="bg-[#EDE9E1] rounded-[8px] overflow-hidden shadow-[0_2px_12px_rgba(30,30,30,0.07)] border border-[#D6CFC4]/30 animate-pulse p-4 space-y-4">
      {/* 4:3 Image skeleton */}
      <div className="w-full aspect-[4/3] bg-[#D6CFC4] rounded-[6px]"></div>

      {/* Details skeleton */}
      <div className="space-y-3">
        <div className="flex justify-between items-center gap-4">
          <div className="h-5 w-1/2 bg-[#D6CFC4] rounded-[4px]"></div>
          <div className="h-5 w-1/4 bg-[#D6CFC4] rounded-[4px]"></div>
        </div>
        <div className="h-4 w-1/3 bg-[#D6CFC4] rounded-[4px]"></div>
      </div>
    </div>
  );
}

export function TableRowSkeleton({ columns = 5, rows = 5 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b border-[#D6CFC4]/40 animate-pulse">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="px-6 py-4">
              <div className="h-5 bg-[#D6CFC4]/70 rounded-[4px] w-full"></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
