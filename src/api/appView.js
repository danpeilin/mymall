import request from '@/utils/request'

export function search(s){
    return request({
        url: '/appView/search',
        method: 'post',
        params: {s}
    })
}