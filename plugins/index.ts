import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'

import createDevtools from './devtools'

export default function createVitePlugins(viteEnv: ImportMetaEnv) {
  const { VITE_ENABLE_DEVTOOLS } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [vue()]
  vitePlugins.push(createDevtools(VITE_ENABLE_DEVTOOLS))

  return vitePlugins
}
