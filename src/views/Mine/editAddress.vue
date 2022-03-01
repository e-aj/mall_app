<template>
    <div class="addressDetails">
        <van-nav-bar :title="state.title" left-arrow @click-left="onClickLeft" />
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
                <van-button round block native-type="submit" @click="deleted" style="margin:20px 0">删除</van-button>
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
import { changeAddress, deleteAddress } from '../../api/user';
import { useRoute } from 'vue-router';
import { areaList } from '@vant/area-data';
import { Toast, Dialog } from 'vant';
import { onUnmounted } from '@vue/runtime-core';

const route = useRoute()

const state = reactive({
    title: '',
    formData: {
        userName: '',
        userPhone: '',
        provinceName: '',
        cityName: '',
        regionName: '',
        detailAddress: '',
        defaultFlag: ""
    },
    areaShow: false,
    area: "",
    checked: ''
})
// 获取信息
state.title = route.params.title
const formData = route.params.form
state.formData = JSON.parse(formData)
state.area = `${state.formData.provinceName}/${state.formData.cityName}/${state.formData.regionName}`
state.formData.defaultFlag == 0 ? state.checked = false : state.checked = true

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
    console.log(state.checked)
    state.checked == true ? state.formData.defaultFlag = 1 : state.formData.defaultFlag = 0
}

// 保存信息
const onSubmit = () => {
    changeAddress(state.formData,'put').then(res => {
        if (res.data.resultCode == 200) {
            Toast.success('保存成功')
            localStorage.setItem('address',JSON.stringify(state.formData))
            setTimeout(() => {
                history.back();
            }, 1000)
        } else {
            Toast.fail('保存失败')
        }
    })
}
// 删除信息
const deleted = () => {
    Dialog.confirm({
        message:
            '请问是否确认删除信息？',
    })
        .then(() => {
            // on confirm
            deleteAddress(state.formData.addressId).then(res => {
                if (res.data.resultCode == 200) {
                    Toast.success('删除成功')
                    setTimeout(() => {
                        history.back();
                    }, 1000)
                } else {
                    Toast.fail('删除失败')
                }
            })
        })
        .catch(() => {
            // on cancel
        });

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
