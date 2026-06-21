<div align="center">

```
░█████╗░██████╗░████████╗██╗  ██╗██╗██╗██████╗ 
██╔══██╗██╔══██╗╚══██╔══╝██║  ██║██║██║██╔══██╗
███████║██████╔╝   ██║   ███████║██║██║██████╔╝
██╔══██║██╔══██╗   ██║   ██╔══██║██║██║██╔══██╗
██║  ██║██║  ██║   ██║   ██║  ██║╚█████╔╝██████╔╝
╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚════╝ ╚═════╝ 
```

### *Where art finds its audience — and artists find their collectors.*

<br/>

[![Live Site](https://img.shields.io/badge/🌐%20Live%20Site-art--hub--sigma.vercel.app-C2693F?style=for-the-badge&logoColor=white)](https://art-hub-sigma.vercel.app)
[![Client Repo](https://img.shields.io/badge/📁%20Client%20Repo-GitHub-1E1E1E?style=for-the-badge&logo=github)](https://github.com/u2404057-cuet/ArtHub)
[![Server Repo](https://img.shields.io/badge/📁%20Server%20Repo-GitHub-6B6560?style=for-the-badge&logo=github)](https://github.com/u2404057-cuet/ArtHub-server)

<br/>

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-7.3-47A248?style=flat-square&logo=mongodb)
![Stripe](https://img.shields.io/badge/Stripe-Payment-635BFF?style=flat-square&logo=stripe)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38BDF8?style=flat-square&logo=tailwindcss)
![BetterAuth](https://img.shields.io/badge/BetterAuth-1.6-C2693F?style=flat-square)

</div>

---

## 🎨 What is ArtHub?

**ArtHub** is a full-stack online art marketplace that bridges the gap between independent artists and art lovers around the world. Traditional art buying is locked behind gallery doors and physical exhibitions — ArtHub tears those walls down.

Artists upload and manage their original works. Buyers discover, collect, and purchase them securely. An admin oversees the entire ecosystem. All in one calm, gallery-inspired platform.

> *Built as a capstone full-stack project demonstrating role-based authentication, Stripe payment integration, JWT-secured APIs, and real-world CRUD operations across three user roles.*

---

## ✨ Key Features

### 🔐 Authentication & Roles
- Email/password registration and login with **JWT** (7-day expiry)
- **Google OAuth** via BetterAuth
- Three distinct roles: **User (Buyer)**, **Artist**, **Admin**
- Role-based protected routes on both frontend and backend
- Private routes persist on page reload — no unwanted redirects to login

### 🖼️ Browse & Discover
- Public artwork gallery with **search**, **category filter**, **price range filter**, and **sort** (newest, price low-high, price high-low)
- Paginated results (9 per page)
- Responsive grid — 2 columns mobile, 3 tablet, 4 desktop
- Skeleton loaders while fetching

### 🛒 Artwork Purchase (Stripe)
- Authenticated buyers can purchase artworks via **Stripe Checkout**
- Backend enforces **subscription tier limits** before creating checkout session
- Purchase records stored via **Stripe Webhook** — not on redirect

### 💳 Subscription Tiers (Stripe)
| Tier | Max Purchases | Price |
|------|--------------|-------|
| Free | 3 artworks | $0 |
| Pro | 9 artworks | $9.99/mo |
| Premium | Unlimited | $19.99/mo |

### 🎨 Artist Dashboard
- Upload artworks with **imgBB** image hosting
- Edit and delete own artworks
- View sales history (artwork title, buyer, date, amount)

### 👤 User Dashboard
- Purchase history table
- Bought artworks gallery
- Subscription tier overview
- Profile management

### 🛡️ Admin Dashboard
- Manage all users — change roles (user / artist / admin)
- Delete any artwork on the platform
- View all platform transactions
- Analytics: total users, artists, artworks sold, revenue
- Charts: sales over time, artworks by category

### 💬 Comment System
- Only buyers who have **purchased** an artwork can comment on it
- Edit and delete own comments
- Backend verifies purchase record before allowing comment POST

---

## 🗂️ Project Structure

```
📦 Client (Next.js App Router)
├── src/app/
│   ├── (auth)/          → login, register
│   ├── (main)/          → home page
│   ├── artworks/        → browse + [artId] detail
│   ├── dashboard/       → user / artist / admin
│   └── api/auth/        → BetterAuth handler
├── src/components/      → Navbar, Footer, ArtCard, shared UI
└── src/lib/             → fetch helpers, auth config

📦 Server (Express.js)
└── index.js             → all routes, models, middleware in one file
    ├── /arts            → CRUD for artworks
    ├── /users           → profile, top artists
    ├── /transactions    → purchase + subscription history
    ├── /admin           → user management, analytics
    └── /stripe          → checkout sessions + webhook
```

---

## 🚀 Run Locally

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Stripe account
- Google OAuth credentials
- imgBB API key

### Client

```bash
git clone https://github.com/u2404057-cuet/ArtHub.git
cd ArtHub
npm install
```

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_key
```

```bash
npm run dev
```

### Server

```bash
git clone https://github.com/u2404057-cuet/ArtHub-server.git
cd ArtHub-server
npm install
```

Create `.env`:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
CLIENT_URL=http://localhost:3000
```

```bash
node index.js
```

---

## 📦 NPM Packages Used

### Client
| Package | Purpose |
|---------|---------|
| `next` ^16.2.9 | React framework with App Router |
| `react` 19.2.4 | UI library |
| `better-auth` ^1.6.19 | Authentication (Google OAuth + email/password) |
| `@heroui/react` ^3.2.1 | UI component library |
| `@heroui/styles` ^3.2.1 | HeroUI design tokens |
| `@gravity-ui/icons` ^2.18.0 | Icon system |
| `tailwindcss` ^4 | Utility-first CSS framework |
| `framer-motion` ^12.40.0 | Animations |
| `stripe` ^22.2.2 | Stripe server-side SDK |
| `@stripe/stripe-js` ^9.8.0 | Stripe client-side SDK |
| `react-hook-form` ^7.79.0 | Form state management |
| `react-hot-toast` ^2.6.0 | Toast notifications |
| `mongodb` ^7.3.0 | MongoDB driver (BetterAuth adapter) |

### Server
| Package | Purpose |
|---------|---------|
| `express` ^5.2.1 | Web framework |
| `cors` ^2.8.6 | Cross-origin resource sharing |
| `mongodb` ^7.3.0 | MongoDB native driver |
| `dotenv` ^17.4.2 | Environment variable management |
| `jsonwebtoken` | JWT generation and verification |

---

## 🌐 Live Links

| Resource | URL |
|----------|-----|
| 🎨 Live Site | [art-hub-sigma.vercel.app](https://art-hub-sigma.vercel.app) |
| 📁 Client Repo | [github.com/u2404057-cuet/ArtHub](https://github.com/u2404057-cuet/ArtHub) |
| 📁 Server Repo | [github.com/u2404057-cuet/ArtHub-server](https://github.com/u2404057-cuet/ArtHub-server) |

---

## 🏗️ Tech Stack

<div align="center">

| Layer | Technology |
|-------|-----------|
| Frontend Framework | Next.js 16 (App Router) |
| UI Library | HeroUI v3 + Tailwind CSS v4 |
| Icons | Gravity UI Icons |
| Animation | Framer Motion |
| Authentication | BetterAuth (Google OAuth + JWT) |
| Database | MongoDB Atlas (Native Driver) |
| Payments | Stripe Checkout + Webhooks |
| Image Hosting | imgBB API |
| Backend | Node.js + Express.js |
| Deployment | Vercel (client) + Render (server) |

</div>

---

<div align="center">

*Made with care by* **Rahimul** — *CUET CSE*

[![GitHub](https://img.shields.io/badge/GitHub-u2404057--cuet-1E1E1E?style=flat-square&logo=github)](https://github.com/u2404057-cuet)

</div>
