import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';

import createVitePlugins from './plugins';

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line node/prefer-global/process
  const env = loadEnv(mode, process.cwd()) as ImportMetaEnv;
  const { VITE_BASE_URL, VITE_APP_PORT, VITE_API_URL, VITE_API_PROXY_URL } =
    env;

  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    plugins: createVitePlugins(env),
    base: VITE_BASE_URL,
    server: {
      port: +VITE_APP_PORT,
      proxy: {
        [VITE_API_URL]: {
          target: VITE_API_PROXY_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(new RegExp(`^${VITE_API_URL}`), ''),
        },
      },
      host: true,
    },
  };
});
