<template>
  <div class="mine">
    <van-nav-bar title="我的"  left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <div class="info"></div>
    <div class="list">
      <ul>
        <li>我的订单<van-icon name="arrow" /></li>
        <li>账号管理<van-icon name="arrow" /></li>
        <li>地址管理<van-icon name="arrow" /></li>
        <li>关于我们<van-icon name="arrow" /></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.mine {
  .info {
    width: 90%;
    height: 120px;
    background-color: #46c2c2;
    border-radius: 10px;
    margin: 10px auto;
  }
  .list{
    width: 90%;
    margin: 20px auto;
    ul{
      width: 100%;
      li{
        display: block;
        border-bottom: 1px solid #EBEDF0;
        padding-bottom: 10px;
        text-align: left;
        font-size: 14px;
        color: #2C3E77;
        margin: 10px ;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>