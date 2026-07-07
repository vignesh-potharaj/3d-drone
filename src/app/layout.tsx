import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INFRAHAWK // Tactical Autonomous Systems",
  description: "Next-generation autonomous system featuring 850 kW hybrid power, Vulcan M134 ballistic suppression, and dual silent propulsion flight dynamics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-hawk-black text-hawk-white selection:bg-hawk-blue selection:text-white">
        {children}
      </body>
    </html>
  );
}
