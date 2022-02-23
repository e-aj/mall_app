<template>
    <div class="address">
        <van-nav-bar title="地址管理" left-arrow @click-left="onClickLeft" />
        <div v-for="(item, index) in state.addressList" :key="index" class="addressList">
            <div class="left">
                <div class="top">
                    <div class="name">{{ item.userName }}</div>
                    <div class="phone">{{ item.userPhone }}</div>
                    <van-tag type="danger" round  v-show="item.defaultFlag">默认</van-tag>
                </div>
                <div
                    class="bottom"
                >{{ item.provinceName }}&nbsp;{{ item.cityName }}&nbsp;{{ item.regionName }}&nbsp;{{ item.detailAddress }}</div>
            </div>
            <div class="right">
                <van-icon name="edit" size="20" @click="edit(item)" />
            </div>
        </div>
        <van-button round block type="primary" color="#1baeae" @click="addAddress">新增地址</van-button>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { getAddress } from '../../api/user';
import { useRouter } from 'vue-router';

const router = useRouter()

const onClickLeft = () => history.back();

const active = ref(0);
const state = reactive({
    addressList: [],
})

onMounted(() => {
    getAddress().then(res => {
        state.addressList = res.data.data
    })
})

// 修改信息
const edit = (item) => {
    router.push({
        name: "editAddress",
        params: {
            form: JSON.stringify(item),
            title: "编辑信息"
        }
    })
}

const addAddress = () => {
    router.push("addAddress")
}

</script>

<style lang="less" scoped>
.address {
    .addressList {
        display: flex;
        font-size: 14px;
        margin: 10px;
        align-items: center;
        justify-content: space-between;
        .left {
            .top {
                margin: 5px 0;
                div {
                    display: inline-block;
                    margin: 0 20px;
                }
            }
        }
        .right {
            margin-right: 20px;
        }
    }
    .van-button {
        position: fixed;
        bottom: 10px;
        width: 80%;
        margin-left: 10%;
    }
}
</style>