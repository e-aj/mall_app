<template>
    <div class="addressDetails">
        <van-nav-bar :title="state.title" left-arrow @click-left="onClickLeft" />
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                    v-model="userName"
                    name="姓名"
                    label="姓名"
                    placeholder="姓名"
                    :rules="[{ required: true, message: '请填写姓名' }]"
                />
                <van-field
                    v-model="userPhone"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                <van-field
                    v-model="detailAddress"
                    name="详细地址"
                    label="详细地址"
                    placeholder="详细地址"
                    :rules="[{ required: true, message: '请填写详细地址' }]"
                />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">保存</van-button>
                <van-button round block type="primary" native-type="submit">删除</van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup>
import { reactive } from '@vue/reactivity';
import { putAddress } from '../../api/user';
import { useRoute } from 'vue-router';

const route = useRoute()

const state = reactive({
    title: ''
})
console.log(route.params.title)
state.title = route.params.title


const onClickLeft = () => history.back();

</script>
