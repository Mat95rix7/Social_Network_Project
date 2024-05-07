import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'

import './assets/main.css'

const app = createApp(App);
app.use(createPinia());

app.mount('#app');

app.config.globalProperties.$filters = {
     formatDate(value) {
        if (!value) return '';
        const date = new Date(value);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('fr-FR', options); // Format de date '1 janvier 2022'
     },
     formatHour(value) {
        if (!value) return '';
        const date = new Date(value);
        return date.toTimeString().split(' ')[0];
     }
  }
