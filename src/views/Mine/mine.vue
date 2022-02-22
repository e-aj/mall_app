<template>
  <div class="mine">
    <van-nav-bar title="我的" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <div class="info">
      <van-image round width="80px" height="80px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      <div class="name">
        <p>昵称：{{ userInfo.nickName }}</p>
        <p>登录名：{{ userInfo.loginName }}</p>
        <p>个性签名：{{ userInfo.introduceSign }}</p>
      </div>
    </div>
    <div class="list">
      <ul>
        <li @click="toOrder">
          我的订单
          <van-icon name="arrow" />
        </li>
        <li @click="toAccount">
          账号管理
          <van-icon name="arrow" />
        </li>
        <li @click="toAddress">
          地址管理
          <van-icon name="arrow" />
        </li>
        <li @click="toAboutUs">
          关于我们
          <van-icon name="arrow" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { getInfo } from '../../api/user';
import { reactive, onUnmounted, onMounted } from 'vue';
import { Toast } from 'vant';
const router = useRouter()

const userInfo = reactive({
  loginName: "",
  nickName: "",
  introduceSign: ''
})

// 左侧返回按钮
const onClickLeft = () => {
  router.go(-1)
}

onMounted(() => {
  console.log(localStorage.getItem('token'))
  getInfo().then(res => {
    if (res.data.resultCode == 200) {
      userInfo.loginName = res.data.data.loginName
      userInfo.nickName = res.data.data.nickName
      userInfo.introduceSign = res.data.data.introduceSign
    }
    else {
      Toast.fail('无效认证！请重新登录！');
      localStorage.clear();
      setTimeout(() => {
        router.push('login')
      }, 2000)
    }

  })
})
onUnmounted(() => {
  clearTimeout()
})

// 我的订单
const toOrder = () =>{
  router.push({name:'order'})
}

// 账号管理
const toAccount = () => {
  router.push({ name: 'account', params: { nickName: userInfo.nickName, introduceSign: userInfo.introduceSign } })
}

// 地址管理
const toAddress = () => {
  router.push({name:'address'})
}

// 关于我们
const toAboutUs = () => {
  router.push({name:'about'})
}
</script>

<style lang="less">
.mine {
  .info {
    width: 90%;
    height: 120px;
    background-color: #1baeae;
    border-radius: 10px;
    margin: 10px auto;
    display: flex;
    align-items: center;
    .van-image {
      margin-left: 10px;
    }
    .name {
      font-size: 14px;
      text-align: left;
      margin-left: 10px;
      color: #fff;
    }
  }
  .list {
    width: 90%;
    margin: 20px auto;
    ul {
      width: 100%;
      li {
        display: block;
        border-bottom: 1px solid #ebedf0;
        padding-bottom: 10px;
        text-align: left;
        font-size: 14px;
        color: #2c3e77;
        margin: 10px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>