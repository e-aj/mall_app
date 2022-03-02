<template>
    <div class="order">
        <van-nav-bar title="订单管理" left-arrow @click-left="onClickLeft" />
        <van-tabs
            v-model:active="activeName"
            color="#1baeae"
            title-active-color="#1baeae"
            @click-tab="checkNav"
        >
            <van-tab
                :title="item.title"
                v-for="(item, index) in state.navList"
                :key="index"
                :name="item.status"
            >
                <van-pull-refresh v-model="loading" @refresh="onRefresh">
                    <div
                        v-for="(item, index) in state.contentList"
                        :key="index"
                        class="contentList"
                        @click="toOrderDetails(item)"
                    >
                        <div class="top_">
                            <div class="time">订单时间：{{ item.createTime }}</div>
                            <div class="state">{{ item.orderStatusString }}</div>
                        </div>
                        <div class="bottom_">
                            <div
                                class="info"
                                v-for="(info, key) in item.newBeeMallOrderItemVOS"
                                :key="key"
                            >
                                <div class="img_">
                                    <img :src="info.goodsCoverImg" alt />
                                </div>
                                <div class="right">
                                    <div class="top">
                                        <div class="name">{{ info.goodsName }}</div>
                                    </div>
                                    <div class="bottom">
                                        <div class="price">￥{{ info.sellingPrice }}</div>
                                        <div class="count">X{{ info.goodsCount }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-pull-refresh>
            </van-tab>
            <p>没有更多了</p>
        </van-tabs>
    </div>
</template>
<script setup>
import { onUnmounted, reactive, ref } from 'vue';
import { getOrder } from '../../api/user';
import { useRouter } from 'vue-router';

const router = useRouter()
const onClickLeft = () => history.back();
const activeName = ref(' ');
const loading = ref(false);
const state = reactive({
    tabList: [
        "全部", "", "待确认", "代发货", "已发货", "交易完成"
    ],
    navList: [
        {
            title: "全部",
            status: ' '
        },
        {
            title: "代付款",
            status: '1'
        },
        {
            title: '代确认',
            status: '2'
        },
        {
            title: "代发货",
            status: '3'
        }, {
            title: "已发货",
            status: '4'
        }, {
            title: "交易完成",
            status: '5'
        }
    ],
    contentList: [],
    pageNumber: 1,
    status: ' '
})
getOrder(state.pageNumber, state.status).then(res => {
    state.contentList = res.data.data.list
})

// 切换
const checkNav = (item) => {
    state.pageNumber = 1
    state.status = item.name
    getOrder(state.pageNumber, state.status).then(res => {
        state.contentList = res.data.data.list
    })
}

// 刷新
const onRefresh = () => {
    state.pageNumber = state.pageNumber + 1
    setTimeout(() => {
        getOrder(state.pageNumber, state.status).then(res => {
            if (res.data.resultCode == 200) {
                state.contentList.push(...res.data.data.list)
            }

        })
        loading.value = false;
    }, 1000);
};

// 订单详情
const toOrderDetails = (item) =>{
    router.push({name:'orderDetails',params:{orderNo:item.orderNo}})
}



// 删除定时器
onUnmounted(()=>{
    clearTimeout()
})



</script>
<style lang="less" scoped>
.order {
    width: 100%;
    background: #fff;
    .van-nav-bar {
        position: fixed;
        top: 0;
        width: 100%;
    }
    .van-tabs {
        margin-top: 46px;
        .contentList {
            width: 80%;
            margin: 20px auto;
            .top_ {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }
            .bottom_ {
                width: 100%;
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
                    .right {
                        width: 70%;
                        margin-left: 5%;
                        text-align: left;
                        .top {
                            font-size: 12px;
                        }
                        .bottom {
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
        p {
            font-size: 13px;
            margin: 20px 0 0;
            line-height: 30px;
            color: #999;
        }
    }
}
</style>



       
    