import request from './api'

export function getCategoires(){
    return request({
        method:'get',
        url:'categories'
    })
}
export function getSearch(goodsCategoryId,keyword,orderBy){
    return request({
        method:'get',
        url:`search?pageNumber=1&goodsCategoryId=${goodsCategoryId}&keyword=${keyword}&orderBy=${orderBy}`
    })
}
