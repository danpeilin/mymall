import request from '@/utils/request'   //引入封装的axio函数

export function getallcate() {   //请求接口
  return request({
    url: '/admin/category/getallcate',
    method: 'get'
  })
}

export function regist(data) {   //请求接口
  return request({
    url: '/regist',
    method: 'post',
    data
  })
}

export function getuserinfo() {
  return request({
    url: '/user/getuserinfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}