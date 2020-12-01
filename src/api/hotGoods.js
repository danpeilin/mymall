import request from '@/utils/request'

export function getHotGoods(currentPage,pageSize){
    return request({
        url: `/hotGoods/getHotGoods/${currentPage}/${pageSize}`,
        method: 'get'
    })
}