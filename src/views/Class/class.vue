<template>
  <div class="class">
    <van-nav-bar title="搜索" left-arrow @click-left="onClickLeft" />
    <div class="content">
      <ul class="left">
        <li
          v-for="(item, index) in state.categoiresList"
          :key="index"
          @click="choose(item, index)"
          :class="{ active: index == state.number }"
        >{{ item.categoryName }}</li>
      </ul>
      <div class="right">
        <div v-for="(item, index) in state.rightList" :key="index">
          <p class="right_title">{{ item.categoryName }}</p>
          <van-grid :column-num="3" :border="false">
            <van-grid-item
              v-for="(value, index) in item.thirdLevelCategoryVOS"
              :key="index"
              @click="toCategoires(value)"
            >
              <div class="img_box">
                <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt />
              </div>
              <p>{{ value.categoryName }}</p>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { getCategoires } from '../../api/class';
const router = useRouter()
const active = ref(0)
const state = reactive({
  categoiresList: [],
  rightList: [],
  number: 0
})

// 左侧返回按钮
const onClickLeft = () => history.back();

// 获取商品信息
getCategoires().then(res => {
  state.categoiresList = res.data.data
  state.rightList = res.data.data[0].secondLevelCategoryVOS
})


// 根据索引切换商品
const choose = (item, index) => {
  state.rightList = item.secondLevelCategoryVOS
  state.number = index
}

// 根据种类查看商品
const toCategoires = (value) =>{
  console.log(value.categoryId)
  router.push({name:'categoires',params:{goodsCategoryId:value.categoryId}})
  localStorage.setItem('goodsCategoryId',value.categoryId)
}
</script>

<style lang="less" scoped>
.class {
  width: 100%;
  .van-nav-bar {
    position: fixed;
    top: 0;
    width: 100%;
  }
  .content {
    display: flex;
    height: 100%;
    margin: 46px 0;
    .left {
      position: fixed;
      left: 0;
      width: 30%;
      height: 100%;
      display: block;
      background: #f8f8f8;
      li {
        display: block;
        color: #2c3e50;
        height: 60px;
        line-height: 60px;
        font-size: 14px;
        text-align: center;
      }
      .active {
        background: #fff;
        color: #1baeae;
      }
    }
    .van-sidebar-item--select:before {
      position: relative;
    }
    .right {
      width: 70%;
      background: #fff;
      margin-left: 30%;
      .right_title {
        text-align: left;
        font-size: 18px;
      }
      .img_box {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
        }
      }

      p {
        font-size: 14px;
      }
    }
  }
}
</style>