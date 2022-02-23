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