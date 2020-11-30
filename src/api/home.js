import request from '@/utils/request'

export function getCategory(){
    return request({
        url: '/home/category',
        method: 'get'
    })
}

export function getNewGoods(){
    return request({
        url: '/home/newGoods',
        method: 'get'
    })
}

export function getFeatured(){
    return request({
        url: '/home/featured',
        method: 'get'
    })
}