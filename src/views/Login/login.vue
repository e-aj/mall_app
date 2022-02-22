<template>
    <div class="login">
        <van-nav-bar title="登录" left-text left-arrow @click-left="onClickLeft" />
        <img src="../../assets/logo.png" alt class="logo" />
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                    v-model="form.username"
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
                <div class="register">
                    <span @click="register">立即注册</span>
                </div>
            </van-cell-group>

            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit" color="#1BAEAE">提交</van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router';
import { login } from '../../api/login'
import { Toast } from 'vant';
import md5 from 'js-md5'
const router = useRouter()
const form = reactive({
    username: '13281331383',
    password: '123456',
    verify: ''
})
const onSubmit = () => {
    let data = {
        loginName:form.username,
        passwordMd5:md5(form.password)
    }
    login(data).then((res) => {
        if (res.data.resultCode == 200) {
            Toast.success('登录成功');
            router.push('/index')
            localStorage.setItem('token',res.data.data)
        }
        else {
            Toast.fail('账号密码错误');
        }
    })
}
const register = () => {
    router.push('/register')
}

const onClickLeft = () =>{
    console.log(222)
    router.go(-1)
}
</script>

<style lang="less" scoped>
.login {
    .logo {
        width: 50%;
        margin-top: 30px;
    }
    .van-field {
        margin: 20px 0;
    }
    .register {
        margin: 20px;
        font-size: 14px;
        text-align: left;
        color: #6389fa;
    }
}
</style>