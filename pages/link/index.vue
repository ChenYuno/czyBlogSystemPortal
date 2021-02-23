<template>
    <div class="friends-links-global-box">

      <div class="friends-links-bg-image-box">
        <img class="friends-links-bg-image" src="~/assets/images/friendsLinksBg.jpg">
      </div>



      <div class="friends-links-main-box">

        <div class="friends-links-inner">
          <div class="friends-links-inner-pad">
            <div class="friends-links-title">
              <span>友情链接</span>
            </div>
            <hr/>

            <div class="triangle">
              <ul>
                <li class="textRight">
                  <span>(｀･ω･´)ﾉ交换友链,请留言告诉我你的</span>
                </li>
                <li class="textLeft">
                  <span>name: CzyBlog</span>
                </li>
                <li class="textLeft">
                  <span class="nn">url: https://czyblog.com</span>
                  <span class="dd"><a href="https://czyblog.com/" target="_blank">url: czyblog.com</a></span>
                </li>
                <li class="textLeft">
                  <span class="nn">img: https://czyblog.com/avatar.jpg</span>
                  <span class="dd"><a href="https://nekodeng.gitee.io/medias/avatar.jpg" target="_blank">img: nekodeng.avatar.jpg</a></span>
                </li>
                <li class="textLeft">
                  <span>desc: 陈云世界第一可爱！！，梦想是世界和平，想要发光发热</span>
                </li>
              </ul>
            </div>

            <hr/>


            <vs-row>
              <vs-col class="friends-links-item" :key="index" v-for="(friendLink,index) in friendsLinks" vs-type="flex" vs-justify="center" vs-align="center" w="4">
                <vs-card type="3" style="margin-bottom: 50px" @click="gotoFriendBlog(friendLink.url)">
                  <template #title>
                    <h3>{{friendLink.name}}</h3>
                  </template>
                  <template #img>
                    <img :src="baseUrl+'/portal/image/'+friendLink.logo" :alt="friendLink.description">
                  </template>
                  <template #text>
                    <p>
                      {{friendLink.description}}
                    </p>
                  </template>


                </vs-card>
              </vs-col>
            </vs-row>



            <div class="about-item">
              <h1 id="留言"># &nbsp;留下你的友情链接</h1>
              <quill-editor
                ref="myQuillEditor"
                v-model="loginUserFriendslinkMessage"
                :options="editorOption"
              />
              <div style="padding: 20px">
                <vs-button style="height: 46px;width: 120px;border-radius: 6px;font-size: 18px"
                           @click="commitFriendslinkMessage"
                >
                  提交
                </vs-button>
              </div>
              <div class="about-leave-message-box" v-if="friendslinkMessage.records.length > 0">
                <div class="about-leave-message-items-list-box">
                  <ul>
                    <li v-for="(item,index) in friendslinkMessage.records" :key="index">
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



            <div class="dress-bottom-friends-links-box">
              <div class="list-bottom-image-friends-links"></div>
            </div>

          </div>

        </div>


<!--        <div class="wrap-bottom-dress-image-box-friends-links">-->
<!--          <div class="list-bottom-image-friends-links"></div>-->
<!--        </div>-->
        <div class="friends-links-footer">

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
</template>

<script>
  import friendsLinksApi from "../../api/friendsLinksApi";
  import articleApi from "../../api/articleApi";
  import userApi from "../../api/userApi";
    export default {
        name: "index",
      head() {
        return {
          title: '陈展云的博客-友情链接',
          meta: [
            {
              hid: 'description',
              name: 'description',
              content: '陈展云的博客-友情链接'
            },
            {
              hid: 'keywords',
              name: 'keywords',
              content: '陈展云,博客,java,spring,spring-boot,开发,毕业设计,博客系统,程序员,docker,linux,电脑硬件,电脑软件,kubernetes,vue,nuxtjs,vuejs,js,javascript,html,css,less,rabbitmq,源码'
            }
          ]
        }
      },
      async asyncData({params}) {
        let friendsLinks = await friendsLinksApi.getFriendsLinks();
        let friendslinkMsg = await articleApi.getArticleCommends('163', 1, 10);
        console.log(friendsLinks.data.data.data)
        return {
          friendsLinks: friendsLinks.data.data.data,
          friendslinkMessage:friendslinkMsg.data.data.data
        }
      },
      data(){
          return{
            friendsLinks: [],
            friendslinkMessage: {},
            friendslinkMessageArticleId: '163',
            loginUserFriendslinkMessage: '',
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
            loadMoreCommentsDisplay: '加载更多',
            commitCommentData: {
              articleId: '',
              content: '',
              parentContentId: ''
            },
            ccdefaultAvatar: require('../../assets/images/websizeavatar.jpg'),
            lastLeaveMsgCommentActionDiv: '',
            commitCommendId: '',
            lastShowCommentActionDiv: '',
            replyBtnToAddClickList: []
          }
      },
      methods:{
        getArticleCommendsCommon(page, size) {
          articleApi.getArticleCommends(this.friendslinkMessageArticleId, page, size)
            .then(res => {
              if (res.data.code === 20000) {
                this.friendslinkMessage = res.data.data.data;
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
        loadMoreComments() {
      //加载更多留言

          console.log(this.friendslinkMessage.pageSize)
          console.log(this.friendslinkMessage.totalCount)
          if (this.friendslinkMessage.pageSize >= this.friendslinkMessage.totalCount) {
            if (this.loadMoreCommentsDisplay === '加载更多') {
              this.loadMoreCommentsDisplay = '没有更多了';
            }
            return;
          }

          this.friendslinkMessage.pageSize += 5;
          console.log(this.friendslinkMessage.pageSize)

          articleApi.getArticleCommends(this.friendslinkMessageArticleId, this.friendslinkMessage.currentPage, this.friendslinkMessage.pageSize, 'more')
            .then(res => {
              if (res.data.code === 20000) {
                this.friendslinkMessage = res.data.data.data;
                console.log(this.friendslinkMessage.pageSize)
                if (this.friendslinkMessage.pageSize !== this.friendslinkMessage.totalCount) {
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
        childCommentCommit(leaveMessageId) {
      //回复第一级的回复的回复框提交
          let childCommentDiv = document.querySelector('.topCommentComment_' + leaveMessageId);
          if (childCommentDiv) {
            let childCommentContent = childCommentDiv.value;
            console.log(childCommentContent);
            //提交顶级留言
            this.commeonMethodToCommitComment(this.friendslinkMessageArticleId, childCommentContent, leaveMessageId);
            childCommentDiv.value = '';
          }
        },
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
            this.commeonMethodToCommitComment(this.friendslinkMessageArticleId, dataReplyToComment, this.commitCommendId);
            dataReplyToComment = '';
          }
        },
          //对顶级评论评论的显示评论框方法
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
        commitFriendslinkMessage() {
          //富文本提交留言
          //todo:提交富文本提交留言
          console.log(this.loginUserFriendslinkMessage);
          this.commeonMethodToCommitComment(this.friendslinkMessageArticleId, this.loginUserFriendslinkMessage)
          this.loginUserFriendslinkMessage = '';
        },
        triggleShowAllLeaveMsgWhenMounted() {
          if (this.friendslinkMessage.records.length > 0) {
            this.friendslinkMessage.records.forEach(item => {
              console.log(item)
              if (item.childrenCommends.length > 0) {
                let appendHtmlCommends = document.getElementById(item.id);
                console.log(appendHtmlCommends)
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
                      this.getArticleCommendsCommon(this.friendslinkMessage.currentPage, this.friendslinkMessage.pageSize);

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
              this.loginUserFriendslinkMessage = '';
            }
            console.log(this.lastShowCommentActionDiv);
            this.lastShowCommentActionDiv.style.display = 'none';
          }


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
        gotoFriendBlog(friendsLinkUrl) {
          // window.location = friendsLinkUrl;
          window.open(friendsLinkUrl);
        }
      },
      mounted() {
        this.$store.commit('setCurrentActiveTab', 'friendslink');

        this.triggleShowAllLeaveMsgWhenMounted();

        window.addEventListener('click', this.showChildReplyCommentAction);
        window.addEventListener('click', this.childCommentReplyCommit);
      },
      beforeDestroy() {
        window.removeEventListener('click', this.showChildReplyCommentAction);
        window.removeEventListener('click', this.childCommentReplyCommit);
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
  //===============================================================
  .ql-toolbar.ql-snow {
    border: 1px solid #171414;
    box-sizing: border-box;
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    padding: 8px;
  }
  .about-item h1:first-child{
    position: relative;
  }
  .about-item h1:first-child:before{
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
  .about-item h1:first-child:after{
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
  .about-item h1:first-child:hover{
    &:before {
      width: 2em;
      transition: all .3s;
    }
  }
  .about-item .ql-container, .ql-editor {
    min-height: 250px;
  }
  .ql-container.ql-snow {
    border: 2px solid #000;
  }

  .friends-links-item .vs-card:hover {
    transition: background-color .8s;
    background-color: #6face2;
  }


  .list-bottom-image-friends-links {
    background: url(https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@master/img/webp/footer.webp) no-repeat 50%;
    height: 368px;
    z-index: 1;
    width: 100%;
    position: absolute;
    pointer-events: none;
    left: 0;
    bottom: -105px;
  }
  .dress-bottom-friends-links-box{
    width: 100%;
    height: 200px;
    position: relative;
  }
  .friends-links-footer{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100px;
    color: white;
    background-color: #282727;
    text-align: center;
  }
  .friends-links-title {
    width: 100%;
    height: 200px;
    text-align: center;
    line-height: 200px;
    font-size: 30px;
    font-weight: 900;

  }

  .friends-links-inner-pad {
    min-height: 700px;
    padding: 30px;
  }
  .friends-links-inner {
    hr {
      position: relative;
      margin: 2rem auto;
      width: calc(100% - 4px);
      border: 2px dashed #a4d8fa;
      background: #fff;
    }
    box-sizing: border-box;
    width: 80%;
    margin: 0 auto;
    min-height: 700px;
    background-color: rgba(255, 255, 255, .7);
    border-radius: 35px;
  }
  @media screen and (max-width: 660px){
    .friends-links-inner{
      width: 100%;
    }

  }
  .friends-links-main-box{
    position: relative;
    width: 100%;
    margin-top: 40%;
  }
  .friends-links-bg-image-box {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    z-index: -1;
  }
  .friends-links-bg-image{
    width: 100%;
    height: 100%;
  }




  /* 暗色模式 和添加小屏幕响应式 */
  body.dark .triangle {
    background-color: #2e323b;
  }
  body.dark .triangle .textLeft span {
    background-color: black;
  }
  body.dark .triangle li.textLeft span:before {
    border-right: 8px solid black;
  }
  body.dark .triangle .textRight span {
    background-color: #64982e;
  }
  body.dark .triangle li.textRight span:after {
    border-left: 8px solid #64982e;
  }
  @media only screen and (min-width: 322px) and (max-width: 450px) {
    .triangle li:nth-last-of-type(1) {
      margin-bottom: 50px!important;
    }
  }
  @media only screen and (min-width: 452px) and (max-width: 900px) {
    .triangle li:nth-last-of-type(1) {
      margin-bottom: 42px!important;
    }
  }
  @media only screen and (max-width: 500px) {
    .triangle li span{
      font-size: 14px!important;
    }
  }
  @media only screen and (max-width: 322px) {
    .triangle li:nth-last-of-type(1) {
      margin-bottom: 50px!important;
    }
    .triangle li:nth-last-of-type(2)  {
      margin-bottom: 16px!important;
    }
  }
  .nn a, .dd a {
    color: #000;
  }
  .dd {
    display: none;
  }
  @media only screen and (max-width: 600px) {
    .nn {
      display: none;
    }
    .dd {
      display: block;
    }
  }


  .triangle{
    margin: 0 auto;
    background-color: #ebebe9;
  }
  .triangle ul{
    padding: 10px;
  }
  .triangle li{
    position: relative;
    padding: 10px 15px;
    margin-bottom: 10px;
  }
  .triangle li span{
    position: relative;
    border-radius: 7px;
    padding: 20px 15px 20px 15px;
    z-index: 1;
    font-size: 18px;
  }
  .triangle .textLeft span{
    background-color: white;
    position: absolute;
    top: 18px;
    left: 86px;
  }
  .triangle .textRight span{
    position: absolute;
    background-color: #a6e860;
    top: 18px;
    right: 86px;
    text-align: left;
  }
  .triangle li.textLeft:before{
    content: url("../../assets/images/avatar-change-02-60.png");
    box-sizing: border-box;
    position: relative;
    left: -10px;
    top: 9px;
  }
  .triangle li.textLeft span:before{
    content: "";
    display: block;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-right: 8px solid white;
    position: absolute;
    top: 8px;
    left: -16px;
  }
  .triangle li.textRight:after{
    content: url("../../assets/images/avatar-change-01-60.png");
    box-sizing: border-box;
    position: relative;
    right: -10px;
    top: 9px;
  }
  .triangle li.textRight span:after{
    content: "";
    display: block;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-left: 8px solid #a6e860;
    position: absolute;
    top: 8px;
    right: -16px;
  }
  li{
    list-style: none;
  }
  .textRight{
    text-align: right;
  }

  @media screen and (max-width: 1160px){
    .friends-links-inner-pad{
      .vs-col--w-4{
        width: 50%;
      }
    }
  }
  @media screen and (max-width: 900px){
    .friends-links-inner-pad{
      .vs-col--w-4{
        width: 100%;
      }
    }
  }

</style>
