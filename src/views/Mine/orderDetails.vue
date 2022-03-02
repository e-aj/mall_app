<template>
    <div class="orderDetails">
        <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft" />
        <div class="top">
            <div>
                <span class="left">订单状态：</span>
                <span>{{ state.orderDetails.orderStatusString }}</span>
            </div>
            <div>
                <span class="left">订单编号：</span>
                <span>{{ state.orderDetails.orderNo }}</span>
            </div>
            <div>
                <span class="left">下单时间：</span>
                <span>{{ state.orderDetails.createTime }}</span>
            </div>
            <div class="toPay" @click="toPay">去支付</div>
            <div class="cancelPay" @click="cancelPay">取消快递</div>
        </div>
        <div class="center">
            <div>
                <span class="left">商品金额：</span>
                <span>￥{{state.orderDetails.totalPrice}}</span>
            </div>
            <div>
                <span class="left">配送方式：</span>
                <span>普通快递</span>
            </div>
        </div>
        <div class="bottom">
            <div class="info" v-for="(info, key) in  state.orderDetails.newBeeMallOrderItemVOS" :key="key">
                <div class="img_">
                    <img :src="info.goodsCoverImg" alt />
                </div>
                <div class="right_">
                    <div class="top_">
                        <div class="name">{{ info.goodsName }}</div>
                    </div>
                    <div class="bottom_">
                        <div class="price">￥{{ info.sellingPrice }}</div>
                        <div class="count">X{{ info.goodsCount }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';
import { getOrderDetails } from '../../api/user';

const state = reactive({
    orderDetails: {},
    orderNo:''
})
const onClickLeft = () => history.back()
const route = useRoute()
state.orderNo = route.params.orderNo

getOrderDetails(state.orderNo).then(res=>{
    state.orderDetails = res.data.data
})

const toPay = () => {

}

const cancelPay = () => {

}

</script>

<style scoped lang="less">
.orderDetails {
    text-align: left;
    font-size: 15px;
    .top {
        padding: 10px 20px;
        background: #fff;
        div {
            margin: 10px 0;
        }

        .left {
            color: #999;
        }
        .toPay,
        .cancelPay {
            height: 40px;
            line-height: 40px;
            text-align: center;
        }
        .toPay {
            background: #1baeae;
            color: #fff;
        }
        .cancelPay {
            background: #fff;
            border: 1px solid #ebedf0;
        }
    }
    .center {
        background: #fff;
        padding: 10px 20px;
        margin-top: 20px;
        div {
            margin: 10px 0;
        }
        .left {
            color: #999;
        }
    }
    .bottom {
        background: #fff;
        padding: 10px 20px;
        margin-top: 20px;
        .info {
            width: 100%;
            display: flex;
            align-items: center;
            margin-top: 5px;
            .img_ {
                width: 25%;
                img {
                    width: 100%;
                }
            }
            .right_ {
                width: 70%;
                margin-left: 5%;
                text-align: left;
                .top_ {
                    font-size: 12px;
                }
                .bottom_ {
                    bottom: 0;
                    margin-top: 20px;
                    font-size: 14px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .count {
                        font-size: 12px;
                        color: #999;
                    }
                }
            }
        }
    }
}
</style>