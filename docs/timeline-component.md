# Horizontal Timeline Component

## Overview

The `WhoIAm` component is a scroll-triggered horizontal timeline that showcases your journey with a fixed left panel and horizontally scrolling right panel.

## Features

### 🎯 Core Functionality
- **Fixed Left Panel**: Contains avatar, name, summary, philosophy, and traits
- **Horizontal Scroll**: Right panel scrolls horizontally as user scrolls vertically
- **Progress Bar**: Shows scroll progress at the top of the screen
- **Mobile Responsive**: Falls back to vertical layout on mobile devices

### 🎨 Design Elements
- **GSAP ScrollTrigger**: Powers the horizontal scrolling animation
- **Staggered Animations**: Cards animate in with scale and opacity effects
- **Smooth Transitions**: All animations use easing for natural feel
- **Hover Effects**: Cards have subtle hover animations

### 📱 Responsive Design
- **Desktop**: Full horizontal timeline with pinned left panel
- **Mobile**: Vertical stack layout with all content visible
- **Breakpoint**: Switches at 1024px (lg breakpoint)

## Technical Implementation

### GSAP Setup
```typescript
// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}
```

### Horizontal Scroll Logic
```typescript
const scrollWidth = cardsRef.current.scrollWidth
const viewportWidth = scrollRef.current.offsetWidth
const scrollDistance = scrollWidth - viewportWidth

gsap.to(cardsRef.current, {
  x: -scrollDistance,
  ease: "none",
  scrollTrigger: {
    trigger: containerRef.current,
    start: "top top",
    end: `+=${scrollDistance}`,
    scrub: 1,
    pin: true,
    anticipatePin: 1,
  },
})
```

### Mobile Detection
```typescript
const [isMobile, setIsMobile] = useState(false)

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 1024)
  }
  
  checkMobile()
  window.addEventListener('resize', checkMobile)
  
  return () => window.removeEventListener('resize', checkMobile)
}, [])
```

## Data Structure

### Timeline Events
```typescript
const timelineEvents = [
  {
    icon: "🎓",
    title: "Student Life",
    description: "Started Computer Science. Learned programming, logic, and discipline.",
  },
  // ... more events
]
```

### Traits
```typescript
const traits = [
  "Systems Thinker",
  "Psychology",
  "Influence & Communication",
  // ... more traits
]
```

## Usage

The component is already integrated into the main page layout at `src/app/page.tsx`:

```tsx
import WhoIAm from "@/components/who-i-am"

// In the page component
<section id="who-i-am" className="py-20">
  <WhoIAm />
</section>
```

## Customization

### Adding New Timeline Events
Simply add new objects to the `timelineEvents` array:

```typescript
{
  icon: "🚀",
  title: "New Achievement",
  description: "Description of your new achievement.",
}
```

### Modifying Traits
Update the `traits` array to reflect your personal characteristics.

### Styling
The component uses Tailwind CSS classes and can be customized by:
- Modifying the color classes (bg-primary, text-foreground, etc.)
- Adjusting spacing (p-8, space-y-8, etc.)
- Changing card dimensions (min-w-[350px], etc.)

## Performance Considerations

- GSAP animations are properly cleaned up on component unmount
- Mobile detection prevents unnecessary GSAP setup on mobile
- ScrollTrigger contexts are properly reverted to prevent memory leaks

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- GSAP ScrollTrigger requires JavaScript enabled
- Graceful fallback to static layout if GSAP fails to load 