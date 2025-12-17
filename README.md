# Roboi Admin Dashboard

> **Video Analytics · 7,000+ Pumps · Real-time AI**

A production-grade, highly scalable Next.js application for managing and visualizing video analytics data across 7,000+ fuel pumps with real-time AI capabilities.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18.3-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)
![ECharts](https://img.shields.io/badge/ECharts-5.5-red?style=flat-square)
![Mapbox](https://img.shields.io/badge/Mapbox-3.2-4264fb?style=flat-square&logo=mapbox)

## 🚀 Features

- **Real-time Analytics**: Live data updates via WebSocket
- **Interactive Visualizations**: High-quality charts and maps
- **Multi-level Drill-down**: HQ → State → City → Vehicle
- **ANPR Vehicle Tracking**: Comprehensive vehicle profile management
- **Advanced Reporting**: PDF, Excel, CSV export capabilities
- **Responsive Design**: Works seamlessly on all devices
- **Dark Mode**: Built-in theme switching
- **Performance Optimized**: Code splitting, lazy loading, caching

## ✨ Highlights

- **Optimized Dependencies**: Only 21 production dependencies - lean and efficient
- **Dual State Management**: TanStack Query for server state + Zustand for client state
- **Two-Library Visualization**: ECharts for charts + Mapbox for maps (no bloat)
- **Production-Ready**: Battle-tested libraries, no experimental dependencies
- **Accessible UI**: Radix UI components with built-in accessibility
- **Type-Safe**: JSDoc annotations for better IDE support

## 📊 Pages

### 1. HQ Overview (`/hq-overview`)
High-level overview of all 7,000+ pumps with real-time metrics, geographic heat maps, and alert timelines.

### 2. State-wise Analytics (`/state-wise`)
State-level drill-down with pump distribution, performance trends, and city comparisons.

### 3. City-wise Analytics (`/city-wise`)
City-level detailed analytics with pump locations, traffic patterns, and performance metrics.

### 4. ANPR Captured Vehicles (`/anpr-vehicles`)
View and search all captured vehicles with advanced filtering and bulk export.

### 5. Vehicle Profile (`/vehicle-profile/[vehicleId]`)
Detailed vehicle information, visit history, analytics, and downloadable reports.

## 🛠️ Tech Stack

### Core
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **JavaScript** - Programming language
- **Tailwind CSS** - Utility-first CSS framework

### Visualization
- **Apache ECharts** - Production-grade charting library (Line, Bar, Pie, Gauge, Heatmap, Treemap, Sankey)
- **Mapbox GL JS** - Interactive maps and geospatial visualization

### State Management
- **TanStack Query** - Server state, caching & background updates
- **Zustand** - Client state (UI state, filters, preferences)

### Data Fetching
- **Axios** - HTTP client with interceptors

### UI Components
- **Radix UI** - Accessible, unstyled UI primitives
- **React Icons** - Comprehensive icon library

### Export & Reports
- **jsPDF** - PDF generation
- **xlsx** - Excel export

## 📁 Project Structure

```
inveye-web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (dashboard)/       # Dashboard pages
│   │   └── api/               # API routes
│   ├── components/            # Reusable components
│   │   ├── ui/               # Base UI components
│   │   ├── charts/           # Chart components
│   │   ├── maps/             # Map components
│   │   ├── widgets/          # Dashboard widgets
│   │   ├── features/         # Feature-specific components
│   │   └── common/           # Common components
│   ├── lib/                  # Library configurations
│   ├── hooks/                # Custom React hooks
│   ├── services/             # API services
│   ├── store/                # State management
│   ├── utils/                # Utility functions
│   ├── config/               # Configuration files
│   └── styles/               # Global styles
├── public/                   # Static assets
└── ...config files
```


## 🚦 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd inveye-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   - Mapbox token
   - API URLs
   - Feature flags

4. **Create project structure**
   ```bash
   chmod +x setup-structure.sh
   ./setup-structure.sh
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start development server

# Production
npm run build           # Build for production
npm start               # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint errors
npm run format          # Format code with Prettier
npm run format:check    # Check code formatting

# Testing
npm test                # Run tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Generate coverage report
```

## 🎨 Design System

### Colors
- **Primary**: Blue shades for main actions
- **Secondary**: Purple shades for secondary elements
- **Success**: Green for positive states
- **Warning**: Orange for warnings
- **Danger**: Red for errors
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Font Family**: Inter (sans), Outfit (display), JetBrains Mono (mono)
- **Font Sizes**: 2xs to 9xl scale

### Components
All components follow atomic design principles:
- **Atoms**: Button, Input, Badge, etc.
- **Molecules**: Card, Dropdown, Modal, etc.
- **Organisms**: DataTable, Charts, Maps, etc.
- **Templates**: Layouts
- **Pages**: Complete pages

## 🔧 Configuration

### Path Aliases
```javascript
@/*              → ./src/*
@/components/*   → ./src/components/*
@/ui/*           → ./src/components/ui/*
@/charts/*       → ./src/components/charts/*
@/providers/*    → ./src/providers/*
@/hooks/*        → ./src/hooks/*
// ... and more
```

### Environment Variables
See `.env.example` for all available environment variables.

## 📊 Visualization Libraries

### Apache ECharts
Used for all standard charts:
- Line charts (trends over time)
- Bar charts (comparisons)
- Pie charts (distributions)
- Gauge charts (performance metrics)
- Heat maps (intensity visualization)
- Tree maps (hierarchical data)
- Sankey charts (flow visualization)

**Why ECharts?**
- Production-ready and battle-tested
- Excellent performance with large datasets
- Comprehensive chart types
- Great documentation
- Free and open-source

### Mapbox GL JS
Used for all map visualizations:
- State/city maps
- Pump locations with markers
- Heat map overlays
- Marker clustering
- Route visualization
- Custom geographic layers

**Why Mapbox?**
- Best-in-class map performance
- Highly customizable
- Excellent for custom visualizations
- Free tier available (50,000 loads/month)
- WebGL-based rendering

## 🔐 Security

- JWT-based authentication
- Role-based access control
- API rate limiting
- Input sanitization
- XSS protection
- HTTPS enforcement

## 🛡️ Middleware

The application uses Next.js middleware (`src/middleware.js`) for:
- **Authentication**: Protect routes, redirect to login
- **Authorization**: Role-based access control
- **Security Headers**: X-Frame-Options, CSP, etc.
- **CORS**: API route configuration
- **Redirects**: Automatic redirects based on auth state

## 🚀 Performance

- Code splitting by route
- Dynamic imports for heavy components
- Image optimization with Next.js Image
- Memoization of expensive calculations
- Virtual scrolling for large lists
- Debounced search and filters
- Progressive loading

## 📦 Export Capabilities

- **PDF**: Reports with charts and tables
- **Excel**: Formatted data exports
- **CSV**: Simple data exports
- **PNG/SVG**: Chart images

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run linting and tests
4. Submit a pull request

## 📝 Code Style

- Follow ESLint rules
- Use Prettier for formatting
- Write JSDoc comments for functions
- Use meaningful variable names
- Keep components small and focused

## 🐛 Debugging

- Use React DevTools for component debugging
- Use Redux DevTools for state debugging
- Check browser console for errors
- Use Network tab for API debugging


## 📄 License

Proprietary - All rights reserved

## 👥 Team

Developed by the Invincible Ocean Team

---

**Version**: 1.0.0  
**Last Updated**: 2025-12-12
