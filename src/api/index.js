import request from './api'

export function getHome(){
    return request({
        method: 'get',
        url:  '/index-infos',
    })
}
export function getProductDetails(id){
    return request({
        method:'get',
        url:`goods/detail/${id}`
    })
}

export function addShop_Cart(data){
    return request({
        method:'post',
        url:'shop-cart',
        data:data
    })
}