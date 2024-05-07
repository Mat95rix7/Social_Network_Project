import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia';
// import { createPersistedState } from 'pinia-plugin-persistedstate';
import App from './App.vue'


const app = createApp(App);
// const pinia = createPinia();
app.use(createPinia());
// pinia.use(createPersistedState());

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
