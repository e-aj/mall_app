import { createApp } from 'vue'
import App from './App.vue'
import './common/styles/reset.css'
import './common/styles/base.less'
import router from './router'
import { Button,Tabbar, TabbarItem,Icon,NavBar,Form, Field, CellGroup,Swipe, SwipeItem,Toast,Grid, GridItem,Sidebar, SidebarItem    } from 'vant';

const app = createApp(App)
app.use(Button)
app.use(Tabbar);
app.use(TabbarItem);
app.use(Icon);
app.use(NavBar);
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(Swipe);
app.use(SwipeItem);
app.use(Toast);
app.use(Grid);
app.use(GridItem);
app.use(Sidebar);
app.use(SidebarItem);
app.use(router).mount('#app')
