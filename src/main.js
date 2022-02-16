import { createApp } from 'vue'
import App from './App.vue'
import './common/styles/reset.css'
import router from './router'
import { Button,Tabbar, TabbarItem,Icon  } from 'vant';

const app = createApp(App)
app.use(Button)
app.use(Tabbar);
app.use(TabbarItem);
app.use(Icon);
app.use(router).mount('#app')
