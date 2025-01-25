import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#ffffff',
          DEFAULT: '#2DD4BF',
          dark: '#0D9488',
        },

        background: {
          light: 'rgba(255, 255, 255, 0.08)',
          DEFAULT: '#0f0e11',
          dark: '#1F1F21',
        },

        error: {
          light: '#f87171',
          DEFAULT: ' #ef4444',
          dark: '#b91c1c',
        },

        success: {
          light: '#34d399',
          DEFAULT: '#10B981',
          dark: '#047857',
        },

        textColor: {
          light: '#ffffff',
          DEFAULT: '#2DD4BF',
          dark: '#9ca3af',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
