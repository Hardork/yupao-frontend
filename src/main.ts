import { createApp } from 'vue'
import './style.css'
// @ts-ignore
import App from "./App.vue";
import * as VueRouter from 'vue-router';
import 'vant/es/dialog/style';
import Vant from 'vant';
import 'vant/lib/index.css';
import routes from "./config/route.ts";

const app = createApp(App);
app.use(Vant);



//定义路由
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
})
app.use(router);
app.mount('#app');
