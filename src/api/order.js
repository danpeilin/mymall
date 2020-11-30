import request from '@/utils/request'   //引入封装的axio函数

export function ordersaveadress(data) {   //请求接口
    return request({
      url: `/orders/ordersaveadress`,
      method: 'post',
      data:data
    })
}

export function getgoodsbyid(id) {   //请求接口
  return request({
    url: `/goods/getgoodsbyid/${id}`,
    method: 'get'
  })
}

export function getallorder(id) {   //请求接口
  return request({
    url: `/orders/getallorder/${id}`,
    method: 'get'
  })
}

export function getorderbyuser(id) {   //请求接口
  return request({
    url: `/orders/getorderbyuser/${id}`,
    method: 'get'
  })
}

export function deleteorder(id) {   //请求接口
  return request({
    url: `/orders/deleteorder/${id}`,
    method: 'get'
  })
}

export function getorderfukuan(id) {   //请求接口
  return request({
    url: `/orders/getorderfukuan/${id}`,
    method: 'get'
  })
}

export function deletereal(id) {   //请求接口
  return request({
    url: `/orders/deletereal/${id}`,
    method: 'get'
  })
}

export function getorderguanbi(id) {   //请求接口
  return request({
    url: `/orders/getorderguanbi/${id}`,
    method: 'get'
  })
}