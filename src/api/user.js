import request from './api'

export function getInfo(){
    return request({
        method:'get',
        url:'/user/info',
    })
}
export function putInfo(data){
    return request({
        method:'put',
        url:'/user/info',
        data:data
    })
}

// 地址管理
export function getAddress(){
    return request({
        method:"get",
        url:'/address'
    })
}
export function putAddress(data){
    return request({
        method:"put",
        url:'/address',
        data:data
    })
}