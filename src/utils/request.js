import axios from 'axios'

//创建一个axios实例
const service = axios.create({
      baseURL: 'http://localhost:8002', // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests//在跨域请求时发送cookie
      // 所有的请求都会带上这些配置，比如全局都要用的身份信息等。
      headers: {
        'Content-Type': 'application/json'
        // 'token_in_header': global_.token,//token从全局变量那里传过来
      },
    timeout: 5000 // request timeout
  })

service.interceptors.request.use(
    config => {
    //debugger
    if (localStorage.Token) {
        config.headers['Token'] = localStorage.Token;
    }
      return config
    },
    err => {
    return Promise.reject(err);
})
  // response interceptor//响应拦截器
  service.interceptors.response.use(
    response => {
      //debugger
      if (response.data.code == 28004) {
        //   console.log("response.data.resultCode是28004")
          // 返回 错误代码-1 清除ticket信息并跳转到登录页面
          //debugger
        //   window.location.href="/login"
          return
      }else{
          return response.data;
      }
    },
    error => {
      return Promise.reject(error.response)   // 返回接口返回的错误信息
  });
  
  export default service
