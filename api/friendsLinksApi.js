import request from '@/utils/request';

export default {
  getFriendsLinks() {
    return request({
      url: '/admin/friend_link/list',
      method: 'get'
    })
  }
}
