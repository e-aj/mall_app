<template>
    <div class="home">
        <router-view></router-view>
        <div class="nav">
            <ul>
                <router-link to="/index"  class="link" >
                    <van-icon name="wap-home"  size="20"/>
                    <span>首页</span>
                </router-link>
                <router-link to="/class" class="link">
                    <van-icon name="coupon" size="20"/>
                    <span>分类</span>
                </router-link>
                <router-link to="/shop" class="link">
                    <van-icon name="shopping-cart" size="20"/>
                    <span>购物车</span>
                </router-link>
                <router-link to="/mine" class="link">
                    <van-icon name="manager" size="20"/>
                    <span>我的</span>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.home {
    .nav {
        background: #fff;
        position: fixed;
        bottom: 0;
        width: 100%;
        border: 1px solid #F5F6F8;
        z-index: 9;
        ul {
            margin: 5px 0;
            display: flex;
            justify-content: space-between;
            .link {
                color: #666666;
                width: 25%;
                .van-icon {
                    display: block;
                    margin-bottom: 5px;
                }
            }
        }
    }
}
.active{
    color: #1BAEAE!important;
}
</style>>