<template>
    <div class="home">
        <transition name="fade">
            <keep-alive>
                <router-view />
            </keep-alive>
        </transition>
        <van-tabbar route active-color="#1baeae">
            <van-tabbar-item replace to="/index" icon="wap-home">首页</van-tabbar-item>
            <van-tabbar-item replace to="/class" icon="coupon">分类</van-tabbar-item>
            <van-tabbar-item replace to="/shop" icon="shopping-cart" :badge="badge">购物车</van-tabbar-item>
            <van-tabbar-item replace to="/mine" icon="manager">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { getShopCar } from '../../api/shop'

export default {
    setup() {
        const state = reactive({
            badge: 0
        })
        getShopCar().then(res => {
            state.badge = res.data.data.length
        })

        return {
            ...toRefs(state)

        }

    }
}

</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-avtive {
    transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>>