import { createApp } from 'vue';
import { store } from './vuex/store';
import App from './App.vue';

import i18n from "@/i18n";
import '@/assets/styles/index.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faAngleRight, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faStar, faAngleRight, faShoppingBasket);

const app = createApp(App);

app.use(i18n);
app.use(store);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
