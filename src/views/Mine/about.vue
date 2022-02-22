<template>
    <div class="about">
        <van-nav-bar title="关于我们"  left-arrow @click-left="onClickLeft" />
        <van-tabs v-model:active="active" color="#1baeae" title-active-color="#1baeae">
            <van-tab :title="item" v-for="(item,index) in state.tabList" :key="index">{{item}}</van-tab>
        </van-tabs>
        <van-divider />
        <p>没有更多了</p>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue';

const onClickLeft = () => history.back();
const active = ref(0);
const state = reactive({
    tabList:[
        "全部","代付款","待确认","代发货","已发货","交易完成"
    ]
})
</script>
<style lang="less" scoped>
.order{
    
    .van-divider{
        margin: 5px 0 0;
    }
    p{
        font-size: 13px;
        margin: 2px 0 0;
        color: #999;
    }
}
</style>