import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import ConvexClientProvider from "./ConvexClientProvider";

import Nav from "@/components/Nav";
import AdminNav from "@/components/AdminNav";
import Footer from "@/components/Footer";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Creative Finance",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClientProvider>
      <html lang="en">
        <body
          className={`${inter.className} bg-no-repeat bg-cover bg-center bg-fixed m-0 p-0 w-screen overflow-x-hidden`}
          style={{ backgroundImage: `url('/cf-bg.png')` }}
        >
          <Toaster />
          <Nav />
          <AdminNav />
          {children}
          <Footer />
        </body>
      </html>
    </ConvexClientProvider>
  );
}
