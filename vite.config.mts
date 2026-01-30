import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';

import createVitePlugins from './plugins';

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line node/prefer-global/process
  const env = loadEnv(mode, process.cwd()) as ImportMetaEnv;

  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    plugins: createVitePlugins(env),
  };
});
