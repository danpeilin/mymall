import request from '@/utils/request'   //引入封装的axio函数

export function getallsize(id) {   //请求接口
    return request({
      url: `/size/getallsize/${id}`,
      method: 'get'
    })
}

export function getgoodsbyid(id) {   //请求接口
  return request({
    url: `/goods/getgoodsbyid/${id}`,
    method: 'get'
  })
}

export function getsizebyid(id) {   //请求接口
  return request({
    url: `/size/getsizebyid/${id}`,
    method: 'get'
  })
}