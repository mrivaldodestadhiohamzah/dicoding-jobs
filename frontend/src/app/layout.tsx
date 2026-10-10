import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/components/QueryProvider";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Dicoding Jobs | Find work that moves you",
  description: "Browse thoughtful opportunities from growing teams.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <SiteHeader />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
