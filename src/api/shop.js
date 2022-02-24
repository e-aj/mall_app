import request from './api'

export function getShopCar(){
    return request({
        method:'get',
        url:'shop-cart'
    })
}