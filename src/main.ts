import {createApp} from 'vue';
import App from './App.vue';
import 'vant/lib/index.css';
import 'vant/es/toast/style';
import {
    Badge,
    CellGroup, Circle,
    Col,
    Field, FloatingBubble,
    Icon, Loading,
    NavBar, Picker,
    Popup,
    PullRefresh,
    Row, Switch,
    Tabbar,
    TabbarItem,
    Toast,
    TreeSelect
} from "vant";
import * as VueRouter from 'vue-router';
import routes from "./config/route.ts";

const app = createApp(App);
app.use(NavBar);
app.use(Icon);
app.use(Icon);
app.use(Tabbar);
app.use(TabbarItem);
app.use(TreeSelect);
app.use(Col);
app.use(Row);
app.use(Toast);
app.use(PullRefresh);
app.use(Field);
app.use(CellGroup);
app.use(Popup);
app.use(Picker);
app.use(Toast);
app.use(Switch);
app.use(Badge);
app.use(Loading);
app.use(FloatingBubble);
app.use(Circle);
app.use(Icon);
// app.use(DatetimePicker);

//创建路由实例并传递 `routes` 配置
const router = VueRouter.createRouter({
    //内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    // history: VueRouter.createWebHashHistory(),
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写  从routes中引入
})
// 5. 使用并挂载根实例
app.use(router)

app.mount('#app')