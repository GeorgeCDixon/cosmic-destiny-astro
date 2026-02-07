export const colors = {
  // Primary Colors
  primary: '#9333ea',      // Purple-600
  secondary: '#ec4899',    // Pink-600
  accent: '#f59e0b',       // Amber-500
  
  // Gradient Colors
  gradients: {
    primary: ['#9333ea', '#ec4899'],           // Purple to Pink
    secondary: ['#ec4899', '#f43f5e'],         // Pink to Rose
    accent: ['#f59e0b', '#d97706'],            // Amber gradient
    success: ['#10b981', '#059669'],           // Green gradient
    purple: ['#9333ea', '#7c3aed'],            // Purple shades
    pink: ['#ec4899', '#db2777'],              // Pink shades
    blue: ['#3b82f6', '#2563eb'],              // Blue gradient
    emerald: ['#10b981', '#14b8a6'],           // Emerald to Teal
    cosmic: ['#9333ea', '#ec4899', '#f59e0b'], // Multi-color cosmic
  },
  
  // Topic Colors
  topics: {
    love: {
      primary: '#ec4899',
      light: '#fce7f3',
      gradient: ['#ec4899', '#f43f5e'],
    },
    career: {
      primary: '#10b981',
      light: '#d1fae5',
      gradient: ['#10b981', '#14b8a6'],
    },
    health: {
      primary: '#3b82f6',
      light: '#dbeafe',
      gradient: ['#3b82f6', '#06b6d4'],
    },
    spiritual: {
      primary: '#9333ea',
      light: '#f3e8ff',
      gradient: ['#9333ea', '#7c3aed'],
    },
  },
  
  // Background Colors
  background: {
    primary: '#ffffff',
    secondary: '#f9fafb',    // Gray-50
    tertiary: '#f3f4f6',     // Gray-100
    dark: '#111827',         // Gray-900
  },
  
  // Text Colors
  text: {
    primary: '#111827',      // Gray-900
    secondary: '#6b7280',    // Gray-500
    tertiary: '#9ca3af',     // Gray-400
    inverse: '#ffffff',
    disabled: '#d1d5db',     // Gray-300
  },
  
  // Status Colors
  status: {
    success: '#10b981',      // Green-500
    error: '#ef4444',        // Red-500
    warning: '#f59e0b',      // Amber-500
    info: '#3b82f6',         // Blue-500
  },
  
  // Border Colors
  border: {
    light: '#e5e7eb',        // Gray-200
    medium: '#d1d5db',       // Gray-300
    dark: '#9ca3af',         // Gray-400
  },
  
  // Overlay Colors
  overlay: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.3)',
    dark: 'rgba(0, 0, 0, 0.6)',
    white: 'rgba(255, 255, 255, 0.9)',
  },
  
  // Shadow Colors
  shadow: {
    sm: 'rgba(0, 0, 0, 0.05)',
    md: 'rgba(0, 0, 0, 0.1)',
    lg: 'rgba(0, 0, 0, 0.15)',
    xl: 'rgba(0, 0, 0, 0.2)',
  },
  
  // Transparent
  transparent: 'transparent',
};

export type Colors = typeof colors;