import React from "react";
import Header from "../shared/Header";
import { Footer } from "../shared/Footer";
import { Toaster } from "sonner";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Toaster richColors position="top-right" />

      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
