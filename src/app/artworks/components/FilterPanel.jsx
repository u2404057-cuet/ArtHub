"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function FilterPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state initialized from searchParams
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Keep local state in sync when search parameters change (e.g. on reset)
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setCategory(searchParams.get("category") || "all");
    setSortBy(searchParams.get("sortBy") || "newest");
  }, [searchParams]);

  const handleApply = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (category && category !== "all") params.set("category", category);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (sortBy) params.set("sortBy", sortBy);

    router.push(`/artworks?${params.toString()}`);
  };

  const handleClear = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setCategory("all");
    setSortBy("newest");
    router.push("/artworks");
  };

  const categories = ["all", "Painting", "Digital", "Sculpture", "Photography", "Drawing", "Mixed Media"];

  return (
    <form onSubmit={handleApply} className="bg-[#EDE9E1] border border-[#D6CFC4] rounded-[8px] p-6 mb-10 shadow-[0_2px_12px_rgba(30,30,30,0.05)] font-['DM_Sans'] text-sm space-y-4 md:space-y-0 md:flex md:flex-wrap md:items-end md:gap-4 animate-slide-up">
      {/* Search Field */}
      <div className="flex-grow min-w-[200px]">
        <label className="block text-xs font-semibold text-[#6B6560] uppercase tracking-wider mb-1.5">Search Artworks</label>
        <input 
          type="text" 
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Title or artist name..."
          className="w-full h-10 px-4 rounded-[6px] border border-[#D6CFC4] bg-[#F7F4EF] text-[#1E1E1E] focus:outline-none focus:border-[#C2693F] transition-colors"
        />
      </div>

      {/* Category Dropdown */}
      <div className="w-full md:w-auto min-w-[150px]">
        <label className="block text-xs font-semibold text-[#6B6560] uppercase tracking-wider mb-1.5">Category</label>
        <select 
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full h-10 px-3 rounded-[6px] border border-[#D6CFC4] bg-[#F7F4EF] text-[#1E1E1E] focus:outline-none focus:border-[#C2693F] transition-colors"
        >
          {categories.map(cat => (
            <option key={cat} value={cat.toLowerCase()}>{cat === "all" ? "All Categories" : cat}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="w-full md:w-auto flex items-end gap-2">
        <div>
          <label className="block text-xs font-semibold text-[#6B6560] uppercase tracking-wider mb-1.5">Min Price</label>
          <input 
            type="number" 
            placeholder="$ Min"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            className="w-24 h-10 px-3 rounded-[6px] border border-[#D6CFC4] bg-[#F7F4EF] text-[#1E1E1E] focus:outline-none focus:border-[#C2693F] transition-colors font-mono"
          />
        </div>
        <span className="self-center pb-2 text-[#6B6560]">-</span>
        <div>
          <label className="block text-xs font-semibold text-[#6B6560] uppercase tracking-wider mb-1.5">Max Price</label>
          <input 
            type="number" 
            placeholder="$ Max"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            className="w-24 h-10 px-3 rounded-[6px] border border-[#D6CFC4] bg-[#F7F4EF] text-[#1E1E1E] focus:outline-none focus:border-[#C2693F] transition-colors font-mono"
          />
        </div>
      </div>

      {/* Sorting Dropdown */}
      <div className="w-full md:w-auto min-w-[150px]">
        <label className="block text-xs font-semibold text-[#6B6560] uppercase tracking-wider mb-1.5">Sort By</label>
        <select 
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="w-full h-10 px-3 rounded-[6px] border border-[#D6CFC4] bg-[#F7F4EF] text-[#1E1E1E] focus:outline-none focus:border-[#C2693F] transition-colors"
        >
          <option value="newest">Newest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="w-full md:w-auto flex gap-2 pt-2 md:pt-0">
        <button 
          type="button" 
          onClick={handleClear}
          className="flex-grow md:flex-none h-10 px-4 inline-flex items-center justify-center border border-[#D6CFC4] bg-transparent text-[#1E1E1E] rounded-[6px] hover:bg-[#F7F4EF] transition-colors cursor-pointer"
        >
          Reset
        </button>
        <button 
          type="submit" 
          className="flex-grow md:flex-none h-10 px-6 inline-flex items-center justify-center bg-[#C2693F] text-[#F7F4EF] rounded-[6px] font-semibold hover:bg-[#A3522E] transition-colors cursor-pointer shadow-sm"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
}
