import request from '@/utils/request';
export default {
  getMasterInfo() {
    return request({
      url: '/user/user_info/1340309806199713794',
      method: 'get'
    })
  },
  getArticles(page,size,categoryId){
    return request({
      url: `/portal/article/list/${page}/${size}?categoryId=${categoryId}`,
      method: 'get'
    })
  },
  getCategories() {
    return request({
      url: '/portal/article/categories',
      method: 'get'
    })
  },
  getWebSizeViewCount() {
    return request({
      url: '/portal/web_size_info/view_count',
      method: 'get'
    })
  },
  getWebSizeTitle(){
    return request({
      url: '/portal/web_size_info/title',
      method: 'get'
    })
  },
  getWebSizeSeo() {
    return request({
      url: '/portal/web_size_info/seo',
      method: 'get'
    })
  },
  getTopArticles(){
    return request({
      url: '/portal/article/top',
      method: 'get'
    })
  },
  getHotLabels(count) {
    return request({
      url: `/portal/article/label/${count}`,
      method:'get'
    })
  },
  getTotalArticlesPublishCount() {
    return request({
      url: '/portal/article/publish/count',
      method: 'get'
    })
  },
  getBlogAdvice() {
    return request({
      url: '/portal/web_size_info/advice',
      method:'get'
    })
  }
}
