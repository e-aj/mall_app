<template>
    <div class="addressDetails">
        <van-nav-bar title="新增地址" left-arrow @click-left="onClickLeft" />
        <van-form>
            <van-cell-group inset>
                <van-field
                    v-model="state.formData.userName"
                    name="姓名"
                    label="姓名"
                    placeholder="姓名"
                    :rules="[{ required: true, message: '请填写姓名' }]"
                />
                <van-field
                    v-model="state.formData.userPhone"
                    name="电话"
                    label="电话"
                    placeholder="电话"
                    :rules="[{ required: true, message: '请填写电话' }]"
                />
                <van-field
                    v-model="state.area"
                    label="文本"
                    right-icon="arrow"
                    placeholder="请填写地址"
                    @click="chooseArea"
                />
                <van-field
                    v-model="state.formData.detailAddress"
                    name="详细地址"
                    label="详细地址"
                    placeholder="详细地址"
                    :rules="[{ required: true, message: '请填写详细地址' }]"
                />
                <van-cell left title="设置默认收货地址">
                    <template #right-icon>
                        <van-switch
                            v-model="state.checked"
                            size="24"
                            active-color="#1BAEAE"
                            @change="changeDefault"
                        />
                    </template>
                </van-cell>
            </van-cell-group>

            <div style="margin: 16px;">
                <van-button round block native-type="submit" color="#1BAEAE" @click="onSubmit">保存</van-button>
            </div>
        </van-form>
        <van-area
            :area-list="areaList"
            v-show="state.areaShow"
            @confirm="choose"
            @cancel="chooseCancel"
        />
    </div>
</template>

<script setup>
import { reactive } from '@vue/reactivity';
import { changeAddress } from '../../api/user';
import { areaList } from '@vant/area-data';
import { Toast} from 'vant';
import { onUnmounted } from '@vue/runtime-core';


const state = reactive({
    title: '',
    formData: {
        userName: '',
        userPhone: '',
        provinceName: '',
        cityName: '',
        regionName: '',
        detailAddress: '',
        defaultFlag: 0
    },
    areaShow: false,
    area: "",
    checked: false
})


// 返回
const onClickLeft = () => history.back();

// 选择
const chooseArea = () => {
    state.areaShow = !state.areaShow
}
// 选择地区
const choose = (result) => {
    state.formData.provinceName = result[0].name
    state.formData.cityName = result[1].name
    state.formData.regionName = result[2].name
    state.area = `${state.formData.provinceName}/${state.formData.cityName}/${state.formData.regionName}`
    state.areaShow = false
}
// 地区取消按钮
const chooseCancel = () => {
    state.areaShow = false
}
// 改变默认
const changeDefault = (value) => {
    state.checked == true ? state.formData.defaultFlag = 1 : state.formData.defaultFlag = 0
}

// 保存信息
const onSubmit = () => {
    console.log(111)
    changeAddress(state.formData,'post').then(res => {
        if (res.data.resultCode == 200) {
            Toast.success('保存成功')
            setTimeout(() => {
                history.back();
            }, 1000)
        } else {
            Toast.fail('保存失败')
        }
    })
}

onUnmounted(() => {
    clearTimeout()
})

</script>

<style lang="less" scoped>
.addressDetails {
    text-align: left;
    .van-area {
        position: fixed;
        bottom: 0;
        width: 100%;
    }
}
</style>
