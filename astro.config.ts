import { defineConfig, type ViteUserConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import basicSsl from '@vitejs/plugin-basic-ssl';
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';

const env = loadEnv('', process.cwd(), 'STORYBLOK');

// https://astro.build/config
export default defineConfig({
  site: 'https://site.com/',
  output: 'hybrid',
  adapter: cloudflare({
    routes: {
      strategy: 'include',
    },
  }),
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      components: {
        // Component paths are relative to the src directory.
        page: 'storyblok/Page',
      },
      apiOptions: {
        region: 'us',
      },
    }),
  ],
  vite: {
    plugins: [basicSsl()] as ViteUserConfig['plugins'],
    server: {
      https: true,
    },
  },
});