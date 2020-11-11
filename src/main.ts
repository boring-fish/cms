import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { ApiService } from '@/api';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import '@/resources/less/app.less';
import './assets/style/nazaio-iconfont/nazaio-iconfont.css';
import './assets/style/cms-iconfont/cms-iconfont.css';

import './assets/style/scss/common.less';

import '../public/neditor/neditor.config.js';
import '../public/neditor/neditor.all.js';
import '../public/neditor/neditor.service.js';
import '../public/neditor/xiumi-plugin/xiumi-ue-dialog-v5.js';
import '../public/neditor/xiumi-plugin/xiumi-ue-v5.css';
import clipboard from 'clipboard';

Vue.prototype.clipboard = clipboard;

Vue.use(ViewUI);
const global: any = window;
Vue.config.productionTip = false;
let apiService = new ApiService();
global.$api = apiService;
const QRCode = require('qrcodejs2');
Vue.prototype.QRCode = QRCode ;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
