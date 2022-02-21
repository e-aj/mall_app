import request from './api'

export function getInfo(){
    return request({
        method:'get',
        url:'/user/info',
    })
}