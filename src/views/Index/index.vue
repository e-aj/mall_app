<template>
  <div class="index">
    <!-- head -->
    <div class="head" :class="{ 'active': state.headerScroll }">
      <van-icon name="wap-nav" :color="state.icon_color" class="kind" @click="toClass" />
      <div class="search">
        <div class="first">XX商城</div>
        <div class="second"></div>
        <div class="third" @click="toSearch">山河无恙，人间皆安</div>
      </div>
      <van-icon name="manager" :color="state.icon_color" @click="toMine" />
    </div>
    <!-- swiper -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" ref="el">
      <van-swipe-item v-for="(item, index) in state.swipeList" :key="index">
        <img :src="item.carouselUrl" alt />
      </van-swipe-item>
    </van-swipe>
    <!-- category -->
    <van-grid column-num="5" :border="false" class="category">
      <van-grid-item v-for="(item, index) in state.categoryList" :key="index"  >
        <img :src="item.imgUrl" alt />
        <p>{{ item.name }}</p>
      </van-grid-item>
    </van-grid>
    <!-- 新品上线 -->
    <div class="newGoodses goodses">
      <p>新品上线</p>
      <van-grid column-num="2" class="product">
        <van-grid-item v-for="(item, index) in state.newGoodses" :key="index"  @click="toProductDetails(item)">
          <img :src="item.goodsCoverImg" alt />
          <div class="name">{{ item.goodsName }}</div>
          <div class="price">￥{{ item.sellingPrice }}</div>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 热门商品 -->
    <div class="hotGoodses goodses">
      <p>热门商品</p>
      <van-grid column-num="2" class="product">
        <van-grid-item v-for="(item, index) in state.hotGoodses" :key="index"  @click="toProductDetails(item)">
          <img :src="item.goodsCoverImg" alt />
          <div class="name">{{ item.goodsName }}</div>
          <div class="price">￥{{ item.sellingPrice }}</div>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 最新推荐 -->
    <div class="recommendGoodses goodses">
      <p>最新推荐</p>
      <van-grid column-num="2" class="product">
        <van-grid-item v-for="(item, index) in state.recommendGoodses" :key="index"  @click="toProductDetails(item)">
          <img :src="item.goodsCoverImg" alt />
          <div class="name">{{ item.goodsName }}</div>
          <div class="price">￥{{ item.sellingPrice }}</div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>


<script setup>
import { reactive, nextTick } from "vue";
import { useRouter } from "vue-router";
import { getHome } from '../../api/index'

// 定义router
const router = useRouter()

// 定义变量
const state = reactive({
  swipeList: [],
  categoryList: [
    {
      name: '新蜂超市',
      imgUrl: 'https://s.yezgea02.com/1604041127880/%E8%B6%85%E5%B8%82%402x.png',
      categoryId: 100001
    }, {
      name: '新蜂服饰',
      imgUrl: 'https://s.yezgea02.com/1604041127880/%E6%9C%8D%E9%A5%B0%402x.png',
      categoryId: 100003
    }, {
      name: '全球购',
      imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%A8%E7%90%83%E8%B4%AD%402x.png',
      categoryId: 100002
    }, {
      name: '新蜂生鲜',
      imgUrl: 'https://s.yezgea02.com/1604041127880/%E7%94%9F%E9%B2%9C%402x.png',
      categoryId: 100004
    }, {
      name: '新蜂到家',
      imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%88%B0%E5%AE%B6%402x.png',
      categoryId: 100005
    }, {
      name: '充值缴费',
      imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%85%E5%80%BC%402x.png',
      categoryId: 100006
    }, {
      name: '9.9元拼',
      imgUrl: 'https://s.yezgea02.com/1604041127880/9.9%402x.png',
      categoryId: 100007
    }, {
      name: '领劵',
      imgUrl: 'https://s.yezgea02.com/1604041127880/%E9%A2%86%E5%88%B8%402x.png',
      categoryId: 100008
    }, {
      name: '省钱',
      imgUrl: 'https://s.yezgea02.com/1604041127880/%E7%9C%81%E9%92%B1%402x.png',
      categoryId: 100009
    }, {
      name: '全部',
      imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%A8%E9%83%A8%402x.png',
      categoryId: 100010
    }
  ],
  newGoodses: [],
  hotGoodses: [],
  recommendGoodses: [],
  headerScroll: false,
  icon_color: '#1baeae'
})
// 获取首页信息
getHome().then(res => {
  state.swipeList = res.data.data.carousels
  state.newGoodses = res.data.data.newGoodses,
    state.hotGoodses = res.data.data.hotGoodses,
    state.recommendGoodses = res.data.data.recommendGoodses
})

// 刷新head
nextTick(() => {
  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    scrollTop > 100 ? state.headerScroll = true : state.headerScroll = false
    scrollTop > 100 ? state.icon_color = '#fff' : state.icon_color = '#1baeae'
  })
})

// 跳转分类
const toClass = () => {
  router.push('class')
}
// 跳转我的
const toMine = () => {
  router.push('mine')
}

// 去搜索
const toSearch = () => {
  router.push('categoires')
}

// 跳转详情页
const  toProductDetails = (item) =>{
  router.push({name:'productDetails',params:{goodsId:item.goodsId}})
}
</script>

<style lang="less" scoped>
.index {
  .head {
    position: fixed;
    z-index: 9;
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    .van-icon {
      display: block;
      line-height: 50px;
      margin: 0 5px;
    }
    .search {
      width: 65%;
      height: 34px;
      margin-top: 8px;
      border-radius: 20px;
      display: flex;
      justify-content: space-around;
      line-height: 34px;
      background: rgba(255, 255, 255, 0.7);
      .first {
        font-size: 20px;
        font-weight: bold;
        color: #1baeae;
      }
      .second {
        width: 1px;
        height: 20px;
        background: #000;
        margin-top: 6px;
      }
      .third {
        font-size: 14px;
      }
    }
  }
  .active {
    background-color: #1baeae;
    .search {
      .first {
        color: #1baeae;
      }
    }
  }
  .van-swipe {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .category {
    img {
      width: 50%;
    }
    p {
      font-size: 12px;
    }
  }
  .goodses {
    p {
      color: #1baeae;
    }
    .product {
      font-size: 14px;
      img {
        width: 50%;
      }
      .price {
        color: #1baeae;
      }
    }
  }
}
.headerScroll {
  background: #000;
}
</style>