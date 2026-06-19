import "./globals.css";

export const metadata = {
  title: "ArtHub — Calm & Elegant Art Marketplace",
  description: "ArtHub is a quiet, sunlit gallery space online connecting passionate collectors with independent artists.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#F7F4EF] text-[#1E1E1E] font-['DM_Sans']">
        {children}
      </body>
    </html>
  );
}


