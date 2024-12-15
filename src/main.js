
import './index.css'
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// Aggiungi un filtro per il formato della valuta
app.config.globalProperties.$filters = {
  currency(value) {
    return '$' + value.toFixed(2);
  }
};

app.mount('#app');
