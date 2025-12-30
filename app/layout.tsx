"use client";

import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Toaster } from "sonner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/20">
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}