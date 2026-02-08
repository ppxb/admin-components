import { createApp } from 'vue';

import { setupI18n } from '@/locales';
import { setupRouter } from '@/router';
import { initStores } from '@/stores';

import App from './App.vue';
import { usePreferencesStore } from './stores/modules/preferences';
import '@/styles/index.css';

async function bootstrap() {
  const app = createApp(App);

  await setupI18n(app);

  await setupRouter(app);

  initStores(app, { namespace: 'continew-admin' });

  const preferences = usePreferencesStore();
  preferences.init();

  app.mount('#app');
}

bootstrap();
