# Asset Crony - Fractional Real Estate Investment Platform

A modern, responsive landing page for Asset Crony, a blockchain-based fractional real estate investment platform that allows users to invest in properties fractionally, trade ownership shares instantly, and borrow or lend against fractional assets.

## 🎯 Features

### Core Functionality
- **Fractional Investment**: Start investing in real estate from as low as $500
- **Secondary Market Trading**: Trade ownership shares instantly on a 24/7 marketplace
- **P2P Lending**: Borrow against holdings or lend to other investors
- **Blockchain Security**: Transparent, secure transactions on the blockchain

### Landing Page Sections
1. **Hero Section** - Compelling headline with animated property tokens
2. **How It Works** - 3-step process explanation
3. **Why Asset Crony** - Key benefits and advantages
4. **Live Secondary Market** - Real-time property listings and trading activity
5. **P2P Lending** - Peer-to-peer lending dashboard and application
6. **Investor Education** - Learning hub and educational content
7. **Call-to-Action** - Waitlist signup and demo scheduling
8. **Footer** - Comprehensive links and social media

### Interactive Components
- **Property Details Modal** - Detailed property information and trading options
- **Trading Modal** - Buy/sell shares with real-time calculations
- **P2P Loan Modal** - Apply for loans or browse lending opportunities

## 🎨 Design System

### Brand Colors
- **Navy Blue**: `#1e293b` - Primary brand color
- **Gold**: `#f59e0b` - Accent color for highlights
- **Light Gold**: `#fbbf24` - Secondary accent
- **Gray Scale**: Comprehensive gray palette for text and backgrounds

### Typography
- **Display Font**: Poppins (headings and brand elements)
- **Body Font**: Inter (body text and UI elements)

### Animations
- **Framer Motion**: Smooth page transitions and micro-interactions
- **Property Token Animation**: Floating tokens with network connections
- **Scroll Animations**: Elements animate into view as user scrolls

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts (ready for integration)
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd asset-crony
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The landing page is fully responsive and optimized for:
- **Desktop**: Full-featured experience with all animations
- **Tablet**: Adapted layout with touch-friendly interactions
- **Mobile**: Streamlined navigation and optimized content

## 🔧 Customization

### Adding New Sections
1. Create new components in `src/components/`
2. Import and add to the main page
3. Update navigation links as needed

### Modifying Colors
Update the CSS custom properties in `src/app/globals.css`:
```css
:root {
  --navy: #1e293b;
  --gold: #f59e0b;
  --light-gold: #fbbf24;
  /* ... other colors */
}
```

### Adding Animations
Use Framer Motion for new animations:
```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

## 📊 SEO Optimization

- **Meta Tags**: Comprehensive SEO meta tags
- **Open Graph**: Social media sharing optimization
- **Structured Data**: Ready for schema markup integration
- **Performance**: Optimized images and code splitting

## 🔮 Future Enhancements

### Backend Integration
- User authentication and wallet connection
- Real-time market data APIs
- Property listing management
- Trading and lending functionality

### Advanced Features
- Portfolio dashboard
- Advanced charting and analytics
- Mobile app development
- Multi-language support

## 📄 License

This project is proprietary software for Asset Crony.

## 🤝 Contributing

This is a private project. For internal development, please follow the established coding standards and component patterns.

---

Built with ❤️ for the future of real estate investing.