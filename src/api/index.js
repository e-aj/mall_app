import request from './api'

export function getHome(){
    return request({
        method: 'get',
        url:  '/index-infos',
    })
}
