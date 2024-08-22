import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import ModalProvider from "providers/modal-provider";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
