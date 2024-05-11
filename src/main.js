import './assets/main.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(autoAnimatePlugin).mount('#app')
