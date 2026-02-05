import type { PluginOption } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';

import createAppInfoPlugin from './app-info';
import createCompressionPlugin from './compression';
import createDevtools from './devtools';
import createHtmlPlugin from './html';

export default function createVitePlugins(viteEnv: ImportMetaEnv) {
  const { VITE_ENABLE_DEVTOOLS, VITE_APP_VERSION, VITE_APP_TITLE } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), tailwindcss()];
  vitePlugins.push(createDevtools(VITE_ENABLE_DEVTOOLS));
  vitePlugins.push(createAppInfoPlugin(VITE_APP_VERSION));
  vitePlugins.push(createHtmlPlugin(VITE_APP_TITLE));
  vitePlugins.push(createCompressionPlugin());

  return vitePlugins;
}
