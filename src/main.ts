import { createApp } from 'vue';

import { setupI18n } from '@/locales';
import { setupRouter } from '@/router';

import { setupRouter } from './router';
import { initStores } from './stores';
import App from './App.vue';
import '@/styles/index.css';

async function bootstrap() {
  const app = createApp(App);

  await setupI18n(app);
  await setupRouter(app);
  initStores(app, { namespace: 'continew-admin' });
  app.mount('#app');
}

bootstrap();
