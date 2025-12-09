module.exports = {
  purge: [],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        scholarstream: {
          primary: '#2563eb',
          'primary-content': '#fff',
          secondary: '#6366f1', 
          accent: '#f59e42', 
          neutral: '#334155', 
          'base-100': '#f8fafc', 
          info: '#0ea5e9', 
          success: '#22c55e', 
          warning: '#facc15', 
          error: '#ef4444', 
        },
      },
    ],
    darkTheme: 'scholarstream',
    base: true,
    styled: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: '',
  },
  plugins: [require('daisyui')],
}
