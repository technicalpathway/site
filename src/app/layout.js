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
  metadataBase: new URL('https://technicalpathways.com'),
  openGraph: {
    title: 'TechnicalPathways',
    description: 'A better way to master technical interviews.',
    images: [{
      url: '/MetadataBanner.png',
      width: 1200,
      height: 630,
      alt: 'TechnicalPathways - Master Technical Interviews'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechnicalPathways',
    description: 'A better way to master technical interviews.',
    images: ['/MetadataBanner.png'],
  }
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