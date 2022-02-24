import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router'
import { Toast } from 'vant'

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
                component: import('../views/Class/class.vue')
            },
            {
                path: '/shop',
                name: 'shop',
                component: import('../views/Shop/shop.vue')
            },
            {
                path: '/mine',
                name: 'mine',
                component: import('../views/Mine/mine.vue')
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
    },
    {
        path:'/productDetails',
        name:'productDetails',
        component:import('../views/Index/productDetails.vue')
    },
    {
        path:'/account',
        name:'account',
        component:import('../views/Mine/account.vue')
    },
    {
        path:'/order',
        name:'order',
        component:import('../views/Mine/order.vue')
    },
    {
        path:'/address',
        name:'address',
        component:import('../views/Mine/address.vue')
    },
    {
        path:'/about',
        name:'about',
        component:import('../views/Mine/about.vue')
    },
    {
        path:'/editAddress',
        name:'editAddress',
        component:import('../views/Mine/editAddress.vue')
    },
    {
        path:'/addAddress',
        name:'addAddress',
        component:import('../views/Mine/addAddress.vue')
    },
    {
        path:'/categoires',
        name:'categoires',
        component:import('../views/Class/categoires.vue')
    }
]

const router = createRouter({
    history:createWebHistory(),
    linkActiveClass: 'active',
    routes
})

// router.beforeEach((to, from,next) =>{
//     if(localStorage.getItem('token')){
//         Toast.fail('账号未登录')
//         router.push('login')
//     }
//     next()
// })

export default router
