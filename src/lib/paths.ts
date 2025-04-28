
/**
 * Central location for all path-related constants and utilities
 * This helps ensure consistency across the application
 */

// Image paths
export const IMAGES = {
  // Backgrounds
  backgrounds: {
    hero: '/src/assets/images/backgrounds/hero-bg.jpg',
  },
  
  // Cards
  cards: {
    placeholder: '/src/assets/images/placeholders/card-placeholder.svg',
  },
  
  // Logos
  logos: {
    main: '/src/assets/images/logos/logo-main.png',
  },
  
  // Placeholders
  placeholders: {
    card: '/src/assets/images/placeholders/card-placeholder.svg',
  }
};

/**
 * Helper function to get an image's import path
 * @param path The path to the image relative to the src/assets/images directory
 * @returns The path that can be used in an import statement
 */
export function getImagePath(path: string): string {
  return `/src/assets/images/${path}`;
}
