import request from '@/utils/request'

export function getNewGoods(currentPage,pageSize){
    return request({
        url: `/newGoods/getNewGoods/${currentPage}/${pageSize}`,
        method: 'get'
    })
}