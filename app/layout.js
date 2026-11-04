
import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

import Navbar from "@/components/Navbar";
import FashionNavbar from "@/components/FashionNavbar";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata = {
  title: "Morven",
  description: "E-Commerce with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${outfit.className} antialiased text-gray-700`}
        >
          <Toaster />

          <AppContextProvider>
            <Navbar />
            <FashionNavbar />

            {/* Space reserved for the two fixed navbars */}
            <main className="pt-14 lg:pt-[9rem]">
              {children}
            </main>
          </AppContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
