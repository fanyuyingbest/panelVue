  import axios from 'axios'
  import {Message} from 'element-ui'
  import store from '@/store'
  import { getToken } from '@/utils/auth'

  //创建axios实例
  const serve = axios.create({
    baseURL: process.env.BASE_API, //api的base_url
    timeout: 5000 //请求超时时间
  })

  //request 拦截器
  service.interceptors.request.use(config => {
    if(store.getter.token){
      config.headers['X-Token'] = getToken() //让每一个请求都携带token
    }
    return config
  }, error => {
    console.log(error)
    Promise.reject(error)
  })

  // response拦截器
  service.interceptors.response.use(
    response => response,
    // 此处可以对返回的code做不同的功能处理
    // const res = response.data;
    // if(res.code !== 200){...}
    error => {
      console.log('err' + error)
      Message({
        message:error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  )