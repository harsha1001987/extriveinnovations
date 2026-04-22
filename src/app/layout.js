import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import CustomCursor from "./components/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

/* ── Site-wide metadata ──────────────────────────────── */
export const metadata = {
  metadataBase: new URL("https://extriveinnovations.com"),

  title: {
    default:
      "Extrive Innovations — Wearable Robotics & Ergonomics Intelligence",
    template: "%s | Extrive Innovations",
  },

  description:
    "Extrive builds wearable robotics and ergonomics intelligence systems designed to reduce fatigue, prevent injuries, and elevate productivity.",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://extriveinnovations.com",
    siteName: "Extrive Innovations",
    title:
      "Extrive Innovations — Wearable Robotics & Ergonomics Intelligence",
    description:
      "Wearable robotics and ergonomics intelligence systems designed to reduce fatigue, prevent injuries, and elevate productivity.",
  },

  twitter: {
    card: "summary",
    title:
      "Extrive Innovations — Wearable Robotics & Ergonomics Intelligence",
    description:
      "Wearable robotics and ergonomics intelligence systems designed to reduce fatigue, prevent injuries, and elevate productivity.",
  },

  alternates: {
    canonical: "https://extriveinnovations.com",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },

  manifest: "/site.webmanifest",
};

/* ── Viewport (theme color for browser UI) ─────────────── */
export const viewport = {
  themeColor: "#000000",
};

/* ── Organization JSON-LD (injected once, site-wide) ── */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Extrive Innovations Private Limited",
  url: "https://extriveinnovations.com",
  email: "info@extriveinnovations.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
