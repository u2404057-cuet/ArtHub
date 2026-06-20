"use client";

import { useEffect, useState } from "react";

export default function Overview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/admin/analytics");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error("Failed to load analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-t-transparent border-[#C2693F] rounded-full animate-spin"></div>
      </div>
    );
  }

  const { analytics = {}, charts = {} } = data || {};
  const salesData = charts.salesData || [];
  const categoryData = charts.categoryData || [];

  // Calculate highest revenue for scaling the custom bar chart
  const maxRevenue = salesData.length ? Math.max(...salesData.map(d => d.revenue), 10) : 100;
  
  // Calculate total category volume to get percentages
  const totalCategoryArts = categoryData.reduce((acc, curr) => acc + curr.value, 0) || 1;

  // Nice warm color palette for charts
  const categoryColors = [
    "#C2693F", // Terracotta
    "#4A6B5D", // Sage Green
    "#D9A05B", // Ochre Gold
    "#3E5C76", // Steel Blue
    "#7A6C5D", // Warm Gray
    "#B15C5C", // Dusty Rose
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1E1E1E]">Analytics Overview</h2>
        <p className="font-['DM_Sans'] text-sm text-[#6B6560] mt-1">Global platform metrics, revenue tracking, and artwork inventory performance.</p>
      </div>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-[#EDE9E1] border border-[#D6CFC4] rounded-[10px] p-6 shadow-[0_2px_12px_rgba(30,30,30,0.04)] hover:shadow-[0_4px_20px_rgba(194,105,63,0.12)] transition-all duration-300">
          <p className="font-['DM_Sans'] text-[11px] font-semibold text-[#6B6560] uppercase tracking-wider">Total Registered Users</p>
          <p className="font-['DM_Mono'] text-3xl font-bold text-[#1E1E1E] mt-2">{analytics.totalUsers || 0}</p>
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#4A6B5D]">
            <span className="font-medium">Active Collectors</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#EDE9E1] border border-[#D6CFC4] rounded-[10px] p-6 shadow-[0_2px_12px_rgba(30,30,30,0.04)] hover:shadow-[0_4px_20px_rgba(194,105,63,0.12)] transition-all duration-300">
          <p className="font-['DM_Sans'] text-[11px] font-semibold text-[#6B6560] uppercase tracking-wider">Total Verified Artists</p>
          <p className="font-['DM_Mono'] text-3xl font-bold text-[#C2693F] mt-2">{analytics.totalArtists || 0}</p>
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#C2693F]">
            <span className="font-medium">Creators Onboard</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#EDE9E1] border border-[#D6CFC4] rounded-[10px] p-6 shadow-[0_2px_12px_rgba(30,30,30,0.04)] hover:shadow-[0_4px_20px_rgba(194,105,63,0.12)] transition-all duration-300">
          <p className="font-['DM_Sans'] text-[11px] font-semibold text-[#6B6560] uppercase tracking-wider">Artworks Sold</p>
          <p className="font-['DM_Mono'] text-3xl font-bold text-[#1E1E1E] mt-2">{analytics.totalArtworksSold || 0}</p>
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#3E5C76]">
            <span className="font-medium">Completed Transactions</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-[#EDE9E1] border border-[#D6CFC4] rounded-[10px] p-6 shadow-[0_2px_12px_rgba(30,30,30,0.04)] hover:shadow-[0_4px_20px_rgba(194,105,63,0.12)] transition-all duration-300">
          <p className="font-['DM_Sans'] text-[11px] font-semibold text-[#6B6560] uppercase tracking-wider">Total Gross Revenue</p>
          <p className="font-['DM_Mono'] text-3xl font-bold text-[#4A6B5D] mt-2">${(analytics.totalRevenue || 0).toLocaleString()}</p>
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#4A6B5D]">
            <span className="font-medium">Platform Income (Subs & Arts)</span>
          </div>
        </div>
      </div>

      {/* Charts Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart (2/3 width) */}
        <div className="lg:col-span-2 bg-[#EDE9E1] border border-[#D6CFC4] rounded-[10px] p-6 shadow-[0_2px_12px_rgba(30,30,30,0.04)] font-['DM_Sans']">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-[#1E1E1E]">Sales Performance</h3>
              <p className="text-xs text-[#6B6560]">Gross daily revenue tracking timeline</p>
            </div>
            <span className="text-[11px] font-semibold text-[#C2693F] bg-[#C2693F]/10 px-2.5 py-0.5 rounded-full font-['DM_Mono'] uppercase">USD ($)</span>
          </div>

          {/* Custom SVG Sales Area/Line Chart */}
          {salesData.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-xs text-[#6B6560] italic">
              No sales transactions recorded yet.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative h-64 border-l border-b border-[#D6CFC4] flex items-end justify-between px-4 pb-2 pt-6">
                {/* Dynamic Bars with rich tooltips */}
                {salesData.map((d, index) => {
                  const percentageHeight = Math.max(10, Math.min(100, (d.revenue / maxRevenue) * 100));
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center group px-1">
                      {/* Tooltip */}
                      <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bottom-full mb-1 bg-[#1E1E1E] text-[#F7F4EF] text-[10px] px-2 py-1 rounded shadow-md pointer-events-none whitespace-nowrap font-mono z-10">
                        ${d.revenue} ({d.date})
                      </div>
                      {/* Bar Fill */}
                      <div 
                        style={{ height: `${percentageHeight}%` }} 
                        className="w-full max-w-[20px] rounded-t-[3px] bg-gradient-to-t from-[#C2693F] to-[#D9A05B] group-hover:from-[#A3522E] group-hover:to-[#C2693F] transition-all duration-300"
                      />
                    </div>
                  );
                })}
              </div>
              
              {/* X-Axis labels */}
              <div className="flex justify-between text-[10px] text-[#6B6560] px-4 font-mono">
                <span>{salesData[0]?.date}</span>
                <span>Timeline Progression</span>
                <span>{salesData[salesData.length - 1]?.date}</span>
              </div>
            </div>
          )}
        </div>

        {/* Category Pie/Doughnut Chart representation (1/3 width) */}
        <div className="bg-[#EDE9E1] border border-[#D6CFC4] rounded-[10px] p-6 shadow-[0_2px_12px_rgba(30,30,30,0.04)] font-['DM_Sans']">
          <div className="mb-6">
            <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-[#1E1E1E]">Artworks by Category</h3>
            <p className="text-xs text-[#6B6560]">Distribution of sold items in catalog</p>
          </div>

          {categoryData.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-xs text-[#6B6560] italic">
              No categories recorded.
            </div>
          ) : (
            <div className="flex flex-col justify-between h-64">
              {/* Custom styled progress indicators representing pie wedges */}
              <div className="space-y-4 overflow-y-auto pr-1">
                {categoryData.map((cat, idx) => {
                  const percentage = Math.round((cat.value / totalCategoryArts) * 100);
                  const color = categoryColors[idx % categoryColors.length];
                  return (
                    <div key={cat.name} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-[#1E1E1E] flex items-center gap-2">
                          <span style={{ backgroundColor: color }} className="w-2.5 h-2.5 rounded-full inline-block" />
                          {cat.name}
                        </span>
                        <span className="font-mono text-[#6B6560]">{cat.value} arts ({percentage}%)</span>
                      </div>
                      <div className="w-full h-2 bg-[#F7F4EF] rounded-full overflow-hidden border border-[#D6CFC4]">
                        <div 
                          style={{ width: `${percentage}%`, backgroundColor: color }} 
                          className="h-full rounded-full transition-all duration-500"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mini Summary tag */}
              <div className="border-t border-[#D6CFC4] pt-4 mt-auto text-[11px] text-[#6B6560] text-center italic">
                Representing {totalCategoryArts} total sold art units
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
