<template>
    <div class="home">
        <router-view></router-view>
        <div class="nav">
            <ul>
                <router-link to="index" class="link">
                    <van-icon name="wap-home-o" />
                    <span>首页</span>
                </router-link>
                <router-link to="/class" class="link">
                    <van-icon name="wap-home-o" />
                    <span>分类</span>
                </router-link>
                <router-link to="/shop" class="link">
                    <van-icon name="wap-home-o" />
                    <span>购物车</span>
                </router-link>
                <router-link to="/mine" class="link">
                    <van-icon name="wap-home-o" />
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
        position: fixed;
        bottom: 0;
        width: 100%;
        ul {
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