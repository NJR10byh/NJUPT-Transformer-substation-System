import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入ElementUI
import ElementUI from "element-ui";
import "./assets/css/element-variables.scss";

// 导入字体图标
import "./assets/fonts/iconfont.css";

// 引入全局css
import "./assets/css/base.css";
import "./assets/css/normalize.css";

// 引入百度地图
import Map from 'vue-baidu-map'

Vue.use(Map, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'SqhA9Kraop2ml4LL1qNOzuzCmV5oP9WU'
})
import {BmlLushu} from 'vue-baidu-map'
Vue.use(BmlLushu)
// 全屏插件
import fullscreen from 'vue-fullscreen'
Vue.use(fullscreen)

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
