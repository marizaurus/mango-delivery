import { createApp } from 'vue';
import { store } from './vuex/store';
import App from './App.vue';
import router from './router/router';

import i18n from "@/i18n";
import '@/assets/styles/index.scss';
import YmapPlugin from 'vue-yandex-maps'

// custom plugins
import ApiPlugin from './plugins/api'
import LoadPlugin from './plugins/load'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faXmark, faShoppingBasket, faAngleRight, faAngleLeft, faMinus, faPlus, faHeart as fasHeart,
  faAnglesLeft, faAnglesRight, faLocationPin, faLocationDot, faGripLines, faBars, faArrowUpRightFromSquare,
  faLanguage, faGlobe, faLightbulb, faMagnifyingGlass, faCheck }
  from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart, faTrashCan, faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faStar, faXmark, faShoppingBasket, faAngleRight, faAngleLeft, faMinus, faPlus, fasHeart,
  faAnglesLeft, faAnglesRight, faLocationPin, faLocationDot, faGripLines, faBars, faArrowUpRightFromSquare,
  faLanguage, faGlobe, faLightbulb, faMagnifyingGlass, faCheck,
  farHeart, faTrashCan, faUser);

const settings = {
  apiKey: '34e6e320-fb70-4df3-9bb3-992aa32a04d4',
  lang: 'ru_RU',
  coordorder: 'latlong',
  enterprise: false,
  version: '2.1'
}

const app = createApp(App);

app.use(router);
app.use(store);

app.use(i18n);
app.use(YmapPlugin, settings)

app.use(ApiPlugin);
app.use(LoadPlugin);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
