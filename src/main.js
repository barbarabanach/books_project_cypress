import { createApp } from 'vue';

import router from './router.js';
import store from './store/index.js';
import App from './App.vue';

import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseDialog from './components/ui/BaseDialog.vue';
import LoadItem from './components/ui/LoadItem.vue';

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-dialog', BaseDialog);
app.component('load-item', LoadItem);

app.mount('#app');
