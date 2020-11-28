import request from '@/utils/request'   //引入封装的axio函数

export function getallcolor() {   //请求接口
    return request({
      url: `/color/getallcolor`,
      method: 'get'
    })
}

export function getgoodsbyid(id) {   //请求接口
  return request({
    url: `/goods/getgoodsbyid/${id}`,
    method: 'get'
  })
}