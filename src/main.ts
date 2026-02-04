import { createApp } from 'vue';

import { setupI18n } from '@/locales';
import App from './App.vue';

import { setupRouter } from './router';
import '@/styles/index.css';

async function bootstrap() {
  const app = createApp(App);

  await setupI18n(app);
  await setupRouter(app);
  app.mount('#app');
}

bootstrap();
