/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'), ],
  daisyui: {
    themes: [
      {
        dark: {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          ...require('daisyui/src/theming/themes')['[data-theme=dark]'],
          primary: '#00aeef',
          'primary-content': '#003838',
          'base-content': '#fff',
          accent: '#7F16D3',
          secondary: '#D400A6',
          info: '#4bffff',
          success: '#82C91E',
          warning: '#EF5A24',
          error: '#B6242E',
        },
      },
      'light',
    ],
  },
}

