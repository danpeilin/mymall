import request from '@/utils/request'   //引入封装的axio函数

export function getalladdress(id) {   //请求接口
    return request({
      url: `/address/getalladdress/${id}`,
      method: 'get'
    })
}

export function addaddress(data) {   //请求接口
    return request({
      url: `/address/addaddress`,
      method: 'post',
      data: data
    })
}

export function deletead(id) {   //请求接口
    return request({
      url: `/address/deletead/${id}`,
      method: 'get'
    })
}

export function getadbyuserid(userId, id) {   //请求接口
    return request({
      url: `/address/getadbyuserid/${userId}/${id}`,
      method: 'get'
    })
}

export function updateadress(data) {   //请求接口
    return request({
      url: `/address/updateadress`,
      method: 'post',
      data: data
    })
}