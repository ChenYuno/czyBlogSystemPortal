import request from '@/utils/request';
export default {
  doSearch(categoryId,keyword,page,size,sort){
    return request({
      url:`/portal/search?keyword=${keyword}&page=${page}&size=${size}&categoryId=${categoryId}&sort=${sort}`,
      method: 'get'
    })
  }
}
