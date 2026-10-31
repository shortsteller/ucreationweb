# ✨ Uditas Creations (ucreationweb)

> **Uditas Creations** is a professional, high-converting e-commerce web application designed for a handcrafted statement & junk jewelry brand inspired by the architecture and feature set of `phuljhadi.com`.

Built with an original luxury-ethnic aesthetic — warm terracotta, deep bronze, soft gold, and ivory cream — paired with **Playfair Display** and **Poppins** typography.

---

## 🌟 Key Features & Format (Phuljhadi Parity)

1. **Comprehensive Jewelry Categories & Mega-Menu Navigation:**
   - **Earrings:** Jhumkas, Studs, Hoops, Chandbali, Ear Cuffs, Drop Earrings
   - **Necklaces:** Chokers, Choker Sets, Long Necklaces, Layered Sets, Hasli, Statement
   - **Bracelets & Bangles:** Handcrafted bangles, kadas, stack sets
   - **Rings:** Statement finger rings, adjustable toe rings
   - **Bridal Accessories:** Maangtikkas, Sheeshphools, Mathapatti, Modern & Traditional Mangalsutras
   - **Fashion Accessories:** Sunglasses, hair pins, embellished bags, oxidised anklets

2. **Multi-Buy & Bundle Deals (High-Conversion Offers):**
   - *"3 Earrings for ₹999"* bundle promotion
   - *"2 Necklaces for ₹1499"* mix-and-match
   - Full Bridal & Festive Combos with instant savings calculator

3. **Advanced Filtering & Dynamic Sorting:**
   - **By Price Range:** Under ₹500, ₹500–₹999, ₹1000–₹1499, ₹1500–₹1999, Above ₹2000
   - **By Material:** Kundan, Oxidised, Pearl, Polki, German Silver, Metal, Mirror Work, Temple Jewelry
   - **By Style:** Ethnic, Western, Boho, Minimalist
   - **Sorting:** Featured, Newest, Price (Low to High), Price (High to Low), Rating, and Most Popular
   - **Dual Views:** Switch between Responsive Grid and List layouts

4. **Interactive Search & Discovery:**
   - Full-screen fast search modal with trending search shortcuts (Kundan, Jhumkas, Oxidised, Choker)
   - Real-time product search with thumbnails and live pricing

5. **Cart, Wishlist & Checkout:**
   - Persistent Cart (local storage, badge count, quantity controls, coupon code box)
   - Persistent Wishlist (one-click toggle from cards and detail page, direct move to cart)
   - Free shipping progress threshold indicator (Free shipping above ₹999)
   - Complete checkout flow with Cash on Delivery (COD) and Online Payment options

6. **Order Tracking (`/track-order`):**
   - Order tracking by Order ID or Registered Phone/Email
   - Multi-stage timeline: Order Confirmed → Handcrafted & Packed → Dispatched via Courier (Bluedart / Delhivery) → In Transit → Out for Delivery → Delivered

7. **Customer Care & Transparency Policies (`/policies/:type`):**
   - Shipping Policy (Pan-India 26,000+ pin codes, international shipping to 40+ countries)
   - Returns & Exchange Policy (7-day hassle-free doorstep reverse pickup)
   - Privacy Policy & Terms of Service
   - Jewelry Care Instructions & FAQ

---

## 🏗️ Architecture & Integrations

The project is structured with dedicated services ready for immediate connection with external APIs:

```
src/
├── assets/             # Brand logos, icons, illustrations
├── components/
│   ├── Common/         # ProductCard, SearchModal, ScrollToTop
│   └── Layout/         # Header, Footer, AnnouncementBar
├── context/
│   ├── AuthContext.jsx     # User state, Firebase auth hooks
│   ├── CartContext.jsx     # Cart items, totals, persistence
│   └── WishlistContext.jsx # Wishlist items, persistence
├── data/
│   └── products.js     # Curated jewelry catalog, categories, collections, bundles
├── pages/
│   ├── Home.jsx            # Hero, trust bar, categories, promo grids, bundles, reviews, instagram
│   ├── Shop.jsx            # Dynamic filtered catalog with sidebar filters
│   ├── ProductDetail.jsx   # Image gallery, reviews submission, share, related items
│   ├── Collections.jsx     # Curated story collections
│   ├── Cart.jsx            # Cart layout with order summary & coupon code
│   ├── Wishlist.jsx        # Saved pieces with 1-click move to cart
│   ├── Checkout.jsx        # Address form & payment method selection
│   ├── OrderSuccess.jsx    # Order confirmation screen with generated tracking ID
│   ├── TrackOrder.jsx      # Shipment tracking status and timeline
│   ├── Policies.jsx        # Shipping, Returns, Privacy, Terms, FAQs
│   ├── About.jsx           # Artisan brand story, mission, and values
│   ├── Contact.jsx         # Contact form, phone, email, studio location
│   ├── Login.jsx           # Sign in with email or Google
│   ├── Register.jsx        # Registration
│   └── Profile.jsx         # Customer profile, saved addresses, order history
└── services/
    ├── firebase.js     # Firebase Auth (Email/Google) & Firestore DB interface
    ├── cloudinary.js   # Cloudinary dynamic transformations & unsigned upload preset
    └── payment.js      # Razorpay payment gateway SDK integration & COD handler
```

---

## 🔑 Environment Variables Setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Fill in your configuration credentials:
- **Firebase:** `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_PROJECT_ID`, etc.
- **Cloudinary:** `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_UPLOAD_PRESET`
- **Payment Gateway:** `VITE_RAZORPAY_KEY_ID`

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/shortsteller/ucreationweb.git
cd ucreationweb

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🎨 Color Palette & Design System

| Role | Color Name | Hex Code | Purpose |
|---|---|---|---|
| Primary | Deep Bronze | `#6B3A2A` | Main brand identity, headings, footer |
| Secondary | Warm Terracotta | `#C4724E` | Accent buttons, active highlights, badges |
| Accent | Soft Gold | `#D4A76A` | Stars, luxury accents, hover borders |
| Accent Light | Pale Sand | `#E8C99B` | Mega-menu banners, gradient backgrounds |
| Background | Ivory Cream | `#FDF6EC` | Primary page canvas |
| Background Alt | Warm Linen | `#F5EDE0` | Card backdrops, filter bars |
| Text | Dark Charcoal | `#2C2C2C` | High-contrast readable typography |
| Sage Accent | Vintage Sage | `#7A8B6F` | New arrival badge, delivery trust badges |

---

## 📄 License
Crafted with ❤️ for **Uditas Creations**. All rights reserved.
