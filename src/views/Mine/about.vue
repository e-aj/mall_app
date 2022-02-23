<template>
    <div class="about">
        <van-nav-bar title="关于我们"  left-arrow @click-left="onClickLeft" />
        <p>没有更多了</p>
    </div>
</template>
<script setup>
const onClickLeft = () => history.back();

</script>
<style lang="less" scoped>

</style>