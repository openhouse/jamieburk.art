import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}', './mdx-components.tsx'],
  theme: {
    extend: {
      colors: {
        broadway: '#0b5f81',
        paper: '#eeefec',
        ink: '#343435',
        muted: '#5e5f61',
        surface: '#fffdf8'
      }
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        jamie: {
          primary: '#0b5f81',
          secondary: '#5e5f61',
          accent: '#0b5f81',
          neutral: '#343435',
          'base-100': '#eeefec',
          'base-200': '#fffdf8',
          'base-300': '#d7d8d4',
          info: '#0b5f81',
          success: '#327a55',
          warning: '#a46316',
          error: '#9f2d2d'
        }
      }
    ]
  }
};
export default config;
