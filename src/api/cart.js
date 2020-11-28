import request from '@/utils/request'   //引入封装的axio函数

export function addcart(userid, goodsid, sizeid, colorid, count) {   //请求接口
    return request({
      url: `/cart/addcart`,
      method: 'post',
      params: {userid, goodsid, sizeid, colorid, count}
    })
}

export function getcartbyid(id) {   //请求接口
  return request({
    url: `/cart/getcartbyid/${id}`,
    method: 'get'
  })
}

export function cartdelete(id) {   //请求接口
    return request({
      url: `/cart/deletecart/${id}`,
      method: 'get'
    })
}

export function cartgetall(id) {   //请求接口
    return request({
      url: `/cart/getall/${id}`,
      method: 'get'
    })
}

export function clearall(id) {   //请求接口
    return request({
      url: `/cart/clearall/${id}`,
      method: 'get'
    })
}

export function deletecartbyid(id) {   //请求接口
    return request({
      url: `/cart/deletecartbyid/${id}`,
      method: 'get'
    })
}