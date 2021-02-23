import request from '@/utils/request';
export default {
  getArticleDetails(articleId) {
    return request({
      url: `/portal/article/${articleId}`,
      method: 'get'
    })
  },
  getRecommendArticles(articleId,size) {
    return request({
      url: `/portal/article/recommend/${articleId}/${size}`,
      method: 'get'
    })
  },
  getArticleCommends(articleId, page, size,isMore) {
    return request({
      url: `/portal/comment/list/${articleId}/${page}/${size}?isMore=${isMore}`,
      method: 'get'
    })
  },
  postComment(comment) {
    return request({
      url: `/portal/comment`,
      method: 'post',
      data: comment
    });
  },
  getArchiveArticles() {
    return request({
      url: '/portal/article/archive/articles',
      method: 'get'
    })
  }
}
