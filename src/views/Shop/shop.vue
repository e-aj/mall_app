<template>
  <div class="shop">
    <van-nav-bar title="购物车" />
    <div class="content">
      <div class="contentList" v-for="(item,index) in state.shopCarList" :key="index">
        <van-checkbox v-model="checked"></van-checkbox>
        <div class="img_">
          <img :src="item.goodsCoverImg" alt="">
        </div>
        
        <div class="right">
          <div class="top">
            <div class="name">{{item.goodsName}}</div>
            <div class="count">X{{item.goodsCount}}</div>
          </div>
          <div class="bottom">
            <div class="price">￥{{item.sellingPrice}}</div>
            <van-stepper v-model="item.goodsCount" />
          </div>

        </div>

      </div>
    </div>
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" button-color="#1BAEAE">
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script setup>
import { ref ,reactive} from 'vue';
import {getShopCar} from '../../api/shop'
const checked = ref(true);
const state = reactive({
  shopCarList:[]
})

getShopCar().then(res=>{
  state.shopCarList = res.data.data
  console.log(state.shopCarList )
})

</script>

<style scoped lang="less">
.shop {
  .van-submit-bar {
    bottom: 60px;
  }
  .content{
    padding: 10px;
    .contentList{
      display: flex;
      align-items: center;
      .img_{
        width: 30%;
        img{
          width: 80%;
        }
      }
      .right{
        margin-left: 5%;
        width: 60%;
        text-align: left;
        .top,.bottom{
          display: flex;
          justify-content: space-between;
        }
        .top{
          font-size: 12px;
          .name{
            width: 80%;
          }
        }
        .bottom{
          .price{
            color: #FF0808;
          }
        }
      }
    }
  }
}
</style>