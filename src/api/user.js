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
export function changeAddress(data,method){
    return request({
        method:method,
        url:'/address',
        data:data
    })
}
export function deleteAddress(id){
    return request({
        method:"delete",
        url:`/address/${id}`,
    })
}
export function getOrder(pageNumber,status){
    return request({
        method:'get',
        url:`order?pageNumber=${pageNumber}&status=${status}`
    })
}

export function getOrderDetails(orderNo){
    return request({
        method:'get',
        url:`/order/${orderNo}`
    })
}