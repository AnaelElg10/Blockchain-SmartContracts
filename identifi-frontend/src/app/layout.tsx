import type { Metadata } from "next";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import Navbar from "./components/Navbar";
import { FeedbackProvider } from "./context/feadback";

export const metadata: Metadata = {
  title: "IdentiFi",
  description:
    "Identifi your identity with the our DApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
      <ThirdwebProvider>
          <main className="container max-w-[1280px] xl:mx-auto px-2">
            <Navbar />
            <FeedbackProvider>    
              {children}
            </FeedbackProvider>
          </main>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
