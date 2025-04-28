
# Images Directory

This directory contains images used throughout the Card Maker Pro application.

## Structure

- `backgrounds/` - Background images for different sections and pages
- `cards/` - Card-related images (templates, placeholders)
- `icons/` - Custom icons not available in Lucide
- `logos/` - Application logos in different formats and sizes
- `placeholders/` - Placeholder images for various components

## Usage

Import images using the following pattern:

```tsx
import backgroundImage from "@/assets/images/backgrounds/hero-bg.jpg";

// Then use in your component
<img src={backgroundImage} alt="Hero background" />
```

This approach ensures proper bundling and optimization by Vite.
