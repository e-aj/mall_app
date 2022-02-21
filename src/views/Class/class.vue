<template>
  <div class="class">
    <van-nav-bar title="搜索" left-arrow @click-left="onClickLeft" />

    <van-sidebar v-model="active">
      <van-sidebar-item title="标签名称" />
      <van-sidebar-item title="标签名称" />
      <van-sidebar-item title="标签名称" />
    </van-sidebar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const active = ref(0)

// 左侧返回按钮
const onClickLeft = () =>{
  router.go(-1)
}
</script>

<style>
</style>