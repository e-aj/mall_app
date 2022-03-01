<template>
    <div class="submitOrder">
        <van-nav-bar title="提交订单" left-arrow @click-left="onClickLeft" />
        <div class="address-wrap">
            <div class="name" @click="goTo">
                <span>{{ state.address.userName }}</span>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <span>{{ state.address.userPhone }}</span>
            </div>
            <div
                class="address"
            >{{ state.address.provinceName }} {{ state.address.cityName }} {{ state.address.regionName }} {{ state.address.detailAddress }}</div>
            <van-icon class="arrow" name="arrow" />
        </div>
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
                <div class="total">${{ state.total}}</div>
            </div>
            <div class="btn" @click="submitOrder">生成订单</div>
        </div>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { getGoodsInfo, saveOrder } from '../../api/shop';
import { reactive } from 'vue';

const state = reactive({
    goodsInfo: [],
    total: 0,
    address: []
})
const onClickLeft = () => history.back()
const route = useRoute()
const address = JSON.parse(localStorage.getItem('address'))
state.address = address
const resultList = JSON.parse(localStorage.getItem('resultList'))
state.total = localStorage.getItem('total')
console.log(state.total)

// 获取订单商品信息
resultList.forEach(item => {
    console.log(typeof item)
    getGoodsInfo(item).then(res => {
        res.data.data.forEach(item => {
            state.goodsInfo.push(item)
        })

    })
});

// 提交订单
const data = {
    addressId: address.addressId,
    cartItemIds: resultList
}

const submitOrder = () => {
    console.log(111)
    saveOrder(data).then(res => {
        console.log(res)
    })
}



</script>

<style scoped lang="less">
.address-wrap {
    text-align: left;
    margin-bottom: 20px;
    background: #fff;
    position: relative;
    font-size: 14px;
    padding: 15px;
    color: #222333;
    .name,
    .address {
        margin: 10px 0;
    }
    .arrow {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px;
    }
    &::before {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 2px;
        background: -webkit-repeating-linear-gradient(
            135deg,
            #ff6c6c 0,
            #ff6c6c 20%,
            transparent 0,
            transparent 25%,
            #1989fa 0,
            #1989fa 45%,
            transparent 0,
            transparent 50%
        );
        background: repeating-linear-gradient(
            -45deg,
            #ff6c6c 0,
            #ff6c6c 20%,
            transparent 0,
            transparent 25%,
            #1989fa 0,
            #1989fa 45%,
            transparent 0,
            transparent 50%
        );
        background-size: 80px;
        content: "";
    }
}
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
.submit {
    position: fixed;
    bottom: 0px;
    border: 1px solid #e9e9e9;
    width: 100%;
    .top {
        display: flex;
        justify-content: space-between;
        margin: 10px auto;
        width: 90%;
        font-size: 14px;
        .total {
            color: #ff0808;
        }
    }
    .btn {
        margin: 10px auto;
        width: 90%;
        background: #1baeae;
        height: 45px;
        line-height: 45px;
        color: #fff;
    }
}
</style>