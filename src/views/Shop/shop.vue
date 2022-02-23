<template>
  <div class="shop">
    <van-nav-bar title="购物车" />
    <div class="content">
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
    </div>
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" button-color="#1BAEAE">
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.shop {
  .van-submit-bar {
    bottom: 60px;
  }
}
</style>