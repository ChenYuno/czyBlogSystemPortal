<template>
  <div>
    <div class="about-head-bg">
      <img src="../../assets/images/aboutBg.jpg">
    </div>
    <div class="about-main-box">
      <div id="waves">
        <svg class="about-page-waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
          </defs>
          <g class="about-parallax">
            <use xlink:href="#gentle-wave" x="48" y="0"></use>
            <use xlink:href="#gentle-wave" x="48" y="3"></use>
            <use xlink:href="#gentle-wave" x="48" y="5"></use>
            <use xlink:href="#gentle-wave" x="48" y="7"></use>
          </g>
        </svg>
      </div>
      <div class="about-main">
        <div class="about-introduce">
          <div class="about-introduce-content">
            <div class="about-item">
              <h1 id="站长"># &nbsp;站长</h1>
              <img src="../../assets/images/websizeavatar.jpg" style="width: 100px;height: 100px; border-radius: 50%"/>
              <div>
                <h2>站长昵称：</h2>czy
                <br>
                <h2>站长喜欢这样叫自己：</h2>陈云哦
              </div>
              <p>
                &emsp;&emsp;站长创建这个博客的理由有俩个，第一个就是和很多人一样，都想在这个世界上留下一些属于自己的东西，而现在这个互联网的时代，
                博客可以说是大家都能实现这个愿望的一种好的方式.第二个就是希望有一个可以做笔记，唠嗑，记录生活的地方，博客的实现，也是这个
                愿望的实现的一种方式。
              </p>
            </div>

            <div class="about-item">
              <h1 id="本站信息"># &nbsp;本站信息</h1>
              <p>
                &emsp;&emsp;本站从2020年的10月多开始从后端开始搭建，站长学习的方向比较偏向于后端，不料自从后端的接口弄的差不多之后，开始了艰难的前端搭建，
                发现虽然前端有很多的框架，但是自己弄过来改其实是有点难度的，而且可能会不合自己的心意，因为可能本站站站比较挑剔吧哈哈。
                在管理的前端搭建的时候，站长终究的接触的东西太少，没有从一开始就着手做响应式的页面，从那时候开始，也是疯狂的改着elementui的样式。。。
                然后经理来一段好不容易的时光，感觉这个终究是体力活多。然后站长吸取教训，在门户这块，也是向大家展示的地方，从一开始站长就先琢磨着怎么开始等等等的准备，
                可终究不能拖太久。在搭建的过程中，有两段时间比较使得站长的心动摇，第一个就是不断的参考别人的博客的页面，发现自己写出来的有好多地方不够人家的漂亮，
                站长第一次搭建属于自己的博客，肯定是想着能有多好看就多好看。第二就是在搭建这个门户的过程中，站长有一天发现了一些开源、而且简单搭建，还***巨好看的项目，
                站长研究了一下便在虚拟机部署了一下，纠结了几天，最终还是决定把现在这个博客写完，然后上线一个自己从无到有亲手建起来来的博客，以后有时间就上上自己的博客写些自己想分享的知识、
                写些站长生活中遇到的事情，这样也挺美妙，算是站长为自己而在战斗着，ヾ(◍°∇°◍)ﾉﾞ！！！
              </p>
            </div>

            <div class="about-item">
              <h1 id="愿景"># &nbsp;愿景</h1>
              <p>
                &emsp;&emsp;希望天下的人都有自己的梦想，都会努力的最求，都会努力的学习，都会努力的工作。。。愿这个所有人的努力都不会白费，愿这个世界越来越好!
              </p>
            </div>
            <div class="about-item">
              <h1 id="留言"># &nbsp;留言</h1>
              <quill-editor
                ref="myQuillEditor"
                v-model="loginUserLeaveMessage"
                :options="editorOption"
              />
              <div style="padding: 20px">
                <vs-button style="height: 46px;width: 120px;border-radius: 6px;font-size: 18px"
                           @click="commitLeaveMessage"
                >
                  留言
                </vs-button>
              </div>
              <div class="about-leave-message-box" v-if="leaveMessage.records.length > 0">
                <div class="about-leave-message-items-list-box">
                  <ul>
                    <li v-for="(item,index) in leaveMessage.records" :key="index">
                      <div class="about-leave-message-content" v-html="item.content">
                      </div>
                      <div class="about-leave-message-replay-action">
                        <div class="about-leave-message-replay-action-left">
                          <a @click="showChildCommentAction(item.id)" class="childCredita mdui-btn mdui-btn-raised"><i
                            class="fa fa-commenting-o" aria-hidden="true"></i>&nbsp;评论</a>
                          <span><i class="fa fa-calendar" aria-hidden="true"></i>&nbsp;{{item.createTime}}</span>
                        </div>
                        <div class="about-leave-message-replay-action-userinfo">
                          <img :src="item.userAvatar"><span><a :href="`/userInfo/${item.userId}`"> {{item.userName}}</a></span>
                        </div>
                      </div>
                      <ul :id="item.id" v-if="item.childrenCommends.length>0">
                        <!-- js动态遍历插入子评论的地方 -->
                      </ul>
                      <div style="display: none" :class="`about-leave-message-commentChild leaveMsg_${item.id}`">
                        <div class="about-leave-message-commentChild-defaultAvatar">
                          <img src="@/assets/images/kawayi.gif">
                        </div>
                        <div class="about-leave-message-commentChild-textarea">
                          <textarea :class="`topCommentComment_${item.id}`"></textarea>
                        </div>
                        <div class="about-leave-message-commentChild-commitBtn">
                          <vs-button
                            @click="childCommentCommit(item.id)"
                          >
                            {{childCommentBtn}}
                          </vs-button>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div class="load-more-leaveMsg" @click="loadMoreComments">{{loadMoreCommentsDisplay}}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="about-introduce-catalog">
            <vs-sidebar
              relative
              v-model="active"
              open
            >
              <vs-sidebar-item id="站长(catalog)">
                <template #icon>
                  <i class='bx bxl-github'></i>
                </template>
                站长
              </vs-sidebar-item>
              <vs-sidebar-item id="本站信息(catalog)">
                <template #icon>
                  <i class='bx bxl-codepen'></i>
                </template>
                本站信息
              </vs-sidebar-item>
              <vs-sidebar-item id="愿景(catalog)">
                <template #icon>
                  <i class='bx bxl-discord'></i>
                </template>
                愿景
              </vs-sidebar-item>
              <vs-sidebar-item id="留言(catalog)">
                <template #icon>
                  <i class='bx bxl-javascript'></i>
                </template>
                留言
              </vs-sidebar-item>


            </vs-sidebar>
          </div>
          <div style="clear: both"></div>
        </div>
      </div>
    </div>

    <!-- 底部的裙子和时间还有备案信息 -->
    <div class="dress-bottom-about-links-box">
      <div class="list-bottom-image-about-links"></div>
    </div>
    <div class="about-links-footer">

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
</template>

<script>
  import articleApi from "../../api/articleApi";
  import userApi from "../../api/userApi";

  export default {
    name: "index",
    head() {
      return {
        title: '陈展云的博客-关于',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: '陈展云的博客-关于'
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: '陈展云,博客,java,spring,spring-boot,开发,毕业设计,博客系统,程序员,docker,linux,电脑硬件,电脑软件,kubernetes,vue,nuxtjs,vuejs,js,javascript,html,css,less,rabbitmq,源码'
          }
        ]
      }
      },
    async asyncData() {
      let leaveMsg = await articleApi.getArticleCommends('129', 1, 10);
      return {
        leaveMessage: leaveMsg.data.data.data
      }
    },
    data() {
      return {
        active: '站长(catalog)',
        catalogLastActiveDiv: '',
        leaveMessage: {},
        leaveMessageArticleId: '129',
        loadMoreCommentsDisplay: '加载更多',
        //富文本编辑器需要的数据
        loginUserLeaveMessage: '',
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
        childCommentBtn: '回复该留言',
        lastLeaveMsgCommentActionDiv: '',
        //递归遍历时收录遍历出的回复留言的id
        replyBtnToAddClickList: [],
        //递归出子评论的dom元素和提交所需的父评论id
        lastShowCommentActionDiv: '',
        commitCommendId: '',
        ccdefaultAvatar: require('../../assets/images/websizeavatar.jpg'),
        commitCommentData: {
          articleId: '',
          content: '',
          parentContentId: ''
        },
        hTitleHeight: [],
        catalogDatas: [],
        selectSignOrangedOpacityControl: []
      }
    },
    methods: {
      commitLeaveMessage() {
        //富文本提交留言
        //todo:提交富文本提交留言
        console.log(this.loginUserLeaveMessage);
        this.commeonMethodToCommitComment(this.leaveMessageArticleId, this.loginUserLeaveMessage)
        this.loginUserLeaveMessage = '';
      },
      loadMoreComments() {
        //加载更多留言

        console.log(this.leaveMessage.pageSize)
        console.log(this.leaveMessage.totalCount)
        if (this.leaveMessage.pageSize >= this.leaveMessage.totalCount) {
          if (this.loadMoreCommentsDisplay === '加载更多') {
            this.loadMoreCommentsDisplay = '没有更多了';
          }
          return;
        }

        this.leaveMessage.pageSize += 5;
        console.log(this.leaveMessage.pageSize)

        articleApi.getArticleCommends(this.leaveMessageArticleId, this.leaveMessage.currentPage, this.leaveMessage.pageSize, 'more')
          .then(res => {
            if (res.data.code === 20000) {
              this.leaveMessage = res.data.data.data;
              console.log(this.leaveMessage.pageSize)
              if (this.leaveMessage.pageSize !== this.leaveMessage.totalCount) {
                this.loadMoreCommentsDisplay = '没有更多了';
              }

              window.removeEventListener('click', this.showChildReplyCommentAction);
              window.removeEventListener('click', this.childCommentReplyCommit);
              setTimeout(() => {
                this.triggleShowAllLeaveMsgWhenMounted();
                window.addEventListener('click', this.showChildReplyCommentAction);
                window.addEventListener('click', this.childCommentReplyCommit);
              }, 100);
            }
          });
      },
      //显示回复顶级评论的回复框
      showChildCommentAction(leaveMessageId) {
        if (this.lastLeaveMsgCommentActionDiv !== '') {
          this.lastLeaveMsgCommentActionDiv.children[1].firstChild.value = '';
          this.lastLeaveMsgCommentActionDiv.style.display = 'none';
        }
        //点击展示回复框
        let leaveMsgCommentActionDiv = document.querySelector('.leaveMsg_' + leaveMessageId);
        if (leaveMsgCommentActionDiv) {
          leaveMsgCommentActionDiv.style.display = 'flex';
          this.lastLeaveMsgCommentActionDiv = leaveMsgCommentActionDiv;
        }

      },
      //显示回复递归出来评论的回复框
      showChildReplyCommentAction(e) {
        if (!e.target.id || this.replyBtnToAddClickList.indexOf(e.target.id) === -1) {
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
      childCommentReplyCommit(e) {
        let childCommentReplyCommitBtn = document.querySelector(`.childCommentReplyCommit_${this.commitCommendId}`);
        if (!childCommentReplyCommitBtn || e.target !== childCommentReplyCommitBtn) {
          return;
        }
        if (this.commitCommendId === '') {
          return;
        }
        let dataReplyToCommentDom = document.querySelector(`.childCommentReplyCommitTextarea_${this.commitCommendId}`);
        if (dataReplyToCommentDom) {
          //下面是用户输入的回复的数据
          let dataReplyToComment = dataReplyToCommentDom.value;
          console.log(dataReplyToComment);
          //注意，这是是留言模块，得写死，之后需要先初始化一条文章数据当做留言
          this.commeonMethodToCommitComment(this.leaveMessageArticleId, dataReplyToComment, this.commitCommendId);
          dataReplyToComment = '';
        }
      },
      childCommentCommit(leaveMessageId) {
        //回复第一级的回复的回复框提交
        let childCommentDiv = document.querySelector('.topCommentComment_' + leaveMessageId);
        if (childCommentDiv) {
          let childCommentContent = childCommentDiv.value;
          console.log(childCommentContent);
          //提交顶级留言
          this.commeonMethodToCommitComment(this.leaveMessageArticleId, childCommentContent, leaveMessageId);
          childCommentDiv.value = '';
        }
      },
      triggleShowAllLeaveMsgWhenMounted() {
        if (this.leaveMessage.records.length > 0) {
          this.leaveMessage.records.forEach(item => {
            console.log(item)
            if (item.childrenCommends.length > 0) {
              let appendHtmlCommends = document.getElementById(item.id);
              let appendTemplate = '';
              appendTemplate = this.dfsAppend(appendTemplate, item.childrenCommends, item.userName, item.id);
              appendHtmlCommends.innerHTML = appendTemplate;
            }
          });
        }
      },
      dfsAppend(appendTemplate, childrenCommends, parentUserName, parentCommentId) {
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
            '                            <div class="apply-childcommend-dateAndAction" id="' + parentCommentId + '">\n' +
            '                              <i class="fa fa-calendar-check-o" aria-hidden="true"></i>' + c.createTime +
            '                              &nbsp;&nbsp;\n' +
            '                              <a class="mdui-btn" id="' + c.id + '">回复</a>\n' +
            '                            </div>\n' +
            '                            <div class="articleCommends-commentChild r_c_' + c.id + '" style="display: none">\n' +
            '                              <div class="articleCommends-commentChild-defaultAvatar">\n' +
            '                                <img src="' + this.ccdefaultAvatar + '">\n' +
            '                              </div>\n' +
            '                              <div class="articleCommends-commentChild-textarea">\n' +
            '                                <textarea class="childCommentReplyCommitTextarea_' + c.id + '"></textarea>\n' +
            '                              </div>\n' +
            '                              <div class="articleCommends-commentChild-commitBtn">\n' +
            '<button class="vs-button vs-button--null vs-button--size-null vs-button--primary vs-button--default " style="--vs-color:;"><div class="vs-button__content childCommentReplyCommit_' + c.id + '">\n' +
            '                          回复\n' +
            '                        </div></button>' +
            '                              </div>\n' +
            '                            </div>\n' +
            '<ul>';
          if (c.childrenCommends.length > 0) {
            let currChildCommend = this.dfsAppend('', c.childrenCommends, c.userName);
            appendTemplate += currChildCommend;
          }
          appendTemplate += '                      </ul></li>';

          this.replyBtnToAddClickList.push(c.id);


        });
        return appendTemplate;
      },
      displayCurrCircle(e) {
        console.log('点击了about的catalog');
        let catalogBtn = document.querySelector('.vs-sidebar__item.active.hasIcon');
        if (e.target === catalogBtn || e.target.parentNode === catalogBtn) {
          console.log([catalogBtn.firstChild])
          if (catalogBtn.lastChild.className !== 'selectSign') {
            let selectSign = document.createElement('div');
            selectSign.className = 'selectSign';
            selectSign.style = 'position: absolute;\n' +
              '    left: 24px;\n' +
              '    top: 0;\n' +
              '    background: #fff;\n' +
              '    width: 16px;\n' +
              '    height: 16px;\n' +
              '    opacity: 1;\n' +
              '    border: 3px solid orangered;\n' +
              '    border-radius: 50%;\n' +
              '    -webkit-transition: all .25s ease;\n' +
              '    transition: all .25s ease;\n' +
              '    -webkit-transform: translate(-100%,50%);\n' +
              '    transform: translate(-100%,50%);\n' +
              '    z-index: 60;';
            catalogBtn.appendChild(selectSign);
            if (this.catalogLastActiveDiv !== '') {
              this.catalogLastActiveDiv.style['opacity'] = '0';
            }
            this.catalogLastActiveDiv = selectSign;
          } else {
            this.catalogLastActiveDiv.style['opacity'] = '0';
            catalogBtn.lastChild.style['opacity'] = '1';
            this.catalogLastActiveDiv = catalogBtn.lastChild;
          }

          let scrollTo = this.active.substring(0, this.active.indexOf('('));
          this.$router.push({
            path: '/about#' + scrollTo
          })

        }
      },
      //通用的评论方法，当提交评论之后就走这里向后台提交数据，成功之后重新渲染所有评论
      commeonMethodToCommitComment(articleId, content, parentContentId) {

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
                    this.getArticleCommendsCommon(this.leaveMessage.currentPage, this.leaveMessage.pageSize);

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
      getArticleCommendsCommon(page, size) {

        articleApi.getArticleCommends(this.leaveMessageArticleId, page, size)
          .then(res => {
            if (res.data.code === 20000) {
              this.leaveMessage = res.data.data.data;
              window.removeEventListener('click', this.showChildReplyCommentAction);
              window.removeEventListener('click', this.childCommentReplyCommit);
              setTimeout(() => {
                this.triggleShowAllLeaveMsgWhenMounted();
                window.addEventListener('click', this.showChildReplyCommentAction);
                window.addEventListener('click', this.childCommentReplyCommit);
              }, 100);
            }
          });

      },
      openNotification(text) {
        const noti = this.$vs.notification({
          position: 'top-center',
          width: '100%',
          color: '#7d33ff',
          title: 'czyblog温馨提示',
          text: text
        })
      },
      scrollChangeActiveCatalog() {
        let currScrollPlace = window.scrollY;
        for (let i = 0; i < this.hTitleHeight.length; i++) {
          if (currScrollPlace > this.hTitleHeight[i] && currScrollPlace <= this.hTitleHeight[i + 1]) {
            let currActive = this.catalogDatas[i];
            this.active = currActive;
            if (this.catalogLastActiveDiv !== '') {
              this.catalogLastActiveDiv.style.opacity = '0';
            }
            this.selectSignOrangedOpacityControl[i].style.opacity = '1';
            this.catalogLastActiveDiv = this.selectSignOrangedOpacityControl[i];
            return;
          }
        }
      }
    }
    ,
    mounted() {
      this.$store.commit('setCurrentActiveTab', 'about');
      let aboutCatalog = document.querySelector('.about-introduce-catalog');
      if (aboutCatalog) {
        aboutCatalog.addEventListener('click', this.displayCurrCircle)
      }

      let selectSign = document.createElement('div');
      selectSign.className = 'selectSign';
      selectSign.style = 'position: absolute;\n' +
        '    left: 24px;\n' +
        '    top: 0;\n' +
        '    background: #fff;\n' +
        '    width: 16px;\n' +
        '    height: 16px;\n' +
        '    opacity: 1;\n' +
        '    border: 3px solid orangered;\n' +
        '    border-radius: 50%;\n' +
        '    -webkit-transition: all .25s ease;\n' +
        '    transition: all .25s ease;\n' +
        '    -webkit-transform: translate(-100%,50%);\n' +
        '    transform: translate(-100%,50%);\n' +
        '    z-index: 60;';
      let firstCatalog = document.querySelector('.vs-sidebar__item.hasIcon');
      if (firstCatalog) {
        firstCatalog.appendChild(selectSign);
        this.catalogLastActiveDiv = firstCatalog.lastChild;
      }


      //递归遍历所有回复的留言
      this.triggleShowAllLeaveMsgWhenMounted();

      window.addEventListener('click', this.showChildReplyCommentAction);
      window.addEventListener('click', this.childCommentReplyCommit);

      let aboutItems = document.querySelectorAll('.about-item');
      console.log(aboutItems);
      if (aboutItems) {
        aboutItems.forEach(item => {
          let aboutMainBox = document.querySelector('.about-main-box');
          let aboutMainBoxOffsetTop = aboutMainBox.offsetTop;
          let aboutMain = document.querySelector('.about-main');
          let aboutMainOffsetTop = aboutMain.offsetTop;
          let overTop = aboutMainBoxOffsetTop + aboutMainOffsetTop + 40;
          let H = item.querySelector('h1');
          let hTop = H.offsetTop;
          this.hTitleHeight.push(hTop + overTop);
        });
        this.hTitleHeight.unshift(0);
        console.log(this.hTitleHeight);
      }

      //查询出所有catalog的目录并添加黄色的小点点，默认第一个为激活的在上面已经添加了，这里拷贝一个节点设置为透明并添加
      let catalogElements = document.querySelectorAll('button.vs-sidebar__item.hasIcon');
      console.log(catalogElements);
      this.selectSignOrangedOpacityControl.push(selectSign);
      if (catalogElements) {

        catalogElements.forEach(i => {
          let dataText = i.innerText;
          console.log(dataText.substring(0, dataText.indexOf('\n')));
          //data数据中active的变化
          this.catalogDatas.push(dataText.substring(0, dataText.indexOf('\n')) + '(catalog)');

          let selectSignTransparent = selectSign.cloneNode(true);

          selectSignTransparent.style.opacity = '0';

          let isAddSelectSign = i.lastChild;
          console.log(isAddSelectSign)
          if (isAddSelectSign.className !== 'selectSign') {
            i.appendChild(selectSignTransparent);
            this.selectSignOrangedOpacityControl.push(selectSignTransparent);
            console.log('=======addChildhahahahahaha')
            console.log(i.lastChild)
          }
        });
      }
      //todo:滚动时间改变catalog的状态
      window.addEventListener('scroll', this.scrollChangeActiveCatalog);
    },
    beforeDestroy() {
      let aboutCatalog = document.querySelector('.about-introduce-catalog');
      if (aboutCatalog) {
        aboutCatalog.removeEventListener('click', this.displayCurrCircle)
      }

      window.removeEventListener('click', this.showChildReplyCommentAction);
      window.removeEventListener('click', this.childCommentReplyCommit);
      window.removeEventListener('scroll', this.scrollChangeActiveCatalog);


    }
  }
</script>

<style lang="less">
  .about-leave-message-replay-action-userinfo a,.about-leave-message-box ul a{
    text-decoration: none;
  }
  .about-leave-message-replay-action-userinfo a:link,
  .about-leave-message-replay-action-userinfo a:visited,
  .about-leave-message-box ul a:link,
  .about-leave-message-box ul a:visited{
    color: #f54c6e;
  }
  .about-leave-message-replay-action-userinfo a:hover,
  .about-leave-message-box ul a:hover {
    color: cyan;
  }
  .about-leave-message-replay-action-userinfo a:active,
  .about-leave-message-box ul a:active{
    color: orangered;
  }


  //=====================递归添加的css样式====================================
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

  //=============================================================

  .apply-childcommend-dateAndAction, .apply-childcommend-content {
    color: #8c8c8c;
  }

  .apply-childcommend-content {
    margin: 5px 30px;
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

  .apply-childcommend-item {
    margin: 20px;
  }

  .about-item .ql-container, .ql-editor {
    min-height: 250px;
  }

  .load-more-leaveMsg {
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

  .about-leave-message-commentChild-defaultAvatar {
    & > img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
  }

  .about-leave-message-commentChild-commitBtn {
    margin-left: 20px;

    & > button {
      height: 40px;
      width: 100px;
    }
  }

  .about-leave-message-commentChild-textarea > textarea {
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

  .about-leave-message-commentChild {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .about-leave-message-replay-action-userinfo {
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

  .about-leave-message-replay-action-left {
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

  .about-leave-message-replay-action {
    height: 50px;
    line-height: 50px;
    clear: both;
  }

  //内容的css样式
  .about-leave-message-content {
    font-size: 20px;
    padding: 20px;
  }

  .about-leave-message-items-list-box {
    padding: 20px;

    ul, li {
      list-style: none;
    }
  }

  .about-leave-message-items-list-box > ul > li {
    background-color: lightgoldenrodyellow;
    border-radius: 8px;
    margin-top: 30px;
  }

  .about-leave-message-box {
    background-color: lightpink;
    width: 100%;
    margin-top: 40px;
    border-radius: 30px;
  }

  .about-item img {
    border: 2px dashed #8c8c8c;
    border-radius: 50%;
  }

  .about-item {
    padding: 20px;
  }

  .about-introduce-catalog .vs-sidebar-content {
    max-width: none;
    box-shadow: none;
  }

  .about-introduce-catalog .active {
    color: orangered;
  }

  .about-introduce-catalog .vs-sidebar__item {
    position: relative;

    &:after {
      display: none;
    }
  }

  .about-introduce-catalog .vs-sidebar__item__icon {
    position: relative;
  }

  .about-introduce-catalog .vs-sidebar__item__icon:after {
    content: "";
    position: absolute;
    left: 16px;
    top: 0;
    background: #fff;
    width: 16px;
    height: 16px;
    opacity: 1;
    border: 3px solid orangered;
    border-radius: 50%;
    -webkit-transition: all .25s ease;
    transition: all .25s ease;
    -webkit-transform: translate(-100%, 50%);
    transform: translate(-100%, 50%);
    z-index: 60;
    display: none;
  }

  .about-introduce-catalog .vs-sidebar__item__icon:before {
    content: "";
    position: fixed;
    left: 12px;
    top: 0;
    background: #8c8c8c;
    width: 2px;
    height: 100%;
    opacity: 1;
    z-index: 50;
  }

  .about-introduce-catalog .vs-sidebar-content {
    width: 100%;
    border-radius: 0;
  }

  .about-introduce-content {
    width: 70%;
    float: left;
  }

  .about-introduce-content h1 {
    position: relative;
  }

  .about-introduce-content h1:before {
    content: "";
    background-color: #f54c6e;
    border-radius: 12px;
    width: 1em;
    height: 6px;
    position: absolute;
    left: 0;
    bottom: -2px;
    z-index: 1;
  }

  .about-introduce-content h1:after {
    content: "";
    background-color: #8c8c8c;
    border-radius: 12px;
    width: 100%;
    height: 1px;
    position: absolute;
    left: 0;
    bottom: -1px;
    transform: translateY(-1px);
  }

  .about-introduce-content h1:hover {
    &:before {
      width: 2em;
      transition: all .3s;
    }
  }

  .about-introduce-catalog {
    top: 30px;
    float: right;
    width: 30%;
    position: sticky;
    background-color: wheat;
  }

  .about-introduce {
    width: 70%;
    position: relative;
    margin: 0 auto;
    border-radius: 30px;
    background-color: #ffffff;

    padding-top: 40px;
    padding-bottom: 40px;
  }

  .list-bottom-image-about-links {
    background: url(https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@master/img/webp/footer.webp) no-repeat 50%;
    height: 368px;
    z-index: 1;
    width: 100%;
    position: absolute;
    pointer-events: none;
    left: 0;
    bottom: -76px;
  }

  .dress-bottom-about-links-box {
    width: 100%;
    height: 200px;
    position: relative;
    background-color: lightskyblue;
  }

  .about-links-footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100px;
    color: white;
    background-color: #282727;
    text-align: center;
  }

  .about-main {
    min-height: 700px;
    width: 100%;
    background-color: lightskyblue;
  }

  .about-main-box {
    position: sticky;

    #waves {
      background-color: #87cefa;
    }
  }

  .about-head-bg {
    position: sticky;
    top: 0;
    z-index: -1;

    img {
      width: 100%;
      height: 700px;
    }
  }

  //about页面的粉色波浪
  .about-page-waves {
    width: 100%;
    height: 15vh;
    margin-bottom: -.6875rem;
    min-height: 3.125rem;
    max-height: 9.375rem;
    position: relative;
    left: 0;
    top: -14vh;
  }

  @media (max-width: 767px) {
    .about-page-waves {
      height: 10vh;
      left: 0;
      top: -10vh;
    }

  }


  .about-parallax > use:nth-child(1) {
    -webkit-animation-delay: -2s;
    animation-delay: -2s;
    -webkit-animation-duration: 7s;
    animation-duration: 7s;
    fill: rgba(135, 206, 250, .7);
  }

  .about-parallax > use:nth-child(2) {
    -webkit-animation-delay: -3s;
    animation-delay: -3s;
    -webkit-animation-duration: 10s;
    animation-duration: 10s;
    fill: rgba(135, 206, 250, .5);
  }

  .about-parallax > use:nth-child(3) {
    -webkit-animation-delay: -4s;
    animation-delay: -4s;
    -webkit-animation-duration: 13s;
    animation-duration: 13s;
    fill: rgba(135, 206, 250, .3);
  }

  .about-parallax > use:nth-child(4) {
    -webkit-animation-delay: -5s;
    animation-delay: -5s;
    -webkit-animation-duration: 20s;
    animation-duration: 20s;
    fill: #87cefa;
  }

  @-webkit-keyframes waveAboutPage {
    0% {
      transform: translate3d(-90px, 0, 0);
    }

    100% {
      transform: translate3d(85px, 0, 0);
    }
  }


  @keyframes waveAboutPage {
    0% {
      transform: translate3d(-90px, 0, 0);
    }

    100% {
      transform: translate3d(85px, 0, 0);
    }
  }

  .about-parallax > use {
    -webkit-animation: waveAboutPage 25s cubic-bezier(.55, .5, .45, .5) infinite;
    animation: waveAboutPage 25s cubic-bezier(.55, .5, .45, .5) infinite;
  }


  @media screen and (max-width: 1080px) {

    .about-head-bg img {
      height: 600px;

    }

    .about-introduce {
      width: 100%;
    }

    .about-leave-message-items-list-box li {
      min-height: 200px;
    }

  }

  @media screen and (max-width: 1790px) {
    .articleCommends-commentChild-commitBtn > button {
      height: 60px;
      width: 40px;
      margin: 0;
    }

    .articleCommends-commentChild-textarea > textarea {
      width: 200px;
    }

    .about-leave-message-commentChild-textarea > textarea {
      width: 200px;
    }

    .about-leave-message-commentChild-commitBtn > button {
      height: 100px;
      width: 40px;
      margin: 0;
    }
  }

  @media screen and (max-width: 660px) {


    .about-leave-message-commentChild-commitBtn, .about-leave-message-commentChild-defaultAvatar {
      margin: 0;
    }

    .about-introduce {
      width: 100%;
    }

    .about-head-bg img {
      height: 18rem;

    }
  }
</style>
