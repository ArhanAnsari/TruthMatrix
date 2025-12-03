import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TruthMatrix - Fake News & Deepfake Detector",
  description: "AI-powered detection of fake news and deepfakes using Google Gemini. Real-time analysis for misinformation and manipulated content.",
  keywords: [
    "fake news detector",
    "deepfake detection",
    "AI verification",
    "misinformation detector",
    "fact checker",
    "Google Gemini",
    "AI analysis"
  ],
  authors: [
    {
      name: "TruthMatrix Team",
      url: "https://truthmatrix.example.com"
    }
  ],
  creator: "TruthMatrix",
  publisher: "TruthMatrix",
  formatDetection: {
    email: false,
    telephone: false,
    address: false
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false
    }
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://truthmatrix.example.com",
    title: "TruthMatrix - Fake News & Deepfake Detector",
    description: "AI-powered detection of fake news and deepfakes using Google Gemini",
    siteName: "TruthMatrix"
  },
  twitter: {
    card: "summary_large_image",
    title: "TruthMatrix - Fake News & Deepfake Detector",
    description: "AI-powered detection of fake news and deepfakes using Google Gemini"
  },
  category: "Technology",
  classification: "AI Detection Tool",
  applicationName: "TruthMatrix",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "TruthMatrix"
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  manifest: "/manifest.json"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light dark"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
