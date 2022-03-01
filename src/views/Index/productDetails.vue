<template>
    <div class="productDetails">
        <van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft" />
        <div class="content">
            <img :src="state.productDetails.goodsCoverImg" alt />
            <p class="goodsName">{{ state.productDetails.goodsName }}</p>
            <!-- <p class="goodsIntro">{{state.productDetails.goodsIntro}}</p> -->
            <p class="youfei">免邮费&nbsp;顺丰快递</p>
            <p class="sellingPrice">￥{{ state.productDetails.sellingPrice }}</p>
            <div class="list">
                <ul>
                    <li class="first">概述</li>
                    <li>参数</li>
                    <li>安装服务</li>
                    <li>常见问题</li>
                </ul>
            </div>
            <div v-html="state.productDetails.goodsDetailContent"></div>
        </div>
        <van-action-bar>
            <van-action-bar-icon icon="chat-o" text="客服" />
            <van-badge :content="state.badge" @click="toShopCart">
                <van-action-bar-icon icon="cart-o" text="购物车"  />
            </van-badge>
            <van-action-bar-button
                color="#6AD7D7"
                type="warning"
                text="加入购物车"
                @click="addShopCart"
            />
            <van-action-bar-button color="#0CB9B9" type="danger" text="立即购买" />
        </van-action-bar>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';
import { getProductDetails, addShop_Cart } from '../../api/index'
import { getShopCar } from '../../api/shop'
import router from '../../router';
import { Toast } from 'vant';


const route = useRoute()
const state = reactive({
    productDetails: {},
    goodsId: '',
    goodsCategoryId: '',
    badge: 0
})

const onClickLeft = () => {
    router.go(-1)
}

getShopCar().then(res => {
    state.badge = res.data.data.length
})

state.goodsId = route.params.goodsId
state.goodsCategoryId = route.params.goodsCategoryId

getProductDetails(state.goodsId).then(res => {
    console.log(res)
    state.productDetails = res.data.data
})

// 加入购物车

const addShopCart = () => {
    const data = {
        goodsCount: 1,
        goodsId: state.goodsId
    }
    console.log(data)
    addShop_Cart(data).then(res => {
        if (res.data.resultCode == 200) {
            Toast('已加入购物车')
        }
        if (res.data.resultCode == 500) {
            Toast(res.data.message)

        } else {
            Toast('添加失败')
        }

        console.log(res)
    })

}

const toShopCart = () => {
    router.push('shop')
}

</script>

<style scoped lang="less">
.productDetails {
    .van-nav-bar {
        position: fixed;
        top: 0;
        width: 100%;
    }
    .content {
        padding: 20px;
        text-align: left;
        img {
            width: 100%;
        }
        p {
            margin: 5px 0;
        }
        .goodsName {
            font-size: 18px;
            color: #000;
        }
        .youfei {
            font-size: 14px;
            color: #999;
        }
        .sellingPrice {
            color: #ff0000;
            font-size: 22px;
        }
        .list {
            text-align: center;
            font-size: 16px;
            ul {
                width: 100%;
                li {
                    width: 24%;
                    border-left: 1px solid #000;
                }
                .first {
                    border: none;
                }
            }
        }
    }
}
</style>