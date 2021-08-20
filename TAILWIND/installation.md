npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p

In the tailwind.config.js file,
- replace purge: []
- with purge: ['./index.html', './src/**/*.vue,js,ts,jsx,tsx}']


Under the src folder create index.css and add the following.
/* ./src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

In the main.js file, import index.css

npm install @tailwindcss/forms

Then, in tailwind.config.js, add require('@tailwindcss/forms') for plugins.

plugins: [
  require('@tailwindcss/forms')
]
