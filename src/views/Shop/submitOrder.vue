<template>
    <div class="submitOrder">
        <van-nav-bar title="提交订单" left-arrow @click-left="onClickLeft" />
        <van-contact-card type="edit" :tel="tel" :name="name" @click="onEdit" />
        <div class="contentList" v-for="(item, index) in state.goodsInfo" :key="index">
            <div class="img_">
                <img :src="item.goodsCoverImg" alt />
            </div>
            <div class="right">
                <div class="top">
                    <div class="name">{{ item.goodsName }}</div>
                    <div class="count">X{{ item.goodsCount }}</div>
                </div>
                <div class="bottom">
                    <div class="price">￥{{ item.sellingPrice }}</div>
                </div>
            </div>
        </div>
        <div class="submit">
            <div class="top">
                <div>商品金额</div>
                <div class="total">${{state.total}}</div>
            </div>
            <div class="btn" @click="submitOrder">生成订单</div>
        </div>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { getGoodsInfo,saveOrder } from '../../api/shop';
import { reactive } from 'vue';

const state = reactive({
    goodsInfo: [],
    total:0
})
const onClickLeft = () => history.back()
const route = useRoute()
const address = JSON.parse(route.params.address)
const resultList = JSON.parse(route.params.resultList)

// 获取订单商品信息
resultList.forEach(item => {
    getGoodsInfo(item).then(res => {
        res.data.data.forEach(item => {
            state.goodsInfo.push(item)
        })

    })
});

// 提交订单
const data = {
    addressId:address.addressId,
    cartItemIds:resultList
}
console.log(typeof JSON.stringify(resultList))
console.log(data)
const submitOrder = ()=>{
    console.log(111)
    saveOrder(data).then(res=>{
        console.log(res)
    })
}



</script>

<style scoped lang="less">
.contentList {
    display: flex;
    align-items: center;
    background: #fff;
    margin-top: 20px;
    .img_ {
        width: 30%;
        img {
            width: 80%;
        }
    }
    .right {
        margin-left: 5%;
        width: 60%;
        text-align: left;
        .top,
        .bottom {
            display: flex;
            justify-content: space-between;
        }
        .top {
            font-size: 12px;
            .name {
                width: 80%;
            }
        }
        .bottom {
            .price {
                color: #ff0808;
                font-size: 16px;
            }
        }
    }
}
.submit{
    position: fixed;
    bottom: 0px;
    border: 1px solid #E9E9E9;
    width: 100%;
    .top{
        display: flex;
        justify-content: space-between;
        margin:10px auto;
        width: 90%;
        font-size: 14px;
        .total{
            color: #ff0808;
        }
    }
    .btn{
        margin: 10px auto;
        width: 90%;
        background: #1BAEAE;
        height: 45px;
        line-height: 45px;
        color: #fff;

    }
}
</style>