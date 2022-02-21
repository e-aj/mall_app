<template>
    <div class="search">
        <div class="nav">
            <van-icon name="arrow-left" class="left" @click="goBack" />
            <van-search v-model="value" placeholder="请输入搜索关键词" class="search_icon" />
            <button class="search_btn">搜索</button>
        </div>
        <ul class="content" >
            <li >推荐</li>
            <li>新品</li>
            <li>价格</li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const value = ref('')
const active = ref(0);

const goBack = () => {
    router.go(-1)
}

// 搜索
const search_btn = () => {

}

</script>

<style lang="less" scoped>
.search {
    width: 100%;
    height: 100%;
    background-color: #fff;
    .nav {
        width: 100%;
        height: 46px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
            margin-left: 20px;
        }
        .search_btn {
            margin-right: 20px;
            border-radius: 5px;
            background-color: #1baeae;
            color: #fff;
            box-shadow: none;
        }
        .van-search {
            border-radius: 20px;
        }
    }
    .content{
        width: 100%;
        li{
            width: 33.3%;
            text-align: center;
        }
    }
}
</style>