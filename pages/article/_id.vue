<template>
  <div class="article-page-golbal-box" style="width: 100%">
    <div class="article-total-box">
      <div class="article-exclusive-cover-box">
        <img class="article-exclusive-cover-image" :src="baseUrl+'/portal/image/'+article.cover">
      </div>
      <div class="article-main-box">
        <div class="article-main-inner-box">
          <div id="waves">
            <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                 viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
              <defs>
                <path id="gentle-wave"
                      d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
              </defs>
              <g class="parallax">
                <use xlink:href="#gentle-wave" x="48" y="0"></use>
                <use xlink:href="#gentle-wave" x="48" y="3"></use>
                <use xlink:href="#gentle-wave" x="48" y="5"></use>
                <use xlink:href="#gentle-wave" x="48" y="7"></use>
              </g>
            </svg>
          </div>

          <div class="article-inner">
            <div class="article-content-box">

              <!-- 文章内容start -->
              <div class="article-content-margin-box">
                <div class="article-title">
                  <h2 class="article-title-h">{{article.title}}</h2>
                </div>
                <div class="article-info">
                  <vs-avatar>
                    <img style="height: 100%;width: 100%" :src="article.user.avatar" alt="">
                  </vs-avatar>
                  <div>{{article.user.userName}}</div>
                  <div class="article-create-time"><i class="iconfont icon-icon"></i>发表于:{{article.createTime}}</div>
                  <div class="article-viewcount"><i class="iconfont icon-view"></i>浏览量:{{article.viewCount}}</div>
                </div>
                <div class="article-label">
                  标签🏷：<a :href="`/search?keyword=${item}`" v-for="(item,index) in article.label"
                          :key="index">{{item}}</a>
                </div>

                <!--  文章之前显示目录  -->
                <div id="article-content-category-box"></div>

                <!--  markdown  -->
                <div id="doc-content">
                  <textarea id="content" style="display:none;" placeholder="markdown"
                            v-text="article.content"></textarea>
                </div>

                <div class="article-copyright">
                  <i class="mdui-list-item-icon iconfont icon-about"></i>
                  <p>文章发布自：
                    <a href="/" target="_blank">{{article.user.userName}}</a>
                    ，转载请注明出处，谢谢！
                  </p>
                  <div>&nbsp;</div>

                  <el-button type="primary" plain @click="supportMedthod">{{supportBtn}}</el-button>
                  <div v-if="isSupport" style="color: #f54c6e;font-weight: 600;font-size: 24px;margin: 6px auto">打赏码:</div>
                  <img src="../../assets/images/wechatpay.jpg" style="width: 300px;height: 300px;border-radius: 6px;display: block" v-if="isSupport">
                </div>


              </div>
              <!-- 文章内容end -->


              <!-- 用户评论start -->
              <div class="article-login-user-input">
                <div
                  style="padding: 20px;font-size: 30px;font-weight: 600;height: 70px;width: 100%;color: #DD4A68;line-height: 70px;">
                  用户评论:
                </div>
                <client-only>
                  <quill-editor
                    ref="myQuillEditor"
                    v-model="loginUserComment"
                    :options="editorOption"
                    @focus="onEditorFocus($event)"
                  />
                </client-only>
                <div style="padding: 20px">
                  <vs-button style="height: 46px;width: 120px;border-radius: 6px;font-size: 18px"
                             @click="commitComment"
                  >
                    提交评论
                  </vs-button>
                </div>
              </div>

              <!-- 用户评论end -->

              <!-- 文章评论内容start -->

              <div class="article-commends-box" v-if="articleCommends.records.length>0">
                <div class="article-commends-items-list-box">
                  <div class="commends-items-main-content-title">
                    文章评论：
                  </div>
                  <hr>
                  <ul>
                    <li v-for="(item,index) in articleCommends.records" :key="index">
                      <div class="articleCommends-content" v-html="item.content">
                      </div>
                      <div class="articleCommends-replay-action">
                        <div class="articleCommends-replay-action-left">
                          <a @click="showChildCommentAction(item.id)" class="childCredita mdui-btn mdui-btn-raised"><i
                            class="fa fa-commenting-o" aria-hidden="true"></i>&nbsp;评论</a>
                          <span><i class="fa fa-calendar" aria-hidden="true"></i>&nbsp;{{item.createTime}}</span>
                        </div>
                        <div class="articleCommends-replay-action-userinfo">
                          <img :src="item.userAvatar"><span><a :href="`/userInfo/${item.userId}`" >{{item.userName}}</a></span>
                        </div>
                      </div>
                      <ul :id="item.id" v-if="item.childrenCommends.length>0">
                        <!-- js动态遍历插入子评论的地方 -->
                      </ul>
                      <div style="display: none" :class="`articleCommends-commentChild commit_${item.id}`">
                        <div class="articleCommends-commentChild-defaultAvatar">
                          <img src="@/assets/images/kawayi.gif">
                        </div>
                        <div class="articleCommends-commentChild-textarea">
                          <textarea :class="`topCommentComment_${item.id}`"></textarea>
                        </div>
                        <div class="articleCommends-commentChild-commitBtn">
                          <vs-button
                            @click="childCommentCommit(item.id)"
                          >
                            {{childCommentBtn}}
                          </vs-button>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div class="load-more-comments" @click="loadMoreComments">{{loadMoreCommentsDisplay}}</div>
                </div>
              </div>

              <!-- 评论内容end -->


              <!-- 推荐文章start -->
              <div class="article-recommend-total-box" v-if="recommendArticles.length>0">

                <div class="article-recommend-title">
                  更多推荐文章:
                </div>

                <vs-card-group>
                  <vs-card v-for="(item,index) in recommendArticles" :key="index">
                    <template #title>
                      <h3 @click="clickRecommendArticle(item.id)">{{item.title}}</h3>
                    </template>
                    <template #img>
                      <img @click="clickRecommendArticle(item.id)" :src="baseUrl+'/portal/image/'+item.cover" alt="">
                    </template>
                    <template #text>
                      <p @click="clickRecommendArticle(item.id)">
                        {{item.summary}}
                      </p>
                    </template>
                    <template #interactions>
                      <div>
                        <vs-button shadow icon>
                          <i class="fa fa-calendar" aria-hidden="true"></i>
                          <span class="span">
                            &nbsp;{{item.createTime}}
                          </span>
                        </vs-button>
                        <vs-button shadow icon>
                          <i class="fa fa-eye" aria-hidden="true"></i>
                          <span class="span">
                            &nbsp;{{item.viewCount}}
                          </span>
                        </vs-button>
                      </div>
                      <div>

                        <vs-button @click="clickRecommendTags(l)" shadow icon v-for="(l,index) in item.label"
                                   :key="index">
                          <span class="span">
                            &nbsp;{{l}}
                          </span>
                        </vs-button>
                      </div>
                    </template>
                  </vs-card>
                </vs-card-group>

              </div>
              <!-- 推荐文章end -->
            </div>


            <div class="article-content-catalog-box">
              <div class="web-size-advice-article">
                <span>博客通知：</span>
                <div class="web-size-advice-article-content">{{blogAdvice}}</div>
              </div>
              <div class="article-catalog-tag-cloud">
                <span>热门标签🏷:</span>
                <wordcloud
                  :rotate="{from: -45, to: 45, numOfOrientation: 10 }"
                  :margin="margin"
                  :fontsize="fontsize"
                  :data="hotLabels"
                  nameKey="name"
                  valueKey="count"
                  :showTooltip="false"
                  :wordClick="wordClickHandler">
                </wordcloud>
              </div>
              <div class="article-catalog-second">
                <div class="catalog-title">
                  目录:
                </div>
                <div id="article-real-content-catalog">

                </div>
              </div>
            </div>
          </div>


          <vs-dialog not-close auto-width not-padding v-model="clickImgBlowUp">
            <div class="con-image">
              <img :src="lookingImgBlowUpSrc" alt="">
            </div>
          </vs-dialog>


          <div class="dress-bottom-article-details-box">
            <div class="dress-bottom-image-article-details"></div>
          </div>
          <div class="article-details-footer">

            <div>[ [ 埋骨何须桑梓地<span class="my-face"> ❤️</span>人生无处不青山 ] ]</div>
            <div>
              本站已
              <span class="timeDate"></span>
              <span class="times"></span>
              <span class="my-face"> ღゝ◡╹)ノ♡</span>
            </div>
            <div>Copyright © 2020-2021 czyBlog Powered by czystudy.com Core on NUXTJS</div>

            <div >
              <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44190002005367" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;color: #fff">
                <img src="../../assets/images/beian.png"/>粤公网安备 44190002005367号&nbsp;&nbsp;粤ICP备2021019933号-1
              </a>
            </div>
          </div>


        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import articleApi from "../../api/articleApi";
  import Catalog from '@/utils/CatalogLineHandler';
  import homeApi from "../../api/homeApi";
  import userApi from "../../api/userApi";

  export default {
    head() {
      return {
        title: '陈展云的博客-'+this.article.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: '陈展云的博客-'+this.article.summary
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: this.hlabels
          }
        ],
        link: [
          {rel: 'stylesheet', href: '/mdeditorlib/editormd.min.css', ssr: false}
        ],
        script: [
          {src: '/mdeditorlib/jquery.min.js', type: 'text/javascript'},
          {src: '/mdeditorlib/marked.min.js', type: 'text/javascript'},
          {src: '/mdeditorlib/prettify.min.js', type: 'text/javascript'},
          {src: '/mdeditorlib/raphael.min.js', type: 'text/javascript'},
          {src: '/mdeditorlib/underscore.min.js', type: 'text/javascript'},
          {src: '/mdeditorlib/sequence-diagram.min.js', type: 'text/javascript'},
          {src: '/mdeditorlib/flowchart.min.js', type: 'text/javascript'},
          {src: '/mdeditorlib/jquery.flowchart.min.js', type: 'text/javascript'},
          {src: '/mdeditorlib/editormd.js', type: 'text/javascript'},
        ]
      }
    },
    async asyncData({params}) {
      let articleData = await articleApi.getArticleDetails(params.id);
      let labels = articleData.data.data.data.labels;
      let hlabels = labels.replace(/-/g, ',');
      console.log(hlabels);
      let recommendArticles = await articleApi.getRecommendArticles(articleData.data.data.data.id, 6);
      let hotLabels = await homeApi.getHotLabels(10);
      let articleCommends = await articleApi.getArticleCommends(articleData.data.data.data.id, 1, 10);
      return {
        article: articleData.data.data.data,
        recommendArticles: recommendArticles.data.data.data,
        hotLabels: hotLabels.data.data.data,
        articleCommends: articleCommends.data.data.data,
        hlabels: hlabels
      }
    },
    data() {
      return {
        isSupport: false,
        supportBtn: '如果觉得不错可以支持一下站长(*❦ω❦)→点击一下支持',
        blogAdvice: '',
        hlabels: '',
        articleCommends: {
          currentPage: 1,
          pageSize: 10
        },
        fontsize: [20, 30],
        margin: {top: 0, right: 0, bottom: 0, left: 0},
        hotLabels: [],
        article: {
          id: '',
          title: '',
          label: [],
          content: '',
          user: {
            userName: '',
            avatar: ''
          }
        },
        clickImgBlowUp: false,
        lookingImgBlowUpSrc: '',
        recommendArticles: [],
        isDisplayChildCommends: [],
        loginUserComment: '',
        editorOption: {
          placeholder: "需要登录才可以留下足迹哦哦~~",
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline'],    //加粗，斜体，下划线，删除线
              ['blockquote', 'code-block'],     //引用，代码块
              [{'header': 1}, {'header': 2}],        // 标题，键值对的形式；1、2表示字体大小
              [{'list': 'ordered'}, {'list': 'bullet'}],     //列表
            ]
          }
        },
        childCommentBtn: '评论',
        lastShowCommentActionDiv: '',
        ccdefaultAvatar: require('@/assets/images/kawayi.gif'),
        replyBtnToAddClickList: [],
        commitCommendId: '',
        commitCommentData:{
          articleId: '',
          content: '',
          parentContentId: ''
        },
        loadMoreCommentsDisplay: '加载更多'
      };
    },
    mounted() {
      this.$nextTick(() => {
        let that = this;
        $(function () {
          setTimeout(() => {
            var testEditor;
            testEditor = editormd.markdownToHTML("doc-content", {//注意：这里是上面DIV的id
              htmlDecode: "style,script,iframe",
              emoji: true,
              taskList: true,
              tocm: true,
              tex: true, // 默认不解析
              flowChart: true, // 默认不解析
              sequenceDiagram: true, // 默认不解析
              codeFold: true
            });

            let mdContent = document.getElementById('doc-content');
            let contentAllImg = mdContent.querySelectorAll('img');
            contentAllImg.forEach(img => {
              // console.log(img);
              img.addEventListener('click', that.showImage)
            });

            new Catalog({
              contentEl: 'doc-content',
              catalogEl: 'article-real-content-catalog',
              selector: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
            })
          }, 100);
        });
        this.triggleShowAllCommentsWhenMounted();

        window.addEventListener('click', this.showChildReplyCommentAction);
        window.addEventListener('click', this.childCommentReplyCommit);



      })

      this.getBlogAdvice();

    },
    methods: {
      supportMedthod() {
        this.isSupport = !this.isSupport;
        if (this.isSupport) {
          this.supportBtn = '眼不见为净o(╥﹏╥)o';
        } else {
          this.supportBtn = '如果觉得不错可以支持一下站长(*❦ω❦)→点击一下支持';
        }
      },
      getBlogAdvice() {
        homeApi.getBlogAdvice()
        .then(res=>{
          if (res.data.code === 20000) {
            this.blogAdvice = res.data.data.data
          }
        })
      },
      loadMoreComments() {
        if (this.articleCommends.pageSize !== this.articleCommends.totalCount) {
          if (this.loadMoreCommentsDisplay === '加载更多') {
            this.loadMoreCommentsDisplay = '没有更多了';
          }
          return;
        }
        this.articleCommends.pageSize += 5;

        articleApi.getArticleCommends(this.article.id, this.articleCommends.currentPage, this.articleCommends.pageSize,'more')
          .then(res => {
            if (res.data.code === 20000) {
              this.articleCommends = res.data.data.data;

              if (this.articleCommends.pageSize !== this.articleCommends.totalCount) {
                this.loadMoreCommentsDisplay = '没有更多了';
              }

              window.removeEventListener('click', this.showChildReplyCommentAction);
              window.removeEventListener('click', this.childCommentReplyCommit);
              setTimeout(() => {
                this.triggleShowAllCommentsWhenMounted();
                window.addEventListener('click', this.showChildReplyCommentAction);
                window.addEventListener('click', this.childCommentReplyCommit);
              }, 100);
            }
          });
      },
      //用来显示循环遍历出的子评论的评论框
      showChildReplyCommentAction(e) {
        if (!e.target.id || this.replyBtnToAddClickList.indexOf(e.target.id)===-1) {
          return;
        }
        //先把提交评论需要的父评论弄到data中
        this.commitCommendId = e.target.id;
        console.log(this.commitCommendId)

        let isReply = '.r_c_' + e.target.id;
        let replyDialogDom = document.querySelector(isReply);
        if (replyDialogDom) {
          //textarea在第二个儿子的div里面，点开之前把内容置空
          let dataDom = replyDialogDom.children[1].children[0];
          if (dataDom) {
            dataDom.value = '';
          }
          if (this.lastShowCommentActionDiv !== '') {
            this.lastShowCommentActionDiv.style.display = 'none';
          }

          replyDialogDom.style.display = 'flex';
          this.lastShowCommentActionDiv = replyDialogDom;
        }
      },
      //显示评论顶级评论的评论框
      showChildCommentAction(noparCommentId) {
        if (this.lastShowCommentActionDiv !== '') {
          this.lastShowCommentActionDiv.style.display = 'none';
        }
        let toCommentAttrbuteId = noparCommentId;
        let childCommentAction = document.querySelector(`.commit_${toCommentAttrbuteId}`);

        if (childCommentAction) {
          //textarea在第二个儿子的div里面，点开之前先置空内容
          let dataDom = childCommentAction.children[1].children[0];
          if (dataDom) {
            dataDom.value = '';
          }
          childCommentAction.style.display = 'flex';
          this.lastShowCommentActionDiv = childCommentAction;
          return;
        }

      },
      onEditorFocus(quill) {
        //当光标在富文本编辑器里，或是打字的时候会触发该方法
      },
      clickRecommendArticle(recommendArticleId) {
        // console.log(recommendArticleId)
        location.href = `/article/${recommendArticleId}`;
      },
      clickRecommendTags(tagName) {
        window.open(`/search?keyword=${tagName}`);
      },
      showImage(e) {
        console.log(e.target.src);
        this.lookingImgBlowUpSrc = e.target.src;
        this.clickImgBlowUp = true;
      },
      wordClickHandler(name, value, vm) {
        location.href = "/search?keyword=" + encodeURIComponent(name);
      },
      //通用的评论方法，当提交评论之后就走这里向后台提交数据，成功之后重新渲染所有评论
      commeonMethodToCommitComment(articleId,content,parentContentId) {

        userApi.checkToken()
          .then(res => {
            if (res.data.code === 20000) {
              //到了这里说明可以提交评论了
              this.commitCommentData = {
                articleId: articleId,
                content: content,
                parentContentId: parentContentId
              }
              articleApi.postComment(this.commitCommentData)
                .then(res => {
                  this.commitCommentData = {
                    articleId: '',
                    content: '',
                    parentContentId: ''
                  }
                  if (res.data.code === 20000) {
                    //todo:修改参数用于显示更多的评论更能
                    this.getArticleCommendsCommon(this.articleCommends.currentPage, this.articleCommends.pageSize);

                  } else {
                    this.openNotification(res.data.message);
                  }
                });

            } else {
              this.openNotification('您需要登录了才能更好的和这里的读书人愉快的玩耍呢...');
              this.$router.push({
                path: '/login'
              })
            }
          });

        //无论怎么样都清空一下输入框的内容还有关闭输入框
        //这里分为两种case，没有父id的就把富文本编辑器的内容置空，有父id的就把textarea的value置空
        if (this.lastShowCommentActionDiv !== '') {
          //有父id的获取textarea的内容区域并且置空
          if (parentContentId) {
            let topCommentComment = document.querySelector(`.topCommentComment_${parentContentId}`);
            if (topCommentComment) {
              topCommentComment.value = '';
            } else {
              let childCommentReplyCommitTextarea = document.querySelector(`childCommentReplyCommitTextarea_${parentContentId}`);
              if (childCommentReplyCommitTextarea) {
                childCommentReplyCommitTextarea.value = '';
              }
            }
          } else {
            this.loginUserComment = '';
          }
          console.log(this.lastShowCommentActionDiv);
          this.lastShowCommentActionDiv.style.display = 'none';
        }



      },
      //通用的刷新评论数据的方法抽取
      getArticleCommendsCommon(page,size) {

        articleApi.getArticleCommends(this.article.id, page, size)
          .then(res => {
            if (res.data.code === 20000) {
              this.articleCommends = res.data.data.data;
              window.removeEventListener('click', this.showChildReplyCommentAction);
              window.removeEventListener('click', this.childCommentReplyCommit);
              setTimeout(() => {
                this.triggleShowAllCommentsWhenMounted();
                window.addEventListener('click', this.showChildReplyCommentAction);
                window.addEventListener('click', this.childCommentReplyCommit);
              }, 100);
            }
          });

      },
      //接下来的三个方法都是提交数据的方法，只是把所需要的的数据准备好之后就调用通用的评论提交方法
      commitComment() {
        //登录的用户没有父评论，只有登录后且评论不为空则可以提交评论
        console.log(this.loginUserComment);
        this.commeonMethodToCommitComment(this.article.id, this.loginUserComment);

      },
      childCommentCommit(firstCommendParentId) {
        //这个方法是对评论中的第一条评论进行的评论
        console.log('评论提交或子评论回复');
        console.log(firstCommendParentId);
        let content = document.querySelector(`.topCommentComment_${firstCommendParentId}`).value;
        this.commeonMethodToCommitComment(this.article.id, content,firstCommendParentId);
      },
      childCommentReplyCommit(e) {
        let childCommentReplyCommitBtn = document.querySelector(`.childCommentReplyCommit_${this.commitCommendId}`);
        if (!childCommentReplyCommitBtn || e.target !== childCommentReplyCommitBtn) {
          return;
        }
        if (this.commitCommendId === '' ) {
          return;
        }
        let dataReplyToCommentDom = document.querySelector(`.childCommentReplyCommitTextarea_${this.commitCommendId}`);
        if (dataReplyToCommentDom) {
          //下面是用户输入的回复的数据
          let dataReplyToComment = dataReplyToCommentDom.value;
          console.log(dataReplyToComment);
          this.commeonMethodToCommitComment(this.article.id, dataReplyToComment,this.commitCommendId);
        }

        //childCommentReplyCommit_'+c.id+'
      },
      triggleShowAllCommentsWhenMounted() {
        if (this.articleCommends.records.length > 0) {
          this.articleCommends.records.forEach(childs => {
            if (childs.childrenCommends.length > 0) {
              let appendHtmlCommends = document.getElementById(childs.id);
              let appendTemplate = new String();
              console.log(childs.childrenCommends);
              appendTemplate = this.dfsAppend(appendTemplate, childs.childrenCommends, childs.userName,childs.id);
              appendHtmlCommends.innerHTML = appendTemplate;
            }
          });
        }
      },
      dfsAppend(appendTemplate, childrenCommends, parentUserName,parentCommentId) {

        childrenCommends.forEach(c => {
          appendTemplate += '<li class="apply-childcommend-item">\n' +
            '                            <div class="apply-childcommend-userinfo">\n' +
            '                              <div>\n' +
            '                              <img src="' + c.userAvatar + '">\n' +
            '\n' +
            '                              </div>\n' +
            '                              <div><a href="'+'/userInfo/'+c.userId+'"> ' + c.userName + '</a></div>\n' +
            '                              &emsp;\n' +
            '                              <div><a>@回复：&nbsp;' + parentUserName + '</a></div>\n' +
            '                            </div>\n' +
            '                            <div class="apply-childcommend-content">\n' +
            '                              ' + c.content + '\n' +
            '                            </div>\n' +
            '                            <div class="apply-childcommend-dateAndAction" id="'+parentCommentId+'">\n' +
            '                              <i class="fa fa-calendar-check-o" aria-hidden="true"></i>' + c.createTime +
            '                              &nbsp;&nbsp;\n' +
            '                              <a class="mdui-btn" id="'+c.id+'">回复</a>\n' +
            '                            </div>\n' +
              '                            <div class="articleCommends-commentChild r_c_' + c.id + '" style="display: none">\n' +
              '                              <div class="articleCommends-commentChild-defaultAvatar">\n' +
              '                                <img src="'+this.ccdefaultAvatar+'">\n' +
              '                              </div>\n' +
              '                              <div class="articleCommends-commentChild-textarea">\n' +
              '                                <textarea class="childCommentReplyCommitTextarea_'+c.id+'"></textarea>\n' +
              '                              </div>\n' +
              '                              <div class="articleCommends-commentChild-commitBtn">\n' +
              '<button class="vs-button vs-button--null vs-button--size-null vs-button--primary vs-button--default " style="--vs-color:;"><div class="vs-button__content childCommentReplyCommit_'+c.id+'">\n' +
              '                          回复\n' +
              '                        </div></button>'+
              '                              </div>\n' +
              '                            </div>\n' +
              '<ul>' ;
          if (c.childrenCommends.length > 0) {
            let currChildCommend = this.dfsAppend('', c.childrenCommends, c.userName);
            appendTemplate += currChildCommend;
          }
          appendTemplate +=   '                      </ul></li>';

          this.replyBtnToAddClickList.push(c.id);


        });
        return appendTemplate;

      },
      openNotification( text) {
        const noti = this.$vs.notification({
          position: 'top-center',
          width:'100%',
          color: '#7d33ff',
          title: 'czyblog温馨提示',
          text: text
        })
      }

    },
    beforeDestroy() {
      window.removeEventListener('click', this.showChildReplyCommentAction);
      window.removeEventListener('click', this.childCommentReplyCommit);
    }

  }
</script>

<style lang="less">//.articleCommends-replay-action-userinfo >span>a
  .apply-childcommend-userinfo a,.articleCommends-replay-action-userinfo >span>a{
    text-decoration: none;
  }
  .apply-childcommend-userinfo a:link,
  .apply-childcommend-userinfo a:visited,
  .articleCommends-replay-action-userinfo >span>a:link,
  .articleCommends-replay-action-userinfo >span>a:visited{
    color: #f54c6e;
  }
  .apply-childcommend-userinfo a:hover,
  .articleCommends-replay-action-userinfo >span>a:hover{
    color: cyan;
  }
  .apply-childcommend-userinfo a:active,
  .articleCommends-replay-action-userinfo >span>a:active{
   color: orangered;
   }
  .load-more-comments{
    text-align: center;
    line-height: 40px;
    height: 40px;
    width: 150px;
    margin: 20px auto;
    border: #6face2 dashed 3px;
    border-radius: 35px;
    font-size: 24px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      transition: all .6s;
      box-shadow: 0 12px 12px #282727;
    }
  }
  .apply-childcommend-item {
    margin: 20px;
  }

  .apply-childcommend-userinfo {
    align-items: center;
    display: flex;

    img {
      height: 30px;
      border-radius: 50%;
      width: 30px;
    }

  }

  .apply-childcommend-content {
    margin: 5px 30px;
  }

  .apply-childcommend-dateAndAction, .apply-childcommend-content {
    color: #8c8c8c;
  }

  .article-login-user-input {
    min-height: 400px;
    margin-top: 40px;
    width: 100%;
    border-radius: 30px;
    box-shadow: 0 0 12px #282727;

    .quill-editor {
      margin: 0 auto;
      height: 234px;
      width: 94%;

      .ql-toolbar.ql-snow {
        border: 3px solid #ccc;
      }

      .ql-container.ql-snow {
        border: 3px solid #ccc;
        border-top: 0;
        height: 188px;
      }
    }
  }


  .commends-items-main-content-title {
    font-size: 30px;
    font-weight: 600;
    height: 70px;
    width: 100%;
    color: #8c8c8c;
    line-height: 70px;
  }


  //评论的css样式start
  .article-commends-box {
    background-color: lightpink;
    width: 100%;
    margin-top: 40px;
    border-radius: 30px;

    .article-commends-items-list-box {
      padding: 20px;

      ul, li {
        list-style: none;
      }
    }

    .article-commends-items-list-box > ul > li {
      background-color: lightgoldenrodyellow;
      border-radius: 8px;
      margin-top: 30px;
    }

    .articleCommends-content {
      font-size: 20px;
      padding: 20px;
    }

    .articleCommends-replay-action {
      height: 50px;
      line-height: 50px;
      clear: both;

      & > .articleCommends-replay-action-left {
        float: left;
        margin-left: 20px;
        text-decoration: none;
        color: #8c8c8c;

        a {
          &:hover {
            color: orangered;
          }

          &:visited {
            color: #8c8c8c;
          }

          &:link {
            color: #8c8c8c;
          }
        }
      }

      & > .articleCommends-replay-action-userinfo {
        float: right;
        height: 50px;

        img {
          border-radius: 50%;
          height: 50px;
          width: 50px;
        }

        span {
          vertical-align: top;
          height: 50px;
          display: inline-block;
        }
      }
    }


  }

  .articleCommends-commentChild {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

  }

  .articleCommends-commentChild-defaultAvatar {
    margin-right: 20px;
  }

  .articleCommends-commentChild-defaultAvatar > img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }

  .articleCommends-commentChild-textarea > textarea {
    background-image: url('../../assets/images/doraamen.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right;
    resize: vertical;
    display: block;
    float: none;
    width: 600px;
    height: 80px;
    color: #535a63;
    border: 1px solid #ddd;
    background-color: #fff;
  }

  .articleCommends-commentChild-commitBtn {
    margin-left: 20px;
  }

  .articleCommends-commentChild-commitBtn > button {
    height: 40px;
    width: 100px;
  }

  @media screen and (max-width: 850px) {
    .articleCommends-commentChild-textarea > textarea {
      width: 400px;
    }
  }

  @media screen and (max-width: 660px) {
    .articleCommends-commentChild-textarea > textarea {
      width: 300px;
    }

    .articleCommends-commentChild-commitBtn, .articleCommends-commentChild-defaultAvatar {
      margin: 0;
    }
  }

  .childCredita {
    color: rebeccapurple;
  }

  //评论的css样式end...


  .cl-link-active > span {
    display: block;
    color: orangered;
    background-color: rgba(0, 255, 255, 1);
    border-radius: 4px;
    transition: all .8s;
    padding-left: 5px;
  }

  #article-real-content-catalog {
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;

    ul {
      margin: 10px 20px;
      font-size: 24px;
      color: #fff;
      list-style: none;

      span:hover {
        color: #ee5d7a;
        cursor: pointer;
      }
    }
  }


  .catalog-title {
    height: 34px;
    line-height: 34px;
    font-weight: 600;
    font-size: 30px;
    color: #DD4A68;
    padding: 20px;
    position: relative;
    border-radius: 30px;
    background: linear-gradient(wheat, lightpink);
  }

  #article-content-category-box {
    .content-category-title {
      height: 40px;
      line-height: 40px;
      font-weight: 600;
      font-size: 30px;
    }

    ul {
      font-size: 20px;
      color: #8c8c8c;
      margin: 10px 30px;
      list-style: none;

      span:hover {
        color: #DD4A68;
        cursor: pointer;
      }
    }
  }

  .article-recommend-title {
    height: 100px;
    line-height: 100px;
    font-size: 35px;
    font-weight: 900;
    padding: 0 50px;
    color: #ff4e6a;
    position: relative;

    &:before {
      position: absolute;
      left: 0;
      bottom: -1px;
      content: '';
      border-bottom: 1px solid #d9d9d9;
      box-shadow: 0 0 3px #d4d4d4;
      width: 100%;
    }
  }

  .article-recommend-total-box {
    width: 100%;
    border-radius: 30px;
    box-shadow: 0 0 13px #282727;
    margin-top: 50px;

    .vs-card__title {
      color: rgba(255, 78, 106, .8);
    }

    .vs-card {
      border-radius: 20px;
      background-color: #fdf6e3;
    }

    .vs-card__interactions {
      width: 100%;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      background-color: rgba(255, 255, 255, .6);
      display: block;

      & > div {
        display: flex;
      }

      .vs-button--shadow {
        &:nth-child(7n+1) {
          background-color: rgba(255, 78, 106, 1);
        }

        &:nth-child(7n+2) {
          background-color: #ffaa73;
        }

        &:nth-child(7n+3) {
          background-color: #fed466;
        }

        &:nth-child(7n+4) {
          background-color: #3cdc82;
        }

        &:nth-child(7n+5) {
          background-color: #64dcf0;
        }

        &:nth-child(7n+6) {
          background-color: #64b9ff;
        }

        &:nth-child(7n+7) {
          background-color: #b4b4ff;
        }
      }
    }
  }

  .article-copyright {
    word-wrap: break-word;
    margin-bottom: 20px;
    border-radius: 6px;
    padding: 20px;
    color: #666;
    background-color: #f8f8f8;
    border-left: 2px solid #eee;
    line-height: 1.5em;
    position: relative;

    i {
      position: absolute;
      top: -10px;
      left: 13px;
      font-size: 26px;
      background: #f8f8f8;
      color: #666;
      border-radius: 100%;
      text-align: center;
      line-height: 30px;
      padding: 2px;
      height: 30px;
      width: 30px;
      border: 1px solid #eee;
    }

    a {
      color: #ff4e6a;
    }
  }

  .web-size-advice-article{
    background-color: rgba(100, 100, 100, .7);
    min-height: 300px;
    width: 100%;
    border-radius: 30px;
    margin-bottom: 30px;

    &:hover {
      transition: all 1s;
      box-shadow: 0 10px 3px #282727, 0 8px 3px #282727, 0 6px 3px #282727, 0 4px 3px #282727, 0 2px 3px #282727;
    }
    span {
      margin: 20px;
      font-weight: 600;
      font-size: 30px;
      color: #fff;
    }
    .web-size-advice-article-content {
      background-color: #fff;
      border-radius: 6px;
      min-height: 200px;
      margin: 20px;
      text-align: center;
    }
  }
  .article-catalog-tag-cloud {
    background-color: rgba(100, 100, 100, .7);
    min-height: 300px;
    width: 100%;
    border-radius: 30px;
    margin-bottom: 30px;

    &:hover {
      transition: all 1s;
      box-shadow: 0 10px 3px #282727, 0 8px 3px #282727, 0 6px 3px #282727, 0 4px 3px #282727, 0 2px 3px #282727;
    }

    span {
      margin: 20px;
      font-weight: 600;
      font-size: 30px;
      color: #fff;
    }

  }

  .article-catalog-second {
    width: 100%;
    border-radius: 30px;
    margin-bottom: 30px;
    background-color: #282727;

    &:hover {
      transition: all 1s;
      box-shadow: 0 10px 3px #8c8c8c, 0 8px 3px #8c8c8c, 0 6px 3px #8c8c8c, 0 4px 3px #8c8c8c, 0 2px 3px #8c8c8c;
    }
  }


  .con-image {
    border-radius: inherit;

    img {
      display: block;
      position: relative;
      border-radius: inherit;
      max-width: 100%;
    }
  }

  .article-label {
    position: relative;
    margin: 10px 20px;
    height: 30px;
    line-height: 30px;

    a {
      border-radius: 10px;
      padding: 10px 5px;
      text-align: center;
      margin-left: 10px;
      color: #fff;
      font-size: 14px;
      text-decoration: none;
      transition: all 1s;
    }

    a:link {
      color: white;
    }

    a:visited {
      color: white;
    }

    a:before {
      content: '#';
    }

    a:hover {
      box-shadow: 4px 4px 5px #282727;
    }

    a:nth-child(7n+1) {
      background-color: rgba(255, 78, 106, 0.15);
      color: rgba(255, 78, 106, 0.8);
    }
  ;

    a:nth-child(7n+2) {
      background-color: rgba(255, 170, 115, 0.15);
      color: #ffaa73;
    }
  ;

    a:nth-child(7n+3) {
      background-color: rgba(254, 212, 102, 0.15);
      color: #fed466;
    }
  ;

    a:nth-child(7n+4) {
      background-color: rgba(60, 220, 130, 0.15);
      color: #3cdc82;
    }
  ;

    a:nth-child(7n+5) {
      background-color: rgba(100, 220, 240, 0.15);
      color: #64dcf0;
    }
  ;

    a:nth-child(7n+6) {
      background-color: rgba(100, 185, 255, 0.15);
      color: #64b9ff;
    }
  ;

    a:nth-child(7n+7) {
      background-color: rgba(180, 180, 255, 0.15);
      color: #b4b4ff;
    }
  }

  .article-create-time {
    background-color: #ff4e6a;
    border-radius: 10px;
    padding: 0 5px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-left: 10px;
    color: #fff;
    font-size: 14px;
  }

  .article-viewcount {

    background-color: #ffaa73;
    border-radius: 10px;
    padding: 0 5px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-left: 10px;
    color: #fff;
    font-size: 14px;;
  }

  .article-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 20px;
  }

  .article-title {
    left: 20px;
    width: calc(100% - 40px);
    padding-top: 30px;
    position: relative;
    color: rgba(255, 78, 106, 0.85);
    font-size: 20px;
  }

  .article-title .article-title-h:before {
    content: "";
    width: calc(100% - 20px);
    border-bottom: 1px solid #d9d9d9;
    box-shadow: 0 0 3px #d4d4d4;
    position: absolute;
    bottom: -1px;

  }

  .article-title .article-title-h:after {
    transition: all 0.35s;
    content: "";
    position: absolute;
    background: rgba(255, 78, 106, 0.85);
    width: 1em;
    height: 5px;
    bottom: -3px;
    left: 0;
    border-radius: 6px;
    box-shadow: 0 2px 12px rgba(255, 78, 106, 0.85);
  }

  .article-title .article-title-h:hover:after {
    width: 2em;
  }


  .dress-bottom-article-details-box {
    width: 100%;
    height: 260px;
    position: relative;

    .dress-bottom-image-article-details {
      background: url(https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@master/img/webp/footer.webp) no-repeat 50%;
      height: 368px;
      z-index: 1;
      width: 100%;
      position: absolute;
      pointer-events: none;
      left: 0;
      bottom: -140px;
    }
  }


  .article-details-footer {
    top: 64px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100px;
    color: white;
    background-color: #282727;
    text-align: center;
  }

  .article-content-box {

    width: 75%;
    min-height: 700px;

    .article-content-margin-box {
      border-radius: 30px;
      box-shadow: 0 0 12px #282727;

      padding: 2%;
      width: 96%;
      height: 96%;
    }
  }

  .article-content-catalog-box {
    right: 10%;
    transition: all 1s;
    position: static;
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: 30px;
    min-height: 300px;
    width: 284px;

  }

  .article-inner {
    padding-top: 60px;
    width: 80%;
    position: relative;
    margin: 0 auto;
    min-height: 700px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .article-total-box {
    width: 100%;
  }

  .article-main-inner-box {
    width: 100%;
    position: relative;
    min-height: 700px;
  }

  .article-main-box {
    width: 100%;
    position: sticky;
    min-height: 700px;
    top: 0;
    background-color: white;
  }

  .article-exclusive-cover-box {
    z-index: -1;
    top: 0;
    position: sticky;
    width: 100%;
    height: 800px;
  }

  .article-exclusive-cover-image {
    z-index: -1;
    height: 800px;
    width: 100%;
  }

  :root {
    --grey-0: #fff;
    --grey-1: #fdfdfd;
    --grey-2: #f7f7f7;
    --grey-3: #eff2f3;
    --grey-4: #ccc;
    --grey-5: #999;
    --grey-6: #666;
    --grey-7: #333;
    --grey-8: #222;
    --grey-9: #000;
    --grey-1-a0: rgba(253, 253, 253, 0);
    --grey-1-a7: rgba(253, 253, 253, 0.7);
    --grey-1-a5: rgba(253, 253, 253, 0.5);
    --grey-1-a3: rgba(253, 253, 253, 0.3);
    --grey-9-a1: rgba(0, 0, 0, 0.1);
    --grey-9-a5: rgba(0, 0, 0, 0.5);
    --grey-2-a0: rgba(247, 247, 247, 0);
  }

  .waves {
    width: 100%;
    height: 15vh;
    margin-bottom: -.6875rem;
    min-height: 3.125rem;
    max-height: 9.375rem;
    position: absolute;
    left: 0;
    top: -14vh;
    transform-origin: 0 0;
  }

  @media (max-width: 767px) {
    .waves {
      height: 10vh;
      left: 0;
      top: -10vh;
    }

    .article-exclusive-cover-box {
      height: 300px;
    }

    .article-exclusive-cover-image {
      height: 300px;
    }
  }

  .parallax > use {
    -webkit-animation: waveArticle 25s cubic-bezier(.55, .5, .45, .5) infinite;
    animation: waveArticle 25s cubic-bezier(.55, .5, .45, .5) infinite
  }

  .parallax > use:nth-child(1) {
    -webkit-animation-delay: -2s;
    animation-delay: -2s;
    -webkit-animation-duration: 7s;
    animation-duration: 7s;
    fill: var(--grey-1-a7)
  }

  .parallax > use:nth-child(2) {
    -webkit-animation-delay: -3s;
    animation-delay: -3s;
    -webkit-animation-duration: 10s;
    animation-duration: 10s;
    fill: var(--grey-1-a5)
  }

  .parallax > use:nth-child(3) {
    -webkit-animation-delay: -4s;
    animation-delay: -4s;
    -webkit-animation-duration: 13s;
    animation-duration: 13s;
    fill: var(--grey-1-a3)
  }

  .parallax > use:nth-child(4) {
    -webkit-animation-delay: -5s;
    animation-delay: -5s;
    -webkit-animation-duration: 20s;
    animation-duration: 20s;
    fill: var(--grey-1)
  }

  @-webkit-keyframes waveArticle {
    0% {
      transform: translate3d(-90px, 0, 0)
    }

    100% {
      transform: translate3d(85px, 0, 0)
    }
  }

  @keyframes waveArticle {
    0% {
      transform: translate3d(-90px, 0, 0)
    }

    100% {
      transform: translate3d(85px, 0, 0)
    }
  }

  @media screen and (max-width: 1470px ) {
    .article-inner {
      width: 100%;
    }

    .article-content-catalog-box {
      right: 0;
    }
  }

  @media screen and (max-width: 1175px) {
    .article-details-footer {
      top: 0;
    }
    .article-content-catalog-box {
      display: none;
    }

    .article-content-box {
      width: 100%;
    }

    .article-page-golbal-box {
      overflow-x: hidden;
    }
    .dress-bottom-article-details-box {
      width: 100%;
      height: 260px;
      position: relative;

      .dress-bottom-image-article-details {
        bottom: -76px;
      }
    }
  }

  @media screen and (max-width: 660px) {
    .article-details-footer {
      top: 0;
    }
    .article-inner {
      width: 100%;
    }
    .dress-bottom-article-details-box {
      width: 100%;
      height: 260px;
      position: relative;

      .dress-bottom-image-article-details {
        bottom: -76px;
      }
    }
  }


  .editormd-html-preview pre {
    background: #272822;
  }

  /*代码不换行*/
  .markdown-body pre code {
    white-space: pre;
    display: inline-block;
    margin-right: 20px;
    background: #272822;
    padding: 0;
  }

  li.L1, li.L3, li.L5, li.L7, li.L9 {
    background: #272822;
  }

  .pln {
    color: #b6b6b6
  }

  .str {
    color: #e6db74
  }

  .kwd {
    color: #f90
  }

  .com {
    color: #86ac1f
  }

  .typ {
    color: #d197d9
  }

  .lit {
    color: #bed6ff
  }

  .pun {
    color: #f7f9f299;
  }

  .clo, .opn {
    color: #fff
  }

  .tag {
    color: #f90
  }

  .atn {
    color: #6c95f5
  }

  .atv {
    color: #080
  }

  .dec, .var {
    color: #008ba7
  }

  .fun {
    color: red
  }

  /*行内代码样式*/
  code {
    font-size: inherit;
    line-height: inherit;
    overflow-wrap: break-word;
    padding: 4px 1px 0 !important;
    border-radius: 4px !important;
    margin: 0 0 !important;
    color: rgb(233, 105, 0);
    background: rgb(248, 248, 248) none repeat scroll 0% 0%;
    border: 0 !important;
  }

  .qz-center .qz-session-content .qz-art .comment-top, .textareas {
    margin: 60px auto 10px;
    padding: 50px 30px;
    width: 90%;
    border-radius: 9px;
    border: 1px solid #098e91;
    background: white;
    position: relative;
    font-size: 15px;
  }

  .textareas {
    margin-left: 27px;
    overflow-y: hidden;
  }

  .commentBtn {
    position: absolute;
    right: 0;
    bottom: -36%;
  }

  .commentBt {
    position: absolute;
    right: 5%;
  }

  .commentBt > button {
    border-radius: 10px;
  }

  .commentBtn > button {
    border-radius: 10px;
  }

  .goToLogin > a {
    color: #0bc5c8;
  }

  .goToLogin > a:hover {
    cursor: pointer;
    color: #098e91;
  }

  /*.qz-markerdown img{*/
  /*width: 100%;*/
  /*}*/
  .qz-markerdown p {
    font-size: 15px;
    color: #4d4d4d;
    font-weight: 400;
  }

  .qz-markerdown li {
    list-style: decimal;
  }

  .editormd-html-preview blockquote, .editormd-preview-container blockquote {
    color: #666;
    border-left: 4px solid cyan;
    padding-left: 20px;
    margin-left: 0;
    font-size: 14px;
    font-style: italic;
  }

  .markdown-body blockquote > :first-child {
    margin-top: 0;
    color: rgba(255, 78, 106, 0.8);
    background-color: transparent;
  }

  .editormd-html-preview, .editormd-preview-container {
    width: calc(100% - 40px)
  }

  #doc-content p img ,#doc-content img {
    cursor: zoom-in;
    max-width: 700px;
  }

  @media screen and (max-width: 660px) {
    .article-content-box .article-content-margin-box {
      margin: 0;
      width: 96%;
    }

    #doc-content p img ,#doc-content img {
      cursor: zoom-in;
      max-width: 440px;
    }
  }


</style>
