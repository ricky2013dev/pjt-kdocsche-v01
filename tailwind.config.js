/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Enhanced font sizes for better mobile readability
      fontSize: {
        'xs': ['0.875rem', { lineHeight: '1.25rem' }],     // 14px instead of 12px
        'sm': ['0.9375rem', { lineHeight: '1.375rem' }],   // 15px instead of 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],        // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],     // 18px
        'xl': ['1.25rem', { lineHeight: '1.875rem' }],     // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],         // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],    // 30px
      },
    },
  },
  plugins: [],
}
