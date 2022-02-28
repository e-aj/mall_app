import request from './api'

export function getShopCar(){
    return request({
        method:'get',
        url:'shop-cart'
    })
}
export function putShopCar(data){
    return request({
        method:'put',
        url:'shop-cart',
        data:data
    })
}
export function getGoodsInfo(id){
    return request({
        method:'get',
        url:`shop-cart/settle?cartItemIds=${id}`
    })
}
export function saveOrder(data){
    return request({
        method:'post',
        url:'saveOrder',
        data:data
    })
}