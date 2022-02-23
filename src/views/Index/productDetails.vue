<template>
    <div class="productDetails">
        <van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft" />
        <div class="content">
            <img :src="state.productDetails.goodsCoverImg" alt />
            <p class="goodsName">{{state.productDetails.goodsName}}</p>
            <!-- <p class="goodsIntro">{{state.productDetails.goodsIntro}}</p> -->
            <p class="youfei">免邮费&nbsp;顺丰快递</p>
            <p class="sellingPrice">￥{{state.productDetails.sellingPrice}}</p>
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
            <van-action-bar-icon icon="cart-o" text="购物车" />
            <van-action-bar-button color="#6AD7D7" type="warning" text="加入购物车" />
            <van-action-bar-button color="#0CB9B9" type="danger" text="立即购买" />
        </van-action-bar>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';
import { getProductDetails } from '../../api/index'

const onClickLeft = () => history.back();
const route = useRoute()
const state = reactive({
    productDetails: {},
    goodsId: ''
})
state.goodsId = route.params.goodsId
console.log(state.goodsId)

getProductDetails(state.goodsId).then(res => {
    console.log(res)
    state.productDetails = res.data.data
})


</script>

<style scoped lang="less">
.productDetails {
    .van-nav-bar{
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
        p{
            margin: 5px 0;
        }
        .goodsName{
            font-size: 18px;
            color: #000;
        }
        .youfei{
            font-size: 14px;
            color: #999;
        }
        .sellingPrice{
            color: #FF0000;
            font-size: 22px;
        }
        .list{
            text-align: center;
            font-size: 16px;
            ul{
                width: 100%;
                li{
                    width: 24%;
                    border-left: 1px solid #000;
                }
                .first{
                    border: none;
                }
            }
        }
    }
}
</style>