import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
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
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
