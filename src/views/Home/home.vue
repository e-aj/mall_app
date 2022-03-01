<template>
    <div class="home">
        <keep-alive>
            <router-view />
        </keep-alive>
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
            console.log(state.badge)
        })

        return {
            ...toRefs(state)

        }

    }
}

</script>

<style lang="less" scoped>
</style>>