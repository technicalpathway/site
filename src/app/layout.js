import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthModalProvider } from './context/AuthModalContext'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TechnicalPathways",
  description: "A better way to master technical interviews.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthModalProvider>
          <main className="min-h-screen">
            {children}
            
          </main>
        </AuthModalProvider>
      </body>
    </html>
  );
}
