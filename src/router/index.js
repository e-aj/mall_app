import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/index',
        name: 'Home',
        component: import('../views/Home/home.vue'),
        children: [
            {
                path: '/index',
                name: 'index',
                component: import('../views/Index/index.vue')
            },
            {
                path: '/class',
                name: 'class',
                component: import('../views/Class/index.vue')
            },
            {
                path: '/shop',
                name: 'shop',
                component: import('../views/Shop/index.vue')
            },
            {
                path: '/mine',
                name: 'mine',
                component: import('../views/Mine/index.vue')
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: import('../views/Login/login.vue')
    },
    {
        path:'/register',
        name:'register',
        component:import("../views/Login/register.vue")
    }
]

const router = createRouter({
    history:createWebHistory(),
    linkActiveClass: 'active',
    routes
})

export default router
