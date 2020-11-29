import request from '@/utils/request'   //引入封装的axio函数

export function savetobuy(data) {   //请求接口
    return request({
      url: `/tobuy/savetobuy`,
      method: 'post',
      data: data
    })
}

export function getalltobuy(id) {   //请求接口
  return request({
    url: `/tobuy/getalltobuy/${id}`,
    method: 'get'
  })
}

export function delteall(id) {   //请求接口
  return request({
    url: `/tobuy/delteall/${id}`,
    method: 'get'
  })
}