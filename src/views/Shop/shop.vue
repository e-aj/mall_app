<template>
  <div class="shop">
    <van-nav-bar title="购物车" />
    <div class="content">
      <van-checkbox-group v-model="state.result" @change="groupChange">
        <div class="contentList" v-for="(item, index) in state.shopCarList" :key="index">
          <van-checkbox :name="item.cartItemId" checked-color="#1BAEAE"></van-checkbox>
          <div class="img_">
            <img :src="item.goodsCoverImg" alt />
          </div>

          <div class="right">
            <div class="top">
              <div class="name">{{ item.goodsName }}</div>
              <div class="count">X{{ item.goodsCount }}</div>
            </div>
            <div class="bottom">
              <div class="price">￥{{ item.sellingPrice }}</div>
              <van-stepper
                v-model="item.goodsCount"
                @plus="push(item)"
                @minus="minus(item)"
              />
            </div>
          </div>
        </div>
      </van-checkbox-group>
    </div>
    <van-submit-bar
      :price="total * 100"
      button-text="结算"
      @submit="onSubmit"
      button-color="#1BAEAE"
    >
      <van-checkbox v-model='state.allChecked' @click="allCheck" checked-color="#1BAEAE">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { getShopCar, putShopCar } from '../../api/shop'
import { useRouter } from 'vue-router';
import { Toast } from 'vant';

const router = useRouter()
const checked = ref(true);
const state = reactive({
  shopCarList: [],
  allPrice: 0.00,
  result: [],
  checked:false,
  allChecked: false,
})

// 获取购物车列表数据
getShopCar().then(res => {
  state.shopCarList = res.data.data
  state.shopCarList.forEach(item => {
    state.allPrice = state.allPrice + item.goodsCount * item.sellingPrice
  });
})

// 获取步进器的数值
const push = (item) => {
  item.goodsCount = item.goodsCount + 1
  const data = {
    cartItemId: item.cartItemId,
    goodsCount: item.goodsCount
  }
  putShopCar(data).then(res => {
    console.log(res)
  })
}

const minus = (item) => {
  item.goodsCount = item.goodsCount - 1
  const data = {
    cartItemId: item.cartItemId,
    goodsCount: item.goodsCount
  }
  console.log(state.allPrice)
  putShopCar(data).then(res => {
    console.log(res)
  })
}


// 改变复选框
const groupChange = (names) => {
  if (names.length == state.shopCarList.length) {
    state.allChecked = true
  } else {
    state.allChecked = false
  }
  state.result = names
}

// 全选
const allCheck = () =>{
  if(state.allChecked == true){
    state.result = state.shopCarList.map(item=>item.cartItemId)
  }else{
    state.result = []
  }
}

// 计算金额
const total = computed(()=>{
  let sum  = 0
  let _list = state.shopCarList.filter(item=>state.result.includes(item.cartItemId))
  _list.forEach(item=>{
    sum += item.goodsCount * item.sellingPrice
  })
  localStorage.setItem('total',sum)
  return sum
   
})

// 结算
const onSubmit = ()=>{
  if(state.result.length == 0){
    Toast('请选择商品进行结算')
  }else{
  router.push({name:'address'})
  localStorage.setItem('resultList',JSON.stringify(state.result))
 
  }
  
}
</script>

<style scoped lang="less">
.shop {
  .van-submit-bar {
    bottom: 60px;
  }
  .content {
    padding: 10px;
    .contentList {
      display: flex;
      align-items: center;
      .img_ {
        width: 30%;
        img {
          width: 80%;
        }
      }
      .right {
        margin-left: 5%;
        width: 60%;
        text-align: left;
        .top,
        .bottom {
          display: flex;
          justify-content: space-between;
        }
        .top {
          font-size: 12px;
          .name {
            width: 80%;
          }
        }
        .bottom {
          .price {
            color: #ff0808;
          }
        }
      }
    }
  }
}
</style>