# El Pacha Restaurant - Design Style Guide

## Design Philosophy

### Visual Language
- **Sophisticated Warmth**: Earth-toned palette creating an inviting, premium atmosphere
- **Modern Elegance**: Clean lines with subtle decorative elements
- **Cultural Fusion**: Tunisian hospitality meets contemporary design
- **Sensory Appeal**: Visual elements that evoke taste and aroma

### Color Palette
- **Primary Brown**: #8B4513 (Saddle Brown) - Warm, grounding, sophisticated
- **Secondary Beige**: #F5F5DC (Beige) - Clean, elegant, neutral
- **Accent Green**: #6B8E23 (Olive Drab) - Fresh, natural, premium
- **Text Dark**: #2C1810 (Rich Brown) - High contrast, readable
- **Text Light**: #FFFFFF (White) - For dark backgrounds
- **Background**: #FEFEFE (Off-white) - Clean, spacious feeling

### Typography
- **Display Font**: "Playfair Display" - Elegant serif for headings and hero text
- **Body Font**: "Open Sans" - Clean, readable sans-serif for content
- **Accent Font**: "Crimson Text" - For menu items and special callouts

## Visual Effects & Animations

### Core Libraries Integration
- **Anime.js**: Smooth entrance animations and micro-interactions
- **Splitting.js**: Text reveal effects for headings
- **Typed.js**: Typewriter effect for hero tagline
- **Splide.js**: Elegant image carousels and video gallery
- **ECharts.js**: Subtle data visualizations for restaurant stats
- **p5.js**: Creative background effects and ambient animations
- **PIXI.js**: Advanced visual effects for hero section

### Animation Strategy
- **Scroll Reveal**: Content fades in as user scrolls (opacity 0.9 to 1.0)
- **Text Effects**: 
  - Hero tagline: Typewriter animation with gradient color cycling
  - Section headings: Split-by-letter stagger reveal
  - Menu items: Subtle hover lift with shadow expansion
- **Image Effects**:
  - Hero image: Ken Burns slow zoom effect
  - Gallery images: Smooth scale transform on hover (1.0 to 1.05)
  - Featured dishes: 3D tilt effect with depth shadow

### Header Background Effect
- **Aurora Gradient Flow**: Subtle animated gradient using CSS and JavaScript
- **Color Transition**: Warm earth tones flowing horizontally
- **Opacity Layers**: Multiple gradient layers for depth
- **Performance**: Hardware-accelerated transforms for smooth animation

## Layout & Composition

### Grid System
- **Desktop**: 12-column grid with 24px gutters
- **Tablet**: 8-column grid with 20px gutters  
- **Mobile**: 4-column grid with 16px gutters

### Spacing Scale
- **Micro**: 4px, 8px, 12px
- **Small**: 16px, 24px, 32px
- **Medium**: 48px, 64px, 80px
- **Large**: 96px, 128px, 160px

### Visual Hierarchy
- **Hero Section**: Full viewport height with centered content
- **Content Sections**: Alternating layouts with consistent padding
- **Menu Layout**: Multi-column responsive grid with clear categorization
- **Gallery**: Masonry-style responsive grid with consistent gaps

## Interactive Elements

### Button Styles
- **Primary**: Brown background, white text, subtle shadow
- **Secondary**: Beige background, brown text, border highlight
- **Hover States**: Smooth color transitions with 3D lift effect

### Form Elements
- **Input Fields**: Clean borders with focus state animations
- **Validation**: Real-time feedback with color-coded states
- **Submit Buttons**: Loading states with spinner animations

### Navigation
- **Desktop**: Horizontal menu with underline hover effects
- **Mobile**: Slide-out drawer with smooth transitions
- **Active States**: Clear visual indicators for current page

## Responsive Design Strategy

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large**: 1440px+

### Mobile Optimizations
- **Touch Targets**: Minimum 44px for all interactive elements
- **Typography**: Larger base font size (18px vs 16px desktop)
- **Spacing**: Increased padding for better thumb navigation
- **Images**: Optimized loading with progressive enhancement

## Accessibility Considerations

### Color Contrast
- **Text on Background**: Minimum 4.5:1 ratio
- **Interactive Elements**: Clear visual distinction
- **Focus States**: High contrast outline indicators

### Motion Preferences
- **Reduced Motion**: Respect user preferences for reduced animations
- **Fallback States**: Static alternatives for animated content
- **Performance**: Smooth 60fps animations with hardware acceleration