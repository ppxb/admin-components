import { createApp } from 'vue';

import App from './App.vue';
import '@/styles/index.css';

function bootstrap() {
  const app = createApp(App);

  app.mount('#app');
}

bootstrap();
