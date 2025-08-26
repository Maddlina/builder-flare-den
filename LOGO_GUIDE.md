# Smart Budget Logo System

## Overview
This document outlines the complete logo system for Smart Budget, including usage guidelines, file formats, and implementation details.

## Brand Identity
- **Brand Name**: Smart Budget
- **Tagline**: Intelligent Financial Control
- **Primary Colors**: Blue to Purple gradient (#3B82F6 to #9333EA)
- **Accent Colors**: Cyan to Blue gradient (#06B6D4 to #3B82F6)
- **Typography**: System fonts (system-ui, -apple-system, sans-serif)

## Logo Files

### 1. Main Logo (`public/logo.svg`)
- **Usage**: Marketing materials, headers, documentation
- **Dimensions**: 200x60px
- **Features**: Full horizontal layout with text and tagline
- **Contains**: 
  - Stylized "S" icon with chart elements
  - "Smart Budget" text
  - "Intelligent Financial Control" tagline
  - Gradient effects and sparkle elements

### 2. Favicon (`public/favicon.svg`)
- **Usage**: Browser tabs, bookmarks, PWA icons
- **Dimensions**: 32x32px
- **Features**: Compact icon-only version
- **Contains**: 
  - Simplified "S" symbol
  - Chart accent elements
  - Gradient background

### 3. Logo Component (`client/components/ui/logo.tsx`)
- **Usage**: React application navigation and UI
- **Sizes**: sm (8x8), md (10x10), lg (12x12)
- **Props**: 
  - `size`: Controls icon size
  - `showText`: Toggle text display
  - `className`: Additional styling

## Usage Guidelines

### ✅ Correct Usage
- Use on clean, uncluttered backgrounds
- Maintain proper spacing around logo
- Use original colors and gradients
- Scale proportionally
- Use high contrast backgrounds

### ❌ Avoid
- Stretching or distorting the logo
- Using on busy backgrounds
- Changing colors arbitrarily
- Adding drop shadows or effects
- Using pixelated versions

## Color Specifications

### Primary Gradient
```css
background: linear-gradient(90deg, #3B82F6 0%, #9333EA 100%);
```

### Accent Gradient
```css
background: linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%);
```

### Text Colors
- Primary text: Uses primary gradient as text fill
- Secondary text: #64748B (slate-500)
- Muted text: CSS variable --muted-foreground

## Implementation Examples

### React Component Usage
```tsx
import { Logo } from '@/components/ui/logo';

// Full logo with text
<Logo size="md" showText={true} />

// Icon only
<Logo size="sm" showText={false} />

// Large logo with custom styling
<Logo size="lg" className="my-custom-class" />
```

### HTML Usage
```html
<!-- Favicon in head -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />

<!-- Main logo in content -->
<img src="/logo.svg" alt="Smart Budget Logo" width="200" height="60" />
```

## Technical Notes

- All logos are SVG format for scalability
- Gradients use standard CSS linear-gradient syntax
- Compatible with dark/light themes
- Optimized for web performance
- Accessible with proper alt text

## File Structure
```
public/
���── favicon.svg          # Browser favicon
├── logo.svg            # Full horizontal logo
└── placeholder.svg     # (replaced)

client/components/ui/
└── logo.tsx            # React logo component
```

## Deployment Checklist

- [x] Favicon updated in index.html
- [x] Logo component created and integrated
- [x] Navigation updated with new branding
- [x] Build process tested and working
- [x] All brand colors consistent
- [x] Logo scales properly on different devices
- [x] SVG files optimized for web

---

**Smart Budget** - Intelligent Financial Control
