import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
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
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: 'active',
    routes
})

export default router
