export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#FFFFFF',
          surface: '#F5F7FA',
          'surface-hover': '#EEF2F7',
          border: '#D9E2EC',
          primary: '#0B1B2B',
          muted: '#5B6B7A',
          accent: '#19B5A5',
          'accent-hover': '#149789',
          'accent-text': '#000000',
        },
        bg: '#FFFFFF',
        surface: '#F5F7FA',
        'surface-hover': '#EEF2F7',
        accent: '#19B5A5',
        'accent-hover': '#149789',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
        display: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        theme: '14px',
      },
    },
  },
  plugins: [],
};