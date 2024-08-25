import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Crypto Wallet",
  description: "Genearte a crypto wallet here.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-black text-white ${inter.className}`}>{children}</body>
    </html>
  );
}
