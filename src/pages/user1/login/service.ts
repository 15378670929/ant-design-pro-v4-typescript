import request from '@/utils/request'

export async function fakeAccountLogin1(params: any) {
  return request('/api/login1/account', {
    method: 'post',
    data: params
  })
}