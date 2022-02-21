<template>
    <div class="register">
        <van-nav-bar title="注册" left-text left-arrow @click-left="onClickLeft" />
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                    v-model="form.loginName"
                    name="用户名"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                    v-model="form.password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                <van-field
                    v-model="form.password"
                    type="password"
                    name="密码"
                    label="再次输入密码"
                    placeholder="再次输入密码"
                    :rules="[{ required: true, message: '请再次输入密码' }]"
                />
                <van-field
                    v-model="form.captcha"
                    type="captcha"
                    name="验证码"
                    label="验证码"
                    placeholder="验证码"
                    :rules="[{ required: true, message: '请输入验证码' }]"
                >
                    <div>
                        <img src alt />
                    </div>
                </van-field>
            </van-cell-group>

            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit" color="#1BAEAE">注册</van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router';
import { register } from '../../api/login'
import {Toast} from 'vant'
const router = useRouter()
const form = reactive({
    loginName: '13281331383',
    password: '123456',
    captcha: ''
})
const onSubmit = () => {
    let data = {
        loginName: form.loginName,
        password: form.password
    }
    register(data).then(res => {
        if (res.data.resultCode == 200) {
            Toast.success('注册成功');
            router.push('/login')
        }
        else if (res.data.resultCode == 500) {
            Toast.fail('用户名已存在');
        }
        else {
            Toast.fail('注册失败');
        }

    })

}
const onClickLeft = () => {
    console.log(222)
    router.go(-1)
}
</script>

<style lang="less" scoped>
.van-form {
    margin-top: 50px;
}
</style>