/**
 * Responsive utility functions and constants
 */

export const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const spacing = {
  mobile: {
    container: 'px-4',
    section: 'py-6',
    gap: 'gap-4',
  },
  tablet: {
    container: 'px-6',
    section: 'py-8',
    gap: 'gap-6',
  },
  desktop: {
    container: 'px-8',
    section: 'py-12',
    gap: 'gap-8',
  },
} as const;

export const typography = {
  mobile: {
    h1: 'text-2xl md:text-3xl lg:text-4xl xl:text-5xl',
    h2: 'text-xl md:text-2xl lg:text-3xl xl:text-4xl',
    h3: 'text-lg md:text-xl lg:text-2xl xl:text-3xl',
    h4: 'text-base md:text-lg lg:text-xl xl:text-2xl',
    body: 'text-sm md:text-base',
    small: 'text-xs md:text-sm',
  },
} as const;

/**
 * Get responsive classes for container padding
 */
export const getContainerPadding = (variant: 'mobile' | 'tablet' | 'desktop' = 'mobile') => {
  return spacing[variant].container;
};

/**
 * Get responsive classes for section padding
 */
export const getSectionPadding = (variant: 'mobile' | 'tablet' | 'desktop' = 'mobile') => {
  return spacing[variant].section;
};

/**
 * Responsive grid classes
 */
export const gridClasses = {
  card: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6',
  twoCol: 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6',
  threeCol: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6',
  fourCol: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6',
} as const;

/**
 * Responsive button classes
 */
export const buttonClasses = {
  primary: 'px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-semibold rounded-full transition-all duration-200',
  secondary: 'px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium rounded-full transition-all duration-200',
  icon: 'p-2 md:p-3 rounded-full transition-all duration-200',
  mobile: 'px-6 py-3 text-base font-semibold rounded-full transition-all duration-200',
} as const;

/**
 * Responsive modal classes
 */
export const modalClasses = {
  overlay: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4',
  container: 'bg-white rounded-lg md:rounded-xl p-4 md:p-6 lg:p-8 max-w-full md:max-w-2xl lg:max-w-3xl w-full mx-4 max-h-[90vh] md:max-h-[85vh] overflow-y-auto relative',
  closeButton: 'absolute top-2 right-2 md:top-4 md:right-4 text-red-500 hover:text-red-700 transition-colors duration-200 p-2',
} as const;

/**
 * Touch-friendly sizes for mobile
 */
export const touchTarget = {
  min: 'min-h-[44px] min-w-[44px]', // Apple's recommended minimum
  button: 'px-6 py-3', // Larger buttons on mobile
  icon: 'p-3', // Larger icon buttons
} as const;

