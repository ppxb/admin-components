import type { PluginOption } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';

import createAppInfoPlugin from './app-info';
import createCompressionPlugin from './compression';
import createDevtools from './devtools';

export default function createVitePlugins(viteEnv: ImportMetaEnv) {
  const { VITE_ENABLE_DEVTOOLS, VITE_APP_VERSION } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), tailwindcss()];
  vitePlugins.push(createAppInfoPlugin(VITE_APP_VERSION));
  vitePlugins.push(createCompressionPlugin());
  vitePlugins.push(createDevtools(VITE_ENABLE_DEVTOOLS));
  vitePlugins.push();

  return vitePlugins;
}
