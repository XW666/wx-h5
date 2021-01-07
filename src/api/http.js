import request from '@/utils/request'
export default {
  //获取apen_id
  getToken(data) {
    return request({
      url: '/sns/oauth2/access_token',
      method: 'get',
      params: data
    })
  },
  // 登记联系人

}
