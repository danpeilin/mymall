import request from '@/utils/request'   //引入封装的axio函数

export function getalladdress(id) {   //请求接口
    return request({
      url: `/address/getalladdress/${id}`,
      method: 'get'
    })
}
