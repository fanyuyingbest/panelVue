import request from '@/utils/request'

// 使用

export function getInfo(){
  return request({
    url: '/user/info',
    method: 'get',
    params
  })
}