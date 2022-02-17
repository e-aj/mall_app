<template>
  <div class="register">
      <van-nav-bar title="注册" left-text left-arrow @click-left="onClickLeft" />
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
                        <img src="" alt="">
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
const router = useRouter()
const form = reactive({
    username: '',
    password: '',
    captcha: ''
})
const onSubmit = () => {
    router.push('/index')
}
</script>

<style>

</style>