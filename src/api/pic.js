import request from '@/utils/request'   //引入封装的axio函数

export function getsmallpic(id) {   //请求接口
    return request({
      url: `/pic/getsmallpic/${id}`,
      method: 'get'
    })
}

export function getallpic(id) {   //请求接口
  return request({
    url: `/pic/getallpic/${id}`,
    method: 'get'
  })
}