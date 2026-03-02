# Extrive Innovations — Wearable Robotics & Ergonomics Intelligence

> **Building the Future of Industrial Human Augmentation**

Extrive Innovations builds wearable exosuits and ergonomics intelligence systems designed to **reduce fatigue, prevent injuries, and elevate productivity** across the world's toughest manual environments — from manufacturing floors and logistics hubs to construction sites and defence operations.

---

## 🌐 Live Website

A premium, dark-themed single-page marketing website built to showcase Extrive's product ecosystem, mission, and industry partnerships.

### Tech Stack

| Layer        | Technology                                                    |
| ------------ | ------------------------------------------------------------- |
| Framework    | [Next.js 16](https://nextjs.org/) (App Router)               |
| Language     | JavaScript (React 19)                                        |
| Styling      | [Tailwind CSS v4](https://tailwindcss.com/) + custom CSS     |
| 3D           | [React Three Fiber](https://github.com/pmndrs/react-three-fiber) + [Drei](https://github.com/pmndrs/drei) |
| Icons        | [Lucide React](https://lucide.dev/)                          |
| Email        | [Nodemailer](https://nodemailer.com/)                        |
| Fonts        | Space Grotesk (headings) · Inter (body) — via `next/font`    |

---

## 🗂️ Project Structure

```
extrive/
├── public/
│   └── textures/           # Partner logos & product images
├── src/app/
│   ├── components/
│   │   ├── Navbar.js           # Fixed header with dropdown, mobile hamburger
│   │   ├── Earthbg.js          # Interactive 3D Earth (React Three Fiber)
│   │   ├── AboutSection.js     # Mission, 3-phase body diagram, industry grid
│   │   ├── ProductsSection.js  # Product card grid (BackEX, ShoulderEX, ForceX, ErgoEX)
│   │   ├── RecognitionSection.js # Partner logo marquee
│   │   ├── RequestDemoSection.js # Demo request form with floating labels
│   │   └── Contact.js          # Contact info + footer
│   ├── ProductsPage/
│   │   └── page.js             # Detailed product page (BackEX deep-dive)
│   ├── roi-calculator/
│   │   └── page.js             # Interactive ROI calculator
│   ├── api/
│   │   └── request-demo/       # API route for demo form submissions
│   ├── globals.css             # Design system & all custom styles
│   ├── layout.js               # Root layout with font configuration
│   └── page.js                 # Landing page (home)
└── package.json
```

---

## 🧩 Website Sections

### Landing Page (`/`)

| Section             | Description                                                                   |
| ------------------- | ----------------------------------------------------------------------------- |
| **Hero**            | Full-viewport 3D rotating Earth with headline, subtext, and CTA buttons      |
| **About**           | Company mission with interactive 3-phase body node diagram (Strain → Support → Augmentation) |
| **Products**        | 4-card grid: BackEX, ShoulderEX, ForceX, ErgoEX — with hover micro-interactions |
| **Recognition**     | Infinite marquee of strategic partner logos (AIC Mahindra, Boeing, Maruti Suzuki, NIDHI Prayas, Startup India) |
| **Request Demo**    | Glassmorphism form with floating labels, spotlight backgrounds, and shimmer effects |
| **Contact**         | 4-item grid (Email, Phone, Location, LinkedIn) + footer with address          |

### Products Page (`/ProductsPage`)

Full editorial-style deep-dive into the BackEX exosuit with hero, 4-column product overview, feature specs, and demo CTA.

### ROI Calculator (`/roi-calculator`)

Interactive calculator where enterprise prospects input workforce data (headcount, salary, injury rates, etc.) to estimate annual cost savings and payback period.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The development server runs at [http://localhost:3000](http://localhost:3000).

---

## 🎨 Design Language

- **Theme:** Dark industrial with warm orange accents (`#e86a00`)
- **Typography:** Space Grotesk for headings, Inter for body text
- **Motion:** Scroll-triggered fade-ins, phase cycling, pulse animations, hover micro-interactions
- **Glassmorphism:** Frosted-glass cards with backdrop blur and ambient glow
- **3D:** Interactive Earth globe rendered in WebGL via React Three Fiber

---

## 📱 Responsive Design

The site is fully responsive across all breakpoints:

- **Desktop** (1024px+): Full layouts with multi-column grids and hover effects
- **Tablet** (768px–1023px): Adaptive 2-column grids, scaled typography
- **Mobile** (< 768px): Single-column stacking, hamburger navigation, touch-optimised spacing

---

## 📄 License

© 2026 Extrive Innovations. All rights reserved.
