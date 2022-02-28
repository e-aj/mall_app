<template>
    <div class="categoires">
        <div class="nav_bar">
            <van-icon name="arrow-left" class="left" @click="onClickLeft" />
            <van-search v-model="value" placeholder="请输入搜索关键词" class="search_icon" />
            <button class="search_btn">搜索</button>
        </div>
        <ul class="nav_list">
            <li
                v-for="(item, index) in state.navList"
                :key="index"
                @click="choose(item, index)"
                :class="{ active: index == state.number }"
            >{{ item.title }}</li>
        </ul>
        <div class="content" >
            <div class="goodsList" v-for="(item, index) in state.goodsList" :key="index" @click="toProductDetails(item)">
                <div class="left">
                    <img :src="'http://backend-api-01.newbee.ltd/'+item.goodsCoverImg" alt />
                </div>
                <div class="right">
                    <div class="name">{{ item.goodsName }}</div>
                    <p class="intro">{{ item.goodsIntro }}</p>
                    <p class="price">￥&nbsp;{{ item.sellingPrice }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { getSearch } from '../../api/class'
import router from '../../router';

const route = useRoute()
const value = ref('')
const active = ref(0);
const state = reactive({
    navList: [
        {
            title: '推荐',
            orderBy: ''
        },
        {
            title: '新品',
            orderBy: 'new'
        },
        {
            title: '价格',
            orderBy: 'price'
        }
    ],
    goodsCategoryId: '',
    keyword: '',
    orderBy: '',
    number: 0,
    goodsList: []

})

const onClickLeft = () => history.back();


// 点击切换orderBy进行查询
const choose = (item, index) => {
    state.number = index
    state.orderBy = item.orderBy
    getSearchGoods(state.goodsCategoryId, state.keyword, state.orderBy)
}

// 请求查询函数
const getSearchGoods = (goodsCategoryId, keyword, orderBy) => {
    getSearch(goodsCategoryId, keyword, orderBy).then(res => {
        state.goodsList = res.data.data.list
    })
}

onMounted(() => {
    // 获取商品种类id
    state.goodsCategoryId = route.params.goodsCategoryId
    console.log(state.goodsCategoryId)
    getSearchGoods(state.goodsCategoryId, state.keyword, state.orderBy)
})

// 搜索
const search_btn = () => {

}

// 查看详情
const toProductDetails = (item) =>{
    router.push({name:'productDetails',params:{goodsId:item.goodsId,goodsCategoryId:state.goodsCategoryId}})
}
</script>


<style lang="less" scoped>
.categoires {
    width: 100%;
    height: 100%;
    background: #fff;
    .nav_bar {
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
    .nav_list {
        width: 90%;
        margin-top: 10px;
        margin: 10px auto;
        li {
            width: 32%;
            text-align: center;
            border: 1px solid #1baeae;
            color: #1baeae;
            line-height: 25px;
        }
        .active {
            background: #1baeae;
            color: #fff;
        }
    }
    .content {
        .goodsList {
            border-bottom: 1px solid #DCDCDC;
            div {
                display: inline-block;
            }
            .left {
                width: 40%;
                img {
                    width: 80%;
                }
            }
            .right {
                width: 60%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: left;
                .name {
                    width: 100%;
                    font-size: 16px;
                    color: #000;
                }
                .intro {
                    width: 100%;
                    font-size: 14px;
                    color: #999999
                }
                .price{
                    color: #1baeae;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>