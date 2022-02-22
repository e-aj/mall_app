// 账号管理
<template>
    <div class="account">
        <van-nav-bar title="账号管理" left-arrow @click-left="onClickLeft" />
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                    v-model="form.nickName"
                    name="昵称"
                    label="昵称"
                    placeholder="昵称"
                    :rules="[{ required: true, message: '请填写昵称' }]"
                />
                <van-field
                    v-model="form.introduceSign"
                    name="个性签名"
                    label="个性签名"
                    placeholder="个性签名"
                    :rules="[{ required: true, message: '请填写个性签名' }]"
                />
                <van-field
                    v-model="password"
                    type="password"
                    name="密码"
                    label="修改密码"
                    placeholder="密码"
                />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit" color="#1baeae">保存</van-button>
                <van-button round block type="primary"  color="#1baeae" @click="logoOut">退出登录</van-button>
            </div>
        </van-form>
    </div>
</template>
<script setup>
import { putInfo } from '../../api/user';
import { onMounted, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Toast } from 'vant';

const router = useRouter()
const route = useRoute()

const form = reactive({
    nickName: '',
    introduceSign: '',
    password:""
})
const onClickLeft = () => history.back();

// 退出登录
const logoOut = () =>{
    localStorage.clear()
    Toast.success('退出成功')
    setTimeout(()=>{
        router.push('login')
    },2000)

}
// 获取昵称个性签名
onMounted(() => {
    form.nickName = route.params.nickName
    form.introduceSign = route.params.introduceSign
})

const onSubmit = ()=>{
    console.log(form)
    putInfo(form).then(res=>{
        console.log(res)
    })
}

</script>
<style lang="less" scoped>
.account {
    .van-button {
        margin: 20px 0;
    }
}
</style>