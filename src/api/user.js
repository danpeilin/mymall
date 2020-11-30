import request from '@/utils/request'   //引入封装的axio函数

export function login(username, password) {   //请求接口
  return request({
    url: '/login',
    method: 'post',
    params: {username, password}
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

export function getmyuser(id) {
  return request({
    url: `/user/getmyuser/${id}`,
    method: 'get'
  })
}

export function savemyuser(data) {
  return request({
    url: `/user/savemyuser`,
    method: 'post',
    data: data
  })
}

export function updatepass(data) {
  return request({
    url: `/user/updatepass`,
    method: 'post',
    data: data
  })
}

export function sendmsm(phone) {
  return request({
    url: `/msm/send/${phone}`,
    method: 'get'
  })
}

export function phonelogin(phone, code) {
  return request({
    url: `/phonelogin`,
    method: 'post',
    params: {phone, code}
  })
}

