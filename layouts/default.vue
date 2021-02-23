<template>
  <div style="position: relative;width: 100%">
    <div class="site-nav">



      <div id="menu" class="menu">
        <div class="default-home-page-nav-sign">
          <span>Czy | blog</span>
        </div>

    <span class="menu-item">
      <NuxtLink to="/" :class="$store.state.currentActiveTab === 'index'?'header-active':''">
        <i class="fa fa-home">
        </i>首页
      </NuxtLink>
    </span>
        <span class="menu-item">
      <NuxtLink to="/archive" :class="$store.state.currentActiveTab === 'archive'?'header-active':''">
        <i class="fa fa-archive" aria-hidden="true"></i>文章归档
      </NuxtLink>
    </span>
        <span class="menu-item">
      <NuxtLink to="/link" :class="$store.state.currentActiveTab === 'friendslink'?'header-active':''">
        <i class="iconfont icon-link"></i>友情链接
      </NuxtLink>
    </span>
        <span class="menu-item">
      <NuxtLink to="/about" :class="$store.state.currentActiveTab === 'about'?'header-active':''">
        <i class="iconfont icon-about1"></i>关于页面
      </NuxtLink>
    </span>


        <div class="nav-login-logout" v-if="loginAndRegisterBtnShow">
        <span class="menu-item">
      <a :href="'/login'+redirectPath">
        <i class="iconfont icon-fingermap"></i>登录
      </a>
    </span>
          |
          <span class="menu-item">
      <NuxtLink to="/register">
        <i class="fa fa-registered" aria-hidden="true"></i>注册
      </NuxtLink>
    </span>
        </div>
        <div class="nav-login-logout" v-else>
          <div class="login-user-top-msg-action-box">
            <div class="login-user-top-msg" @mouseenter="showUserActionDrop" @mouseleave="closeUserActionDrop">
              <vs-avatar size="64" badge badge-color="success">
                <img :src="loginUser.avatar" alt="">
              </vs-avatar>
              <span>{{loginUser.userName}}</span>
            </div>
            <transition enter-active-class="animated flipInX"
                        leave-active-class="animated flipOutY">
              <div class="login-user-top-action" v-if="UserActionDrop" @mouseenter="showUserActionDrop"
                   @mouseleave="closeUserActionDrop">
                <div class="login-user-top-action-item mdui-ripple" @click="toLoginUserInfoPage(loginUser.id)">
                    <i class="fa fa-id-card-o" aria-hidden="true"></i>用户信息
                </div>
                <div v-if="loginUser.roles==='role_admin'"
                     @click="toBackControlStage"
                     class="login-user-top-action-item mdui-ripple"><i class="fa fa-area-chart" aria-hidden="true"></i>后台管理</div>
                <div
                  @click="doLogout"
                  class="login-user-top-action-item mdui-ripple"><i class="iconfont icon-tuichu1"></i>退出</div>
              </div>
            </transition>
          </div>
        </div>
      </div>


    </div>
    <div class="reactive-site-nav">
      <a class="toggleBtn" @click="reactiveSideBarShow =true">
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </a>

      <div class="reactive-user-top-action">
        <div class="reactive-user-top-action-btn" v-if="loginAndRegisterBtnShow">
          <el-button type="primary" @click="reactiveBarAction('login')">登录</el-button>
          <el-button type="warning" @click="reactiveBarAction('register')">注册</el-button>
        </div>

        <img v-else class="userAvatar" :src="loginUser.avatar"/>
      </div>

    </div>



    <div class="qingtianwawa"></div>


    <transition
      name="custom-classes-transition"
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutLeft"
    >

      <!--reactive side bar -->
      <div class="reactiveSideBar" v-if="reactiveSideBarShow">
        <img class="reactiveSideBar-userAvatar" v-if="loginAndRegisterBtnShow" :src="masterInfo.avatar">
        <img class="reactiveSideBar-userAvatar" v-else :src="loginUser.avatar">
        <div class="reactive-sideBar-router">

          <vs-button
            class="sidebar-router-btn"
            gradient
            :active="active == '/'"
            @click="homePageReactiveSiberJump('/')"
          >

            首页

          </vs-button>

          <vs-button
            class="sidebar-router-btn"
            gradient
            :active="active == '/archive'"
            @click="homePageReactiveSiberJump('/archive')"
          >
            文章归档
          </vs-button>
          <vs-button
            class="sidebar-router-btn"
            gradient
            :active="active == '/link'"
            @click="homePageReactiveSiberJump('/link')"
          >
            友情链接
          </vs-button>
          <vs-button
            class="sidebar-router-btn"
            gradient
            :active="active == '/about'"
            @click="homePageReactiveSiberJump('/about')"
          >
            关于页面
          </vs-button>
        </div>

        <div class="reactive-sideBar-advice">
          <div class="reactive-sideBar-advice-title">网站通知：</div>
          <div class="reactive-sideBar-advice-content">
            {{advice}}

          </div>
        </div>

        <div class="reactive-sideBar-advice">
          <div class="reactive-sideBar-advice-title">搜索：</div>

          <div style="margin: 6px">
          <el-input

            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
            placeholder="请输入需要搜索的内容"
            v-model="search">
          </el-input>
        </div>
          <el-button type="primary" @click="doSearch">点击搜索</el-button>
        </div>


        <div>Copyright © 2020-2021 czyBlog Powered by czystudy.com Core on NUXTJS</div>

        <div >
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44190002005367" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;color: #fff">
            <img src="../assets/images/beian.png"/>粤公网安备 44190002005367号&nbsp;&nbsp;<br></br>粤ICP备2021019933号-1
          </a>
        </div>
      </div>
    </transition>
    <div class="reactiveSideBar-shade" v-if="reactiveSideBarShow"
         @click="reactiveSideBarShow = false"></div>


    <Nuxt/>
  </div>
</template>
<script>
  import 'nprogress/nprogress.css'
  import NProgress from "nprogress";
  NProgress.configure({
    // 动画方式
    easing: 'ease-out-in',
    // 递增进度条的速度
    speed: 700,
    // 是否显示加载ico
    showSpinner: false,
    // 自动递增间隔
    trickleSpeed: 200,
    // 初始化时的最小百分比
    minimum: 0.0
  })
  import homeApi from "../api/homeApi";
  import userApi from "../api/userApi";
  export default {

    component:{NProgress},
    data() {
      return {
        search: '',
        advice: '',
        redirectPath: '',
        loginAndRegisterBtnShow: true,
        masterInfo: {
          avatar: require('../assets/images/kawayi.gif')
        },
        active:'/',
        reactiveSideBarShow: false,


        loginUser: {
          avatar: require('../assets/images/kawayi.gif'),
          createTime: '',
          email: '',
          id: '',
          loginIp: '',
          regIp: '',
          roles: '',
          sign: '',
          userName: ''
        },
        UserActionDrop: false
      }
    },
    methods: {
      doSearch() {
        window.location.href = `/search?categoryId=&keyword=${encodeURIComponent(this.search)}&page=1&size=5&sort=`

      },
      reactiveBarAction(signal) {
        if (signal === 'login') {
          location.href = '/login'+this.redirectPath
        }else if (signal === 'register') {
          location.href = '/register'
        }
      },

      homePageReactiveSiberJump(path) {
        this.active = path;
        this.$router.push({
          path: path
        })
      },
      toLoginUserInfoPage(loginUserId) {
        location.href = `/userInfo/${loginUserId}`;
      },
      doLogout() {
        userApi.doLogout();
        location.href = '/';
      },
      toBackControlStage() {
        window.open('http://localhost:8080')
      },
      showUserActionDrop() {
        this.UserActionDrop = true;
      },
      closeUserActionDrop() {
        this.UserActionDrop = false;
      },
      // doSearch() {
      //   this.loading = true;
      //   let that = this;
      //   setInterval(function () {
      //     that.loading = false;
      //   }, 2000);
      //
      //
      // },
      handleScroll() {
        // 屏幕剩余的高度
        let surplus =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        // 当前滑动高度
        let scrollY = document.documentElement.scrollTop;
        // 当前位置百分比小数
        let coorY = scrollY / surplus;
        // 设置导航栏，这里使用NProgress.set() 动态更改进度条
        NProgress.set(coorY);

      }
    },
    watch:{
      $route:{
        deep: true,
        handler(n, o) {
          if (this.redirectPath !== '?redirect=' + location.href &&
            this.$route.path !== '/' &&
            this.$route.path !== '/login' &&
            this.$route.path !== '/register' &&
            this.$route.path !== '/forget') {
            this.redirectPath = '?redirect=' + location.href;
          }

          console.log('redirectPath --------------- ' + this.redirectPath);
          console.log(this.$route.path);
          console.log('newR --------------- ' + n.path);
          console.log('oldR --------------- ' + o.path);
        }
      }
    },

    mounted(){

      if (this.redirectPath !== '?redirect=' + location.href &&
        this.$route.path !== '/' &&
        this.$route.path !== '/login' &&
        this.$route.path !== '/register' &&
        this.$route.path !== '/forget') {
          this.redirectPath = '?redirect=' + location.href;
        }

      const loading = this.$vs.loading({
        type: 'square'
      });

      this.currwindow = window;
      console.log(this.currwindow)
      setTimeout(() => {
        window.L2Dwidget.init({
          pluginRootPath: "/live2dw/",
          pluginJsPath: "lib/",
          pluginModelPath: "sagiri/",
          // pluginModelPath: "live2d-widget-model-koharu/assets/",
          tagMode: false,
          debug: false,
          model: {
            jsonPath: "/live2dw/sagiri/sagiri.model.json"
            // jsonPath: "../live2dw/live2d-widget-model-koharu/assets/koharu.model.json"
          },
          display: { position: "right", width: 200, height: 400 },
          mobile: { show: true },
          log: false
        });
        loading.close()
      }, 1000);
      // homeApi.getMasterInfo()
      // .then(res=>{
      //   this.masterInfo = res.data.data.user
      //   console.log(res)
      //   this.$vs.notification({
      //
      //     duration:3000,
      //     width:'100%',
      //     position: 'top-center',
      //     color:'success',
      //     title: 'czy提示：请求成功Σ(⊙▽⊙"a',
      //     text: '你需要的信息获取成功了(test)!!!'
      //   })
      // })
      //console.log(this.$store.state.masterInfo+" by default...")
      setTimeout(()=>{
        window.addEventListener("scroll", this.handleScroll); // 监听滚动条事件
      },1000)

      // setTimeout(() => {
      homeApi.getMasterInfo().then(resolve=>{
        this.masterInfo = resolve.data.data.user;
        console.log(resolve.data.data.user);
        this.$store.commit('setMasterInfo', this.masterInfo);
      })

      userApi.checkToken().then(res=>{
        if (res.data.code === 20000) {
          this.loginUser = res.data.data.data
          this.loginAndRegisterBtnShow = false;
          this.$store.commit('setLoginUser', this.loginUser);
          console.log(this.loginUser);
          return;
        }
        this.loginAndRegisterBtnShow = true;
      });
      homeApi.getBlogAdvice()
        .then(res => {
          if (res.data.code === 20000) {
            this.advice = res.data.data.data
          }
        });
    }
  }
</script>

<style lang="less">
  * {
    padding: 0;
    margin: 0;
  }
  @font-face {
    font-family: "titlefont";
    src: url('../assets/ttl/titlefont.ttf');
    font-weight: normal;
    font-style: normal;
  }


  .default-home-page-nav-sign{
    float: left;
    padding-left: 40px ;
    span {
      color: #f54c6e;
      font-family: titlefont, 'pao', 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
      font-size: 30px;
    }
  }
  @media screen and (max-width: 795px){
    .default-home-page-nav-sign{
      display: none;
    }
  }
  #canvas_sakura{
    z-index: 4002;
    height: calc(100% - 60px);
  }

  .qingtianwawa{
    position: fixed;
    left: 25px;
    top: -900px;
    z-index: 3999;
    width: 70px;
    height: 900px;
    background: url(https://ryanc.cc/upload/2020/12/92991ec7ca0c31c011319ddb3ebbc882-5d90f325712c452e854490cc28e58938.png) no-repeat center;
    background-size: contain;
    -webkit-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    cursor: url(https://cdn.lixingyong.com/img/Sakura/cursor/No_Disponible.cur),
    auto;
    opacity: 1;
  }
  @media screen and (max-width: 660px){
    .qingtianwawa{
      display: none;
    }
  }

  .nav-login-logout {
    margin-right: 20px;
    color: white;
    float: right;
    a{
      text-decoration: none;
      color: white;
    }

  }
  .login-user-top-msg-action-box {
    position: relative;
    background: transparent;
    height: 64px;
    width: 170px;

  }
  .login-user-top-msg {
    display: flex;
    align-items: center;
    margin-right: 30px;
    width: inherit;
    height: inherit;
    .vs-avatar img{
      height:100%;
    }
    span{
      display: block;
      height: 64px;
      color: orangered;
    }
  }
  .login-user-top-action {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    top: 69px;
    left: 10px;
    background: white;
    border-radius: 15px;
    /*height: 200px;*/
    width: 160px;

  }
  .login-user-top-action-item {
    height: 60px;
    width: 140px;
    margin: 10px;
    border-radius: 12px;
    color: #DD4A68;
    font-size: 20px;
  }
  .login-user-top-action-item:hover {
    box-shadow: 3px 3px 6px #282727;
    background: skyblue;
    transition: all .5s;
  }

  @font-face {
    font-family: "pao";
    src: url('../assets/ttl/paopaofont.ttf');
    font-weight: normal;
    font-style: normal;
  }
  body {
    background-attachment: fixed;
    cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/normal.cur),auto;
    font-family:pao ,'PingFang SC','Microsoft YaHei','Helvetica Neue','Helvetica','Arial',sans-serif;
  }

  .sidebar-router-btn{
    border-radius: 15px;
    width: 80%;
    height: 18%;
    display: block;
    background-color: rgba(255,78,106);
    text-decoration: none;
  }
  .hovericon:hover{
    box-shadow: 5px 5px 5px #282727;
    transition: .5s all;
  }
  .reactive-sideBar-router {
    height: 300px;
    background-color: white;
    border-radius: 12px;
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    box-shadow:  0 0 10px #d1d1d1;
  }
  .reactive-sideBar-advice{
    height: 300px;
    background-color: white;
    border-radius: 12px;
    width: 80%;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-shadow:  0 0 10px #d1d1d1;
    .reactive-sideBar-advice-title{
      color: #f54c6e;
      font-size: 24px;
      font-weight: 900;
    }
    .reactive-sideBar-advice-content {
      color: #0a001f;
      font-size: 16px;
      background-color: rgba(140, 140, 140, 0.61);
      border-radius: 6px;
      margin: 20px;
      min-height: 200px;
    }
  }

  .reactiveSideBar-userAvatar {
    width: 200px;

    height: 200px;
    border-radius: 50%;
    display: block;
    margin: 40px auto;
    box-shadow:  0 0 24px #d9d9d9;
  }

  .reactiveSideBar {
    div{
      font-family: 'pao','PingFang SC','Microsoft YaHei','Helvetica Neue','Helvetica','Arial',sans-serif;
      font-size: 20px;
    }
    background-color: #282727;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 60%;
    color: white;
    box-shadow: 0 0 10px #d4d4d4;
    transition: .8s all;
    z-index: 200;
    overflow: auto;
  }
  .reactiveSideBar-shade{
    position: fixed;
    z-index: 200;
    top: 0;
    right: 0;
    bottom: 0;
    width: 40%;
    background-color: rgba(12,12,12,.5);
  }
  @media screen and (min-width: 660px){
    .reactiveSideBar{
      display: none;
    }
    .reactiveSideBar-shade{
      display: none;
    }
    @font-face {
      font-family: "pao";
      src: url('../assets/ttl/paopaofont.ttf');
      font-weight: normal;
      font-style: normal;
    }
    body {
      background-attachment: fixed;
      cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/normal.cur),auto;
      font-family:pao ,'PingFang SC','Microsoft YaHei','Helvetica Neue','Helvetica','Arial',sans-serif;
    }

  }
  .home-package-action-icon {
    width: 100%;
    height: 100px;
    line-height: 180px;
    text-align: center;
  }

  .home-package-action-search {
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 100%;
    .home-search-input {
      display: inline-block;
      margin: 5px auto;
      height: 30px;
      width: 250px;
    }
  }

  .home-web-individual-show {
    background-color: transparent;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 300px;
    position: absolute;
    top: 350px;
    z-index: 20;

    .package-action-circle {
      a {
        margin: 20px;
      }

      box-shadow: 0 0 24px #3b3f41;
      width: 55rem;
      height: 300px;
      position: relative;
      border-radius: 50%;
      background-color: rgba(230, 244, 249, 0.6);

      .home-web-individual-avatar {
        width: 100px;
        height: 100px;
        border-radius: 100%;
        border: 2px dashed #fff;
        padding: 5px;
        position: absolute;
        left: 24.5rem;
        top: -50px;
      }
    }

  }

  .home-first-big-bg-box {

    position: sticky;
    top: 0;
    width: 100%;
    height: 800px;

    .home-first-big-bg {
      width: 100%;
      height: 800px;
    }
  }

  .home-web-individual-avatar:hover {
    animation: infinite alternate tada .5s;
  }

  @keyframes tada {
    0% {
      -webkit-transform: scale(1);
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1)
    }
    10%, 20% {
      -webkit-transform: scale(.9) rotate(-3deg);
      -webkit-transform: scale(.9) rotate(-3deg);
      -moz-transform: scale(.9) rotate(-3deg);
      -ms-transform: scale(.9) rotate(-3deg);
      -o-transform: scale(.9) rotate(-3deg);
      transform: scale(.9) rotate(-3deg)
    }
    30%, 50%, 70%, 90% {
      -webkit-transform: scale(1.1) rotate(3deg);
      -webkit-transform: scale(1.1) rotate(3deg);
      -moz-transform: scale(1.1) rotate(3deg);
      -ms-transform: scale(1.1) rotate(3deg);
      -o-transform: scale(1.1) rotate(3deg);
      transform: scale(1.1) rotate(3deg)
    }
    40%, 60%, 80% {
      -webkit-transform: scale(1.1) rotate(-3deg);
      -webkit-transform: scale(1.1) rotate(-3deg);
      -moz-transform: scale(1.1) rotate(-3deg);
      -ms-transform: scale(1.1) rotate(-3deg);
      -o-transform: scale(1.1) rotate(-3deg);
      transform: scale(1.1) rotate(-3deg)
    }
    100% {
      -webkit-transform: scale(1) rotate(0);
      -webkit-transform: scale(1) rotate(0);
      -moz-transform: scale(1) rotate(0);
      -ms-transform: scale(1) rotate(0);
      -o-transform: scale(1) rotate(0);
      transform: scale(1) rotate(0)
    }
  }

  .typed-content {
    font-family: pao,'PingFang SC','Microsoft YaHei','Helvetica Neue','Helvetica','Arial',sans-serif;
    text-align: center;
    line-height: 60px;
    display: flex;
    justify-content: center;
    background-color: transparent;
    text-shadow: 0 0 10px #d9d9d9;
    color: white;
    position: absolute;
    top: 240px;
    width: 100%;
    font-size: 30px;
  }

  @media screen and (max-width: 1080px) {
    @font-face {
      font-family: "pao";
      src: url('../assets/ttl/paopaofont.ttf');
      font-weight: normal;
      font-style: normal;
    }
    body {
      background-attachment: fixed;
      cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/normal.cur),auto;
      font-family:pao ,'PingFang SC','Microsoft YaHei','Helvetica Neue','Helvetica','Arial',sans-serif;
    }
    .home-first-big-bg-box {
      width: 100%;
      height: 600px;

      .typed-content {
        top: 170px;
      }

      .home-first-big-bg {
        transition: .5s all;
        width: 100%;
        height: 600px;
      }



      .home-web-individual-show {
        transition: .4s all;
        top: 300px;

        .package-action-circle {
          width: 60%;
          height: 250px;

          .home-web-individual-avatar {
            left: 38.5%;
          }
        }
      }
    }
  }

  .clearFloat() {
    clear: both;
  }

  .reactive-user-top-action{
    line-height: 3.5rem;
    height: 3.5rem;
    width: 70%;
    float: right;
    display: flex;
    justify-content:flex-end ;
  }
  .userAvatar {
    margin: 6px;
    margin-right: 20px;
    height: 44px;
    width: 44px;
    border-radius: 50%;
    box-shadow: 0 0 5px #282727;
  }

  .toggleBtn {
    margin: 6px;
    float: left;
    position: relative;
    height: 44px;
    width: 44px;
    border-radius: 50%;
    box-shadow: 0 0 4px #eee;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .toggleBtn .line {
    height: 1px;
    margin: 3px;
    width: 21px;
    background-color: #35485d;
  }

  .reactive-site-nav:before {
    content: "";
    width: 100%;
    border-bottom: 1px solid #eee;
    position: absolute;
    bottom: -1px;
  }

  .reactive-site-nav {
    background-color: rgba(34,25,25,.2);
    height: 3.5rem;
    width: 100%;
    display: none;
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
  }

  @media screen and(max-width: 660px) {
    @font-face {
      font-family: "pao";
      src: url('../assets/ttl/paopaofont.ttf');
      font-weight: normal;
      font-style: normal;
    }
    body {
      background-attachment: fixed;
      cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/normal.cur),auto;
      font-family:pao ,'PingFang SC','Microsoft YaHei','Helvetica Neue','Helvetica','Arial',sans-serif;
    }
    .site-nav {
      display: none;
    }


    .home-first-big-bg-box {

      .home-first-big-bg {
        height: 18rem;
      }

      .typed-content {
        display: none;
      }
    }

    .home-web-individual-show {
      display: none;
    }

    .home-first-big-bg-box{
      height: 300px;
    }
    .reactive-site-nav {
      vertical-align: middle;
      display: block;
      box-shadow: 0 0 7px #eee;

      a {
        text-decoration: none;
      }

      .clearFloat;

    }
    .live2d-widget-container{
      display: none;
    }
    .sidebar-inner{
      display: none;
    }
    body{
      overflow-x: hidden;
    }
  }

  .menu {
    vertical-align: middle;
    height: 4rem;
    width: 100%;
    line-height: 4rem;
    margin: 0 auto;
    text-align: center;

  }

  .site-title {
    opacity: 0;
    position: relative;
    top: -10px
  }

  .site-nav{
    height: 64px;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    text-shadow: 0 1px 1px rgba(0, 0, 0, .3);
    z-index: 2000;
    background: linear-gradient(rgba(231, 212, 212, 0.3), transparent)
  }

  .menu .menu-item a {
    text-decoration: none;
    position: relative;
    box-sizing: border-box;
    padding: 0 12px;
    line-height: inherit;
    transition-property: background-color;
    transition-duration: .2s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
    color: #d4d4d4;
    font-size: 19px;
    border-bottom: none;
  }
  .site-nav:hover {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    text-shadow: 0 1px 1px rgba(0, 0, 0, .3);
    z-index: 2000;

    background: rgba(255,255,255,.7);
    transition: all .7s;
    a{
      color: #282727;
      &:hover{
        color: skyblue;
        cursor: url(https://cdn.lixingyong.com/img/Sakura/cursor/No_Disponible.cur), auto;
      }
    }
  }








  .my-face {
    animation: my-face 5s infinite ease-in-out;
    display: inline-block;
    margin: 0 5px
  }

  @-moz-keyframes my-face {
    2%,24%,80% {
      -webkit-transform: translate(0,1.5px) rotate(1.5deg);
      -moz-transform: translate(0,1.5px) rotate(1.5deg);
      -ms-transform: translate(0,1.5px) rotate(1.5deg);
      -o-transform: translate(0,1.5px) rotate(1.5deg);
      transform: translate(0,1.5px) rotate(1.5deg)
    }

    4%,68%,98% {
      -webkit-transform: translate(0,-1.5px) rotate(-.5deg);
      -moz-transform: translate(0,-1.5px) rotate(-.5deg);
      -ms-transform: translate(0,-1.5px) rotate(-.5deg);
      -o-transform: translate(0,-1.5px) rotate(-.5deg);
      transform: translate(0,-1.5px) rotate(-.5deg)
    }

    38%,6% {
      -webkit-transform: translate(0,1.5px) rotate(-1.5deg);
      -moz-transform: translate(0,1.5px) rotate(-1.5deg);
      -ms-transform: translate(0,1.5px) rotate(-1.5deg);
      -o-transform: translate(0,1.5px) rotate(-1.5deg);
      transform: translate(0,1.5px) rotate(-1.5deg)
    }

    8%,86% {
      -webkit-transform: translate(0,-1.5px) rotate(-1.5deg);
      -moz-transform: translate(0,-1.5px) rotate(-1.5deg);
      -ms-transform: translate(0,-1.5px) rotate(-1.5deg);
      -o-transform: translate(0,-1.5px) rotate(-1.5deg);
      transform: translate(0,-1.5px) rotate(-1.5deg)
    }

    10%,72% {
      -webkit-transform: translate(0,2.5px) rotate(1.5deg);
      -moz-transform: translate(0,2.5px) rotate(1.5deg);
      -ms-transform: translate(0,2.5px) rotate(1.5deg);
      -o-transform: translate(0,2.5px) rotate(1.5deg);
      transform: translate(0,2.5px) rotate(1.5deg)
    }

    12%,64%,78%,96% {
      -webkit-transform: translate(0,-.5px) rotate(1.5deg);
      -moz-transform: translate(0,-.5px) rotate(1.5deg);
      -ms-transform: translate(0,-.5px) rotate(1.5deg);
      -o-transform: translate(0,-.5px) rotate(1.5deg);
      transform: translate(0,-.5px) rotate(1.5deg)
    }

    14%,54% {
      -webkit-transform: translate(0,-1.5px) rotate(1.5deg);
      -moz-transform: translate(0,-1.5px) rotate(1.5deg);
      -ms-transform: translate(0,-1.5px) rotate(1.5deg);
      -o-transform: translate(0,-1.5px) rotate(1.5deg);
      transform: translate(0,-1.5px) rotate(1.5deg)
    }

    16% {
      -webkit-transform: translate(0,-.5px) rotate(-1.5deg);
      -moz-transform: translate(0,-.5px) rotate(-1.5deg);
      -ms-transform: translate(0,-.5px) rotate(-1.5deg);
      -o-transform: translate(0,-.5px) rotate(-1.5deg);
      transform: translate(0,-.5px) rotate(-1.5deg)
    }

    18%,22% {
      -webkit-transform: translate(0,.5px) rotate(-1.5deg);
      -moz-transform: translate(0,.5px) rotate(-1.5deg);
      -ms-transform: translate(0,.5px) rotate(-1.5deg);
      -o-transform: translate(0,.5px) rotate(-1.5deg);
      transform: translate(0,.5px) rotate(-1.5deg)
    }

    20%,36%,46% {
      -webkit-transform: translate(0,-1.5px) rotate(2.5deg);
      -moz-transform: translate(0,-1.5px) rotate(2.5deg);
      -ms-transform: translate(0,-1.5px) rotate(2.5deg);
      -o-transform: translate(0,-1.5px) rotate(2.5deg);
      transform: translate(0,-1.5px) rotate(2.5deg)
    }

    26%,50% {
      -webkit-transform: translate(0,.5px) rotate(.5deg);
      -moz-transform: translate(0,.5px) rotate(.5deg);
      -ms-transform: translate(0,.5px) rotate(.5deg);
      -o-transform: translate(0,.5px) rotate(.5deg);
      transform: translate(0,.5px) rotate(.5deg)
    }

    28% {
      -webkit-transform: translate(0,.5px) rotate(1.5deg);
      -moz-transform: translate(0,.5px) rotate(1.5deg);
      -ms-transform: translate(0,.5px) rotate(1.5deg);
      -o-transform: translate(0,.5px) rotate(1.5deg);
      transform: translate(0,.5px) rotate(1.5deg)
    }

    30%,40%,62%,76%,88% {
      -webkit-transform: translate(0,-.5px) rotate(2.5deg);
      -moz-transform: translate(0,-.5px) rotate(2.5deg);
      -ms-transform: translate(0,-.5px) rotate(2.5deg);
      -o-transform: translate(0,-.5px) rotate(2.5deg);
      transform: translate(0,-.5px) rotate(2.5deg)
    }

    32%,34%,66% {
      -webkit-transform: translate(0,1.5px) rotate(-.5deg);
      -moz-transform: translate(0,1.5px) rotate(-.5deg);
      -ms-transform: translate(0,1.5px) rotate(-.5deg);
      -o-transform: translate(0,1.5px) rotate(-.5deg);
      transform: translate(0,1.5px) rotate(-.5deg)
    }

    42% {
      -webkit-transform: translate(0,2.5px) rotate(-1.5deg);
      -moz-transform: translate(0,2.5px) rotate(-1.5deg);
      -ms-transform: translate(0,2.5px) rotate(-1.5deg);
      -o-transform: translate(0,2.5px) rotate(-1.5deg);
      transform: translate(0,2.5px) rotate(-1.5deg)
    }

    44%,70% {
      -webkit-transform: translate(0,1.5px) rotate(.5deg);
      -moz-transform: translate(0,1.5px) rotate(.5deg);
      -ms-transform: translate(0,1.5px) rotate(.5deg);
      -o-transform: translate(0,1.5px) rotate(.5deg);
      transform: translate(0,1.5px) rotate(.5deg)
    }

    48%,74%,82% {
      -webkit-transform: translate(0,-.5px) rotate(.5deg);
      -moz-transform: translate(0,-.5px) rotate(.5deg);
      -ms-transform: translate(0,-.5px) rotate(.5deg);
      -o-transform: translate(0,-.5px) rotate(.5deg);
      transform: translate(0,-.5px) rotate(.5deg)
    }

    52%,56%,60% {
      -webkit-transform: translate(0,2.5px) rotate(2.5deg);
      -moz-transform: translate(0,2.5px) rotate(2.5deg);
      -ms-transform: translate(0,2.5px) rotate(2.5deg);
      -o-transform: translate(0,2.5px) rotate(2.5deg);
      transform: translate(0,2.5px) rotate(2.5deg)
    }

    58% {
      -webkit-transform: translate(0,.5px) rotate(2.5deg);
      -moz-transform: translate(0,.5px) rotate(2.5deg);
      -ms-transform: translate(0,.5px) rotate(2.5deg);
      -o-transform: translate(0,.5px) rotate(2.5deg);
      transform: translate(0,.5px) rotate(2.5deg)
    }

    84% {
      -webkit-transform: translate(0,1.5px) rotate(2.5deg);
      -moz-transform: translate(0,1.5px) rotate(2.5deg);
      -ms-transform: translate(0,1.5px) rotate(2.5deg);
      -o-transform: translate(0,1.5px) rotate(2.5deg);
      transform: translate(0,1.5px) rotate(2.5deg)
    }

    90% {
      -webkit-transform: translate(0,2.5px) rotate(-.5deg);
      -moz-transform: translate(0,2.5px) rotate(-.5deg);
      -ms-transform: translate(0,2.5px) rotate(-.5deg);
      -o-transform: translate(0,2.5px) rotate(-.5deg);
      transform: translate(0,2.5px) rotate(-.5deg)
    }

    92% {
      -webkit-transform: translate(0,.5px) rotate(-.5deg);
      -moz-transform: translate(0,.5px) rotate(-.5deg);
      -ms-transform: translate(0,.5px) rotate(-.5deg);
      -o-transform: translate(0,.5px) rotate(-.5deg);
      transform: translate(0,.5px) rotate(-.5deg)
    }

    94% {
      -webkit-transform: translate(0,2.5px) rotate(.5deg);
      -moz-transform: translate(0,2.5px) rotate(.5deg);
      -ms-transform: translate(0,2.5px) rotate(.5deg);
      -o-transform: translate(0,2.5px) rotate(.5deg);
      transform: translate(0,2.5px) rotate(.5deg)
    }

    0%,100% {
      -webkit-transform: translate(0,0) rotate(0);
      -moz-transform: translate(0,0) rotate(0);
      -ms-transform: translate(0,0) rotate(0);
      -o-transform: translate(0,0) rotate(0);
      transform: translate(0,0) rotate(0)
    }
  }

  @-webkit-keyframes my-face {
    2%,24%,80% {
      -webkit-transform: translate(0,1.5px) rotate(1.5deg);
      -moz-transform: translate(0,1.5px) rotate(1.5deg);
      -ms-transform: translate(0,1.5px) rotate(1.5deg);
      -o-transform: translate(0,1.5px) rotate(1.5deg);
      transform: translate(0,1.5px) rotate(1.5deg)
    }

    4%,68%,98% {
      -webkit-transform: translate(0,-1.5px) rotate(-.5deg);
      -moz-transform: translate(0,-1.5px) rotate(-.5deg);
      -ms-transform: translate(0,-1.5px) rotate(-.5deg);
      -o-transform: translate(0,-1.5px) rotate(-.5deg);
      transform: translate(0,-1.5px) rotate(-.5deg)
    }

    38%,6% {
      -webkit-transform: translate(0,1.5px) rotate(-1.5deg);
      -moz-transform: translate(0,1.5px) rotate(-1.5deg);
      -ms-transform: translate(0,1.5px) rotate(-1.5deg);
      -o-transform: translate(0,1.5px) rotate(-1.5deg);
      transform: translate(0,1.5px) rotate(-1.5deg)
    }

    8%,86% {
      -webkit-transform: translate(0,-1.5px) rotate(-1.5deg);
      -moz-transform: translate(0,-1.5px) rotate(-1.5deg);
      -ms-transform: translate(0,-1.5px) rotate(-1.5deg);
      -o-transform: translate(0,-1.5px) rotate(-1.5deg);
      transform: translate(0,-1.5px) rotate(-1.5deg)
    }

    10%,72% {
      -webkit-transform: translate(0,2.5px) rotate(1.5deg);
      -moz-transform: translate(0,2.5px) rotate(1.5deg);
      -ms-transform: translate(0,2.5px) rotate(1.5deg);
      -o-transform: translate(0,2.5px) rotate(1.5deg);
      transform: translate(0,2.5px) rotate(1.5deg)
    }

    12%,64%,78%,96% {
      -webkit-transform: translate(0,-.5px) rotate(1.5deg);
      -moz-transform: translate(0,-.5px) rotate(1.5deg);
      -ms-transform: translate(0,-.5px) rotate(1.5deg);
      -o-transform: translate(0,-.5px) rotate(1.5deg);
      transform: translate(0,-.5px) rotate(1.5deg)
    }

    14%,54% {
      -webkit-transform: translate(0,-1.5px) rotate(1.5deg);
      -moz-transform: translate(0,-1.5px) rotate(1.5deg);
      -ms-transform: translate(0,-1.5px) rotate(1.5deg);
      -o-transform: translate(0,-1.5px) rotate(1.5deg);
      transform: translate(0,-1.5px) rotate(1.5deg)
    }

    16% {
      -webkit-transform: translate(0,-.5px) rotate(-1.5deg);
      -moz-transform: translate(0,-.5px) rotate(-1.5deg);
      -ms-transform: translate(0,-.5px) rotate(-1.5deg);
      -o-transform: translate(0,-.5px) rotate(-1.5deg);
      transform: translate(0,-.5px) rotate(-1.5deg)
    }

    18%,22% {
      -webkit-transform: translate(0,.5px) rotate(-1.5deg);
      -moz-transform: translate(0,.5px) rotate(-1.5deg);
      -ms-transform: translate(0,.5px) rotate(-1.5deg);
      -o-transform: translate(0,.5px) rotate(-1.5deg);
      transform: translate(0,.5px) rotate(-1.5deg)
    }

    20%,36%,46% {
      -webkit-transform: translate(0,-1.5px) rotate(2.5deg);
      -moz-transform: translate(0,-1.5px) rotate(2.5deg);
      -ms-transform: translate(0,-1.5px) rotate(2.5deg);
      -o-transform: translate(0,-1.5px) rotate(2.5deg);
      transform: translate(0,-1.5px) rotate(2.5deg)
    }

    26%,50% {
      -webkit-transform: translate(0,.5px) rotate(.5deg);
      -moz-transform: translate(0,.5px) rotate(.5deg);
      -ms-transform: translate(0,.5px) rotate(.5deg);
      -o-transform: translate(0,.5px) rotate(.5deg);
      transform: translate(0,.5px) rotate(.5deg)
    }

    28% {
      -webkit-transform: translate(0,.5px) rotate(1.5deg);
      -moz-transform: translate(0,.5px) rotate(1.5deg);
      -ms-transform: translate(0,.5px) rotate(1.5deg);
      -o-transform: translate(0,.5px) rotate(1.5deg);
      transform: translate(0,.5px) rotate(1.5deg)
    }

    30%,40%,62%,76%,88% {
      -webkit-transform: translate(0,-.5px) rotate(2.5deg);
      -moz-transform: translate(0,-.5px) rotate(2.5deg);
      -ms-transform: translate(0,-.5px) rotate(2.5deg);
      -o-transform: translate(0,-.5px) rotate(2.5deg);
      transform: translate(0,-.5px) rotate(2.5deg)
    }

    32%,34%,66% {
      -webkit-transform: translate(0,1.5px) rotate(-.5deg);
      -moz-transform: translate(0,1.5px) rotate(-.5deg);
      -ms-transform: translate(0,1.5px) rotate(-.5deg);
      -o-transform: translate(0,1.5px) rotate(-.5deg);
      transform: translate(0,1.5px) rotate(-.5deg)
    }

    42% {
      -webkit-transform: translate(0,2.5px) rotate(-1.5deg);
      -moz-transform: translate(0,2.5px) rotate(-1.5deg);
      -ms-transform: translate(0,2.5px) rotate(-1.5deg);
      -o-transform: translate(0,2.5px) rotate(-1.5deg);
      transform: translate(0,2.5px) rotate(-1.5deg)
    }

    44%,70% {
      -webkit-transform: translate(0,1.5px) rotate(.5deg);
      -moz-transform: translate(0,1.5px) rotate(.5deg);
      -ms-transform: translate(0,1.5px) rotate(.5deg);
      -o-transform: translate(0,1.5px) rotate(.5deg);
      transform: translate(0,1.5px) rotate(.5deg)
    }

    48%,74%,82% {
      -webkit-transform: translate(0,-.5px) rotate(.5deg);
      -moz-transform: translate(0,-.5px) rotate(.5deg);
      -ms-transform: translate(0,-.5px) rotate(.5deg);
      -o-transform: translate(0,-.5px) rotate(.5deg);
      transform: translate(0,-.5px) rotate(.5deg)
    }

    52%,56%,60% {
      -webkit-transform: translate(0,2.5px) rotate(2.5deg);
      -moz-transform: translate(0,2.5px) rotate(2.5deg);
      -ms-transform: translate(0,2.5px) rotate(2.5deg);
      -o-transform: translate(0,2.5px) rotate(2.5deg);
      transform: translate(0,2.5px) rotate(2.5deg)
    }

    58% {
      -webkit-transform: translate(0,.5px) rotate(2.5deg);
      -moz-transform: translate(0,.5px) rotate(2.5deg);
      -ms-transform: translate(0,.5px) rotate(2.5deg);
      -o-transform: translate(0,.5px) rotate(2.5deg);
      transform: translate(0,.5px) rotate(2.5deg)
    }

    84% {
      -webkit-transform: translate(0,1.5px) rotate(2.5deg);
      -moz-transform: translate(0,1.5px) rotate(2.5deg);
      -ms-transform: translate(0,1.5px) rotate(2.5deg);
      -o-transform: translate(0,1.5px) rotate(2.5deg);
      transform: translate(0,1.5px) rotate(2.5deg)
    }

    90% {
      -webkit-transform: translate(0,2.5px) rotate(-.5deg);
      -moz-transform: translate(0,2.5px) rotate(-.5deg);
      -ms-transform: translate(0,2.5px) rotate(-.5deg);
      -o-transform: translate(0,2.5px) rotate(-.5deg);
      transform: translate(0,2.5px) rotate(-.5deg)
    }

    92% {
      -webkit-transform: translate(0,.5px) rotate(-.5deg);
      -moz-transform: translate(0,.5px) rotate(-.5deg);
      -ms-transform: translate(0,.5px) rotate(-.5deg);
      -o-transform: translate(0,.5px) rotate(-.5deg);
      transform: translate(0,.5px) rotate(-.5deg)
    }

    94% {
      -webkit-transform: translate(0,2.5px) rotate(.5deg);
      -moz-transform: translate(0,2.5px) rotate(.5deg);
      -ms-transform: translate(0,2.5px) rotate(.5deg);
      -o-transform: translate(0,2.5px) rotate(.5deg);
      transform: translate(0,2.5px) rotate(.5deg)
    }

    0%,100% {
      -webkit-transform: translate(0,0) rotate(0);
      -moz-transform: translate(0,0) rotate(0);
      -ms-transform: translate(0,0) rotate(0);
      -o-transform: translate(0,0) rotate(0);
      transform: translate(0,0) rotate(0)
    }
  }

  @-o-keyframes my-face {
    2%,24%,80% {
      -webkit-transform: translate(0,1.5px) rotate(1.5deg);
      -moz-transform: translate(0,1.5px) rotate(1.5deg);
      -ms-transform: translate(0,1.5px) rotate(1.5deg);
      -o-transform: translate(0,1.5px) rotate(1.5deg);
      transform: translate(0,1.5px) rotate(1.5deg)
    }

    4%,68%,98% {
      -webkit-transform: translate(0,-1.5px) rotate(-.5deg);
      -moz-transform: translate(0,-1.5px) rotate(-.5deg);
      -ms-transform: translate(0,-1.5px) rotate(-.5deg);
      -o-transform: translate(0,-1.5px) rotate(-.5deg);
      transform: translate(0,-1.5px) rotate(-.5deg)
    }

    38%,6% {
      -webkit-transform: translate(0,1.5px) rotate(-1.5deg);
      -moz-transform: translate(0,1.5px) rotate(-1.5deg);
      -ms-transform: translate(0,1.5px) rotate(-1.5deg);
      -o-transform: translate(0,1.5px) rotate(-1.5deg);
      transform: translate(0,1.5px) rotate(-1.5deg)
    }

    8%,86% {
      -webkit-transform: translate(0,-1.5px) rotate(-1.5deg);
      -moz-transform: translate(0,-1.5px) rotate(-1.5deg);
      -ms-transform: translate(0,-1.5px) rotate(-1.5deg);
      -o-transform: translate(0,-1.5px) rotate(-1.5deg);
      transform: translate(0,-1.5px) rotate(-1.5deg)
    }

    10%,72% {
      -webkit-transform: translate(0,2.5px) rotate(1.5deg);
      -moz-transform: translate(0,2.5px) rotate(1.5deg);
      -ms-transform: translate(0,2.5px) rotate(1.5deg);
      -o-transform: translate(0,2.5px) rotate(1.5deg);
      transform: translate(0,2.5px) rotate(1.5deg)
    }

    12%,64%,78%,96% {
      -webkit-transform: translate(0,-.5px) rotate(1.5deg);
      -moz-transform: translate(0,-.5px) rotate(1.5deg);
      -ms-transform: translate(0,-.5px) rotate(1.5deg);
      -o-transform: translate(0,-.5px) rotate(1.5deg);
      transform: translate(0,-.5px) rotate(1.5deg)
    }

    14%,54% {
      -webkit-transform: translate(0,-1.5px) rotate(1.5deg);
      -moz-transform: translate(0,-1.5px) rotate(1.5deg);
      -ms-transform: translate(0,-1.5px) rotate(1.5deg);
      -o-transform: translate(0,-1.5px) rotate(1.5deg);
      transform: translate(0,-1.5px) rotate(1.5deg)
    }

    16% {
      -webkit-transform: translate(0,-.5px) rotate(-1.5deg);
      -moz-transform: translate(0,-.5px) rotate(-1.5deg);
      -ms-transform: translate(0,-.5px) rotate(-1.5deg);
      -o-transform: translate(0,-.5px) rotate(-1.5deg);
      transform: translate(0,-.5px) rotate(-1.5deg)
    }

    18%,22% {
      -webkit-transform: translate(0,.5px) rotate(-1.5deg);
      -moz-transform: translate(0,.5px) rotate(-1.5deg);
      -ms-transform: translate(0,.5px) rotate(-1.5deg);
      -o-transform: translate(0,.5px) rotate(-1.5deg);
      transform: translate(0,.5px) rotate(-1.5deg)
    }

    20%,36%,46% {
      -webkit-transform: translate(0,-1.5px) rotate(2.5deg);
      -moz-transform: translate(0,-1.5px) rotate(2.5deg);
      -ms-transform: translate(0,-1.5px) rotate(2.5deg);
      -o-transform: translate(0,-1.5px) rotate(2.5deg);
      transform: translate(0,-1.5px) rotate(2.5deg)
    }

    26%,50% {
      -webkit-transform: translate(0,.5px) rotate(.5deg);
      -moz-transform: translate(0,.5px) rotate(.5deg);
      -ms-transform: translate(0,.5px) rotate(.5deg);
      -o-transform: translate(0,.5px) rotate(.5deg);
      transform: translate(0,.5px) rotate(.5deg)
    }

    28% {
      -webkit-transform: translate(0,.5px) rotate(1.5deg);
      -moz-transform: translate(0,.5px) rotate(1.5deg);
      -ms-transform: translate(0,.5px) rotate(1.5deg);
      -o-transform: translate(0,.5px) rotate(1.5deg);
      transform: translate(0,.5px) rotate(1.5deg)
    }

    30%,40%,62%,76%,88% {
      -webkit-transform: translate(0,-.5px) rotate(2.5deg);
      -moz-transform: translate(0,-.5px) rotate(2.5deg);
      -ms-transform: translate(0,-.5px) rotate(2.5deg);
      -o-transform: translate(0,-.5px) rotate(2.5deg);
      transform: translate(0,-.5px) rotate(2.5deg)
    }

    32%,34%,66% {
      -webkit-transform: translate(0,1.5px) rotate(-.5deg);
      -moz-transform: translate(0,1.5px) rotate(-.5deg);
      -ms-transform: translate(0,1.5px) rotate(-.5deg);
      -o-transform: translate(0,1.5px) rotate(-.5deg);
      transform: translate(0,1.5px) rotate(-.5deg)
    }

    42% {
      -webkit-transform: translate(0,2.5px) rotate(-1.5deg);
      -moz-transform: translate(0,2.5px) rotate(-1.5deg);
      -ms-transform: translate(0,2.5px) rotate(-1.5deg);
      -o-transform: translate(0,2.5px) rotate(-1.5deg);
      transform: translate(0,2.5px) rotate(-1.5deg)
    }

    44%,70% {
      -webkit-transform: translate(0,1.5px) rotate(.5deg);
      -moz-transform: translate(0,1.5px) rotate(.5deg);
      -ms-transform: translate(0,1.5px) rotate(.5deg);
      -o-transform: translate(0,1.5px) rotate(.5deg);
      transform: translate(0,1.5px) rotate(.5deg)
    }

    48%,74%,82% {
      -webkit-transform: translate(0,-.5px) rotate(.5deg);
      -moz-transform: translate(0,-.5px) rotate(.5deg);
      -ms-transform: translate(0,-.5px) rotate(.5deg);
      -o-transform: translate(0,-.5px) rotate(.5deg);
      transform: translate(0,-.5px) rotate(.5deg)
    }

    52%,56%,60% {
      -webkit-transform: translate(0,2.5px) rotate(2.5deg);
      -moz-transform: translate(0,2.5px) rotate(2.5deg);
      -ms-transform: translate(0,2.5px) rotate(2.5deg);
      -o-transform: translate(0,2.5px) rotate(2.5deg);
      transform: translate(0,2.5px) rotate(2.5deg)
    }

    58% {
      -webkit-transform: translate(0,.5px) rotate(2.5deg);
      -moz-transform: translate(0,.5px) rotate(2.5deg);
      -ms-transform: translate(0,.5px) rotate(2.5deg);
      -o-transform: translate(0,.5px) rotate(2.5deg);
      transform: translate(0,.5px) rotate(2.5deg)
    }

    84% {
      -webkit-transform: translate(0,1.5px) rotate(2.5deg);
      -moz-transform: translate(0,1.5px) rotate(2.5deg);
      -ms-transform: translate(0,1.5px) rotate(2.5deg);
      -o-transform: translate(0,1.5px) rotate(2.5deg);
      transform: translate(0,1.5px) rotate(2.5deg)
    }

    90% {
      -webkit-transform: translate(0,2.5px) rotate(-.5deg);
      -moz-transform: translate(0,2.5px) rotate(-.5deg);
      -ms-transform: translate(0,2.5px) rotate(-.5deg);
      -o-transform: translate(0,2.5px) rotate(-.5deg);
      transform: translate(0,2.5px) rotate(-.5deg)
    }

    92% {
      -webkit-transform: translate(0,.5px) rotate(-.5deg);
      -moz-transform: translate(0,.5px) rotate(-.5deg);
      -ms-transform: translate(0,.5px) rotate(-.5deg);
      -o-transform: translate(0,.5px) rotate(-.5deg);
      transform: translate(0,.5px) rotate(-.5deg)
    }

    94% {
      -webkit-transform: translate(0,2.5px) rotate(.5deg);
      -moz-transform: translate(0,2.5px) rotate(.5deg);
      -ms-transform: translate(0,2.5px) rotate(.5deg);
      -o-transform: translate(0,2.5px) rotate(.5deg);
      transform: translate(0,2.5px) rotate(.5deg)
    }

    0%,100% {
      -webkit-transform: translate(0,0) rotate(0);
      -moz-transform: translate(0,0) rotate(0);
      -ms-transform: translate(0,0) rotate(0);
      -o-transform: translate(0,0) rotate(0);
      transform: translate(0,0) rotate(0)
    }
  }

  @keyframes my-face {
    2%,24%,80% {
      -webkit-transform: translate(0,1.5px) rotate(1.5deg);
      -moz-transform: translate(0,1.5px) rotate(1.5deg);
      -ms-transform: translate(0,1.5px) rotate(1.5deg);
      -o-transform: translate(0,1.5px) rotate(1.5deg);
      transform: translate(0,1.5px) rotate(1.5deg)
    }

    4%,68%,98% {
      -webkit-transform: translate(0,-1.5px) rotate(-.5deg);
      -moz-transform: translate(0,-1.5px) rotate(-.5deg);
      -ms-transform: translate(0,-1.5px) rotate(-.5deg);
      -o-transform: translate(0,-1.5px) rotate(-.5deg);
      transform: translate(0,-1.5px) rotate(-.5deg)
    }

    38%,6% {
      -webkit-transform: translate(0,1.5px) rotate(-1.5deg);
      -moz-transform: translate(0,1.5px) rotate(-1.5deg);
      -ms-transform: translate(0,1.5px) rotate(-1.5deg);
      -o-transform: translate(0,1.5px) rotate(-1.5deg);
      transform: translate(0,1.5px) rotate(-1.5deg)
    }

    8%,86% {
      -webkit-transform: translate(0,-1.5px) rotate(-1.5deg);
      -moz-transform: translate(0,-1.5px) rotate(-1.5deg);
      -ms-transform: translate(0,-1.5px) rotate(-1.5deg);
      -o-transform: translate(0,-1.5px) rotate(-1.5deg);
      transform: translate(0,-1.5px) rotate(-1.5deg)
    }

    10%,72% {
      -webkit-transform: translate(0,2.5px) rotate(1.5deg);
      -moz-transform: translate(0,2.5px) rotate(1.5deg);
      -ms-transform: translate(0,2.5px) rotate(1.5deg);
      -o-transform: translate(0,2.5px) rotate(1.5deg);
      transform: translate(0,2.5px) rotate(1.5deg)
    }

    12%,64%,78%,96% {
      -webkit-transform: translate(0,-.5px) rotate(1.5deg);
      -moz-transform: translate(0,-.5px) rotate(1.5deg);
      -ms-transform: translate(0,-.5px) rotate(1.5deg);
      -o-transform: translate(0,-.5px) rotate(1.5deg);
      transform: translate(0,-.5px) rotate(1.5deg)
    }

    14%,54% {
      -webkit-transform: translate(0,-1.5px) rotate(1.5deg);
      -moz-transform: translate(0,-1.5px) rotate(1.5deg);
      -ms-transform: translate(0,-1.5px) rotate(1.5deg);
      -o-transform: translate(0,-1.5px) rotate(1.5deg);
      transform: translate(0,-1.5px) rotate(1.5deg)
    }

    16% {
      -webkit-transform: translate(0,-.5px) rotate(-1.5deg);
      -moz-transform: translate(0,-.5px) rotate(-1.5deg);
      -ms-transform: translate(0,-.5px) rotate(-1.5deg);
      -o-transform: translate(0,-.5px) rotate(-1.5deg);
      transform: translate(0,-.5px) rotate(-1.5deg)
    }

    18%,22% {
      -webkit-transform: translate(0,.5px) rotate(-1.5deg);
      -moz-transform: translate(0,.5px) rotate(-1.5deg);
      -ms-transform: translate(0,.5px) rotate(-1.5deg);
      -o-transform: translate(0,.5px) rotate(-1.5deg);
      transform: translate(0,.5px) rotate(-1.5deg)
    }

    20%,36%,46% {
      -webkit-transform: translate(0,-1.5px) rotate(2.5deg);
      -moz-transform: translate(0,-1.5px) rotate(2.5deg);
      -ms-transform: translate(0,-1.5px) rotate(2.5deg);
      -o-transform: translate(0,-1.5px) rotate(2.5deg);
      transform: translate(0,-1.5px) rotate(2.5deg)
    }

    26%,50% {
      -webkit-transform: translate(0,.5px) rotate(.5deg);
      -moz-transform: translate(0,.5px) rotate(.5deg);
      -ms-transform: translate(0,.5px) rotate(.5deg);
      -o-transform: translate(0,.5px) rotate(.5deg);
      transform: translate(0,.5px) rotate(.5deg)
    }

    28% {
      -webkit-transform: translate(0,.5px) rotate(1.5deg);
      -moz-transform: translate(0,.5px) rotate(1.5deg);
      -ms-transform: translate(0,.5px) rotate(1.5deg);
      -o-transform: translate(0,.5px) rotate(1.5deg);
      transform: translate(0,.5px) rotate(1.5deg)
    }

    30%,40%,62%,76%,88% {
      -webkit-transform: translate(0,-.5px) rotate(2.5deg);
      -moz-transform: translate(0,-.5px) rotate(2.5deg);
      -ms-transform: translate(0,-.5px) rotate(2.5deg);
      -o-transform: translate(0,-.5px) rotate(2.5deg);
      transform: translate(0,-.5px) rotate(2.5deg)
    }

    32%,34%,66% {
      -webkit-transform: translate(0,1.5px) rotate(-.5deg);
      -moz-transform: translate(0,1.5px) rotate(-.5deg);
      -ms-transform: translate(0,1.5px) rotate(-.5deg);
      -o-transform: translate(0,1.5px) rotate(-.5deg);
      transform: translate(0,1.5px) rotate(-.5deg)
    }

    42% {
      -webkit-transform: translate(0,2.5px) rotate(-1.5deg);
      -moz-transform: translate(0,2.5px) rotate(-1.5deg);
      -ms-transform: translate(0,2.5px) rotate(-1.5deg);
      -o-transform: translate(0,2.5px) rotate(-1.5deg);
      transform: translate(0,2.5px) rotate(-1.5deg)
    }

    44%,70% {
      -webkit-transform: translate(0,1.5px) rotate(.5deg);
      -moz-transform: translate(0,1.5px) rotate(.5deg);
      -ms-transform: translate(0,1.5px) rotate(.5deg);
      -o-transform: translate(0,1.5px) rotate(.5deg);
      transform: translate(0,1.5px) rotate(.5deg)
    }

    48%,74%,82% {
      -webkit-transform: translate(0,-.5px) rotate(.5deg);
      -moz-transform: translate(0,-.5px) rotate(.5deg);
      -ms-transform: translate(0,-.5px) rotate(.5deg);
      -o-transform: translate(0,-.5px) rotate(.5deg);
      transform: translate(0,-.5px) rotate(.5deg)
    }

    52%,56%,60% {
      -webkit-transform: translate(0,2.5px) rotate(2.5deg);
      -moz-transform: translate(0,2.5px) rotate(2.5deg);
      -ms-transform: translate(0,2.5px) rotate(2.5deg);
      -o-transform: translate(0,2.5px) rotate(2.5deg);
      transform: translate(0,2.5px) rotate(2.5deg)
    }

    58% {
      -webkit-transform: translate(0,.5px) rotate(2.5deg);
      -moz-transform: translate(0,.5px) rotate(2.5deg);
      -ms-transform: translate(0,.5px) rotate(2.5deg);
      -o-transform: translate(0,.5px) rotate(2.5deg);
      transform: translate(0,.5px) rotate(2.5deg)
    }

    84% {
      -webkit-transform: translate(0,1.5px) rotate(2.5deg);
      -moz-transform: translate(0,1.5px) rotate(2.5deg);
      -ms-transform: translate(0,1.5px) rotate(2.5deg);
      -o-transform: translate(0,1.5px) rotate(2.5deg);
      transform: translate(0,1.5px) rotate(2.5deg)
    }

    90% {
      -webkit-transform: translate(0,2.5px) rotate(-.5deg);
      -moz-transform: translate(0,2.5px) rotate(-.5deg);
      -ms-transform: translate(0,2.5px) rotate(-.5deg);
      -o-transform: translate(0,2.5px) rotate(-.5deg);
      transform: translate(0,2.5px) rotate(-.5deg)
    }

    92% {
      -webkit-transform: translate(0,.5px) rotate(-.5deg);
      -moz-transform: translate(0,.5px) rotate(-.5deg);
      -ms-transform: translate(0,.5px) rotate(-.5deg);
      -o-transform: translate(0,.5px) rotate(-.5deg);
      transform: translate(0,.5px) rotate(-.5deg)
    }

    94% {
      -webkit-transform: translate(0,2.5px) rotate(.5deg);
      -moz-transform: translate(0,2.5px) rotate(.5deg);
      -ms-transform: translate(0,2.5px) rotate(.5deg);
      -o-transform: translate(0,2.5px) rotate(.5deg);
      transform: translate(0,2.5px) rotate(.5deg)
    }

    0%,100% {
      -webkit-transform: translate(0,0) rotate(0);
      -moz-transform: translate(0,0) rotate(0);
      -ms-transform: translate(0,0) rotate(0);
      -o-transform: translate(0,0) rotate(0);
      transform: translate(0,0) rotate(0)
    }
  }
  @keyframes common-animation {
    2% {
      transform: translate(0.5px, -1.5px) rotate(-0.5deg);
    }

    4% {
      transform: translate(0.5px, 1.5px) rotate(1.5deg);
    }

    6% {
      transform: translate(1.5px, 1.5px) rotate(1.5deg);
    }

    8% {
      transform: translate(2.5px, 1.5px) rotate(0.5deg);
    }

    10% {
      transform: translate(0.5px, 2.5px) rotate(0.5deg);
    }

    12% {
      transform: translate(1.5px, 1.5px) rotate(0.5deg);
    }

    14% {
      transform: translate(0.5px, 0.5px) rotate(0.5deg);
    }

    16% {
      transform: translate(-1.5px, -0.5px) rotate(1.5deg);
    }

    18% {
      transform: translate(0.5px, 0.5px) rotate(1.5deg);
    }

    20% {
      transform: translate(2.5px, 2.5px) rotate(1.5deg);
    }

    22% {
      transform: translate(0.5px, -1.5px) rotate(1.5deg);
    }

    24% {
      transform: translate(-1.5px, 1.5px) rotate(-0.5deg);
    }

    26% {
      transform: translate(1.5px, 0.5px) rotate(1.5deg);
    }

    28% {
      transform: translate(-0.5px, -0.5px) rotate(-0.5deg);
    }

    30% {
      transform: translate(1.5px, -0.5px) rotate(-0.5deg);
    }

    32% {
      transform: translate(2.5px, -1.5px) rotate(1.5deg);
    }

    34% {
      transform: translate(2.5px, 2.5px) rotate(-0.5deg);
    }

    36% {
      transform: translate(0.5px, -1.5px) rotate(0.5deg);
    }

    38% {
      transform: translate(2.5px, -0.5px) rotate(-0.5deg);
    }

    40% {
      transform: translate(-0.5px, 2.5px) rotate(0.5deg);
    }

    42% {
      transform: translate(-1.5px, 2.5px) rotate(0.5deg);
    }
    44% {
      transform: translate(-1.5px, 1.5px) rotate(0.5deg);
    }

    46% {
      transform: translate(1.5px, -0.5px) rotate(-0.5deg);
    }

    48% {
      transform: translate(2.5px, -0.5px) rotate(0.5deg);
    }

    50% {
      transform: translate(-1.5px, 1.5px) rotate(0.5deg);
    }

    52% {
      transform: translate(-0.5px, 1.5px) rotate(0.5deg);
    }

    54% {
      transform: translate(-1.5px, 1.5px) rotate(0.5deg);
    }

    56% {
      transform: translate(0.5px, 2.5px) rotate(1.5deg);
    }

    58% {
      transform: translate(2.5px, 2.5px) rotate(0.5deg);
    }

    60% {
      transform: translate(2.5px, -1.5px) rotate(1.5deg);
    }

    62% {
      transform: translate(-1.5px, 0.5px) rotate(1.5deg);
    }

    64% {
      transform: translate(-1.5px, 1.5px) rotate(1.5deg);
    }

    66% {
      transform: translate(0.5px, 2.5px) rotate(1.5deg);
    }

    68% {
      transform: translate(2.5px, -1.5px) rotate(1.5deg);
    }

    70% {
      transform: translate(2.5px, 2.5px) rotate(0.5deg);
    }

    72% {
      transform: translate(-0.5px, -1.5px) rotate(1.5deg);
    }

    74% {
      transform: translate(-1.5px, 2.5px) rotate(1.5deg);
    }

    76% {
      transform: translate(-1.5px, 2.5px) rotate(1.5deg);
    }

    78% {
      transform: translate(-1.5px, 2.5px) rotate(0.5deg);
    }

    80% {
      transform: translate(-1.5px, 0.5px) rotate(-0.5deg);
    }

    82% {
      transform: translate(-1.5px, 0.5px) rotate(-0.5deg);
    }

    84% {
      transform: translate(-0.5px, 0.5px) rotate(1.5deg);
    }

    86% {
      transform: translate(2.5px, 1.5px) rotate(0.5deg);
    }

    88% {
      transform: translate(-1.5px, 0.5px) rotate(1.5deg);
    }

    90% {
      transform: translate(-1.5px, -0.5px) rotate(-0.5deg);
    }

    92% {
      transform: translate(-1.5px, -1.5px) rotate(1.5deg);
    }

    94% {
      transform: translate(0.5px, 0.5px) rotate(-0.5deg);
    }

    96% {
      transform: translate(2.5px, -0.5px) rotate(-0.5deg);
    }

    98% {
      transform: translate(-1.5px, -1.5px) rotate(-0.5deg);
    }

    0%,
    100% {
      transform: translate(0, 0) rotate(0);
    }
  }

  @keyframes elasticBound {
    0% {
      transform: scale(0);
    }
    55% {
      transform: scale(1);
    }
    70% {
      transform: scale(.98);
    }
    100% {
      transform: scale(1);
    }
  }


  #nprogress .bar {
    height: 3px !important; //进度条高度
    background: rgba(0, 255, 217, 0.66) !important; //自定义颜色
  }

  .header-active{
    color: orangered !important;
  }
  /* 浏览器滚动条样式 */

  /* width */
  ::-webkit-scrollbar {
    width: .5rem;
    height: .5rem;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: .3125rem;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 1.25rem;
    background-clip: padding-box;
    background-color: #ed6ea0;
    background-image: linear-gradient(45deg,rgba(255, 230, 250, 1) 25%,transparent 0,transparent 50%,rgba(255,230,250,1) 0,rgba(255,230,250,1) 75%,transparent 0,transparent)
  }

</style>
