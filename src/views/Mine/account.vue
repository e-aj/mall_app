<template>
    <div class="account">
        <van-nav-bar title="账号管理" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
</template>
<script setup>
const onClickLeft = () => history.back();
</script>
<style lang="less" scoped>
</style>