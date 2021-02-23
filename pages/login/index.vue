<template>
  <div>
    <div id="large-header" class="login-main-Bg-box">
      <canvas id="demo-canvas"></canvas>
      <div class="login-inner-box">
        <div class="login-action-box">

          <div class="login-page-sign">
            <span>Czy</span>

            <a href="/">blog</a>
            |
            <span>Login</span>
          </div>

          <div class="msg-input-data-box">
            <div>
              <label for="username">用户名/邮箱:</label>
              <input v-model="blogUser.userName" style="float: right" class="input-comment-style" id="username">
            </div>
            <div>
              <label for="password">密码:</label>
              <input v-model="blogUser.password" style="float: right" type="password" class="input-comment-style"
                     id="password">
            </div>
            <div class="temp-captcha-span">
              <span>C a p t c h a:</span><img class="captcha-img-show" :src="captchaUrl" @click="flushCaptchaKey">
            </div>
            <div>
              <label for="captcha">验证码:</label>
              <input @keydown.enter="doLogin" v-model="loginInfo.captcha" id="captcha" style="float: right" type="text"
                     class="input-comment-style">
            </div>
          </div>
          <div class="submit-submit-action-box">
            <button @click="doLogin" class="login-btn mdui-btn mdui-btn-block mdui-color-theme-accent mdui-ripple">
              Submit
            </button>
          </div>

          <div class="submit-action-box">
            <a href="/register" class="register-btn mdui-btn mdui-ripple mdui-hoverable">注册</a>
            <a href="/forget" class="forget-btn mdui-btn mdui-ripple mdui-hoverable">忘记密码</a>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ani from '@/plugins/gridBgAnimation';
  import {hex_md5} from "../../utils/md5";
  import userApi from "../../api/userApi";

  export default {
    head() {
      return {
        title: '陈展云的博客-登录',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: '陈展云的博客-登录'
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: '陈展云,博客,java,spring,spring-boot,开发,毕业设计,博客系统,程序员,docker,linux,电脑硬件,电脑软件,kubernetes,vue,nuxtjs,vuejs,js,javascript,html,css,less,rabbitmq,源码'
          }
        ]
      }
    },
    data() {
      return {
        captchaUrl: require('../../assets/images/staticCaptcha.png'),
        random: '',
        blogUser: {
          userName: '',
          password: '',
        },
        loginInfo: {
          captcha: '',
          from: '',
          captcha_key: ''
        },
        captchaPath: '',
        successLoginPath: ''
      }
    },
    methods: {
      flushCaptchaKey() {
        let captchaImage = document.querySelector('.captcha-img-show');
        captchaImage.style.animation = 'keydowncaptchaimage .7s';
        setTimeout(() => {
          captchaImage.style.animation = 'none';
        }, 700)

        this.captchaUrl = this.baseUrl + `/user/captcha?captcha_key=${new Date().getTime()}&random=${this.random === '' ? '' : this.random}`;
        this.loginInfo.captcha_key = this.random;
      },
      doLogin() {
        if (this.blogUser.userName === '') {
          this.toastE('(用户名/邮箱) 不可以为空');
          return;
        }
        if (this.blogUser.password === '') {
          this.toastE('密码不可以为空');
          return;
        }
        if (this.loginInfo.captcha === '') {
          this.toastE('验证码不可以为空');
          return;
        }
        let md5PasswordUser = {userName:'', password: ''}

        md5PasswordUser.userName = this.blogUser.userName;
        md5PasswordUser.password = hex_md5(this.blogUser.password);
        console.log(md5PasswordUser);
        userApi.doLogin(this.loginInfo.captcha, this.loginInfo.captcha_key, "p_", md5PasswordUser)
          .then(res => {
            console.log(res.data);
            if (res.data.code === 20000) {

              console.log('到这里应该是要跳转页面了。。。')
              // let redirectPath = this.$route.query.redirect === '' ? this.$route.query.redirect : '/';
              // console.log(redirectPath);
              let path = this.successLoginPath.substring(this.successLoginPath.indexOf(':3000') + 5);
              console.log(path+"---------  jumproutepath");
              if (path === '') {
                location.href = '/';
              } else {

                window.location.href = path;
              }
            }
            this.toastE(res.data.message);
            this.flushCaptchaKey()

          });
      },
      toastE(msg) {
        this.$vs.notification({
          progress: 'auto',
          color: 'rgba(255, 70, 99, 0.8)',
          position: 'top-center',
          // duration: 1000,
          sticky: true,
          flat: true,
          clickClose: true,
          width: 'auto',
          title: '登录页面提示:',
          text: `${msg}`
        })
        this.flushCaptchaKey();
      }
    },
    mounted() {
      let redirectPath = location.href.indexOf('?redirect=') === -1 ?
        '/' : location.href.substring(location.href.indexOf('?redirect=') + 10);
      console.log(redirectPath+' ========= 登录成功之后跳转的路径');
      this.successLoginPath = decodeURIComponent(redirectPath);
      console.log(this.successLoginPath+' ========= this.successLoginPath');




      this.captchaUrl = this.baseUrl + `/user/captcha?captcha_key=${(this.random = new Date().getTime())}`;
      this.loginInfo.captcha_key = this.random;


      setTimeout(ani, 300);
    }
  }
</script>

<style lang="less">
  @font-face {
    font-family: "titlefont";
    src: url('../../assets/ttl/titlefont.ttf');
    font-weight: normal;
    font-style: normal;
  }


  .submit-submit-action-box {
    font-family: titlefont, 'pao', 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    color: #000;
    height: 40px;
    width: 300px;
    margin: 10px auto;

    .login-btn {
      height: 40px;
      background: lightgreen;
      font-size: 25px;
      border-radius: 12px;
    }
  }


  .input-comment-style {
    width: 170px;
    height: 40px;
    border-radius: 12px;
    color: coral;
    border: none;

    &:focus {
      box-shadow: 4px 4px 4px #282727;
      transition: .7s all;
    }
  }

  .captcha-img-show {
    height: 40px;
    width: 170PX;
    box-shadow: 7px 7px 5px #282727;

  }

  @keyframes keydowncaptchaimage {
    0%, 100% {
      box-shadow: 7px 7px 5px #282727;
    }
    50% {
      box-shadow: unset;
    }
  }

  .submit-action-box {
    height: 40px;
    width: 300px;
    margin: 0 auto;
    clear: both;

    a {
      background: rgba(255, 70, 99, 0.8);
      color: white;
      border-radius: 10px;

      &:hover {
        background: orange;
        transition: .4s background-color;
      }
    }

    .register-btn {
      display: block;
      float: left;
    }

    .forget-btn {
      display: block;
      float: right;
    }
  }

  .msg-input-data-box {
    div {
      margin: 10px auto;
      height: 40px;
      width: 300px;
      line-height: 40px;
      clear: both;
      background: rgba(135, 206, 235, 0.57);
      border-radius: 12px;
    }

    label {
      font-size: 15px;
      font-weight: 300;

      padding-left: 14px;
    }
  }

  .temp-captcha-span {
    width: 286px !important;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    padding-left: 14px;
    background: none !important;
    font-size: 25px;
    font-family: 'titlefont', 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif !important;
    color: orangered;

    .captcha-img-show {
      border-radius: 12px;
      display: block;
      float: right;
    }
  }


  .login-page-sign {
    font-family: titlefont, 'pao', 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    height: 100px;
    margin: 10px auto;
    line-height: 100px;
    font-size: 60px;
    text-align: center;
    color: rgba(255, 70, 99, 0.8);

    a {
      text-decoration: none;

      &:visited {
        color: rgba(255, 70, 99, 0.8);
      }

      &:link {
        color: rgba(255, 70, 99, 0.8);
      }
    }

    &::selection {
      color: wheat;
    }
  }

  .login-action-box {
    height: 500px;
    width: 700px;
    background: rgba(255, 255, 255, .6);
    border-radius: 20px;
    min-height: 200px;
    position: absolute;
    left: calc(50vw - 350px);
    top: calc(50vh - 250px);
    box-shadow: 0 0 13px #8c8c8c;
  }

  @media screen and (max-width: 660px) {
    .login-action-box {
      height: 500px;
      width: 500px;
      left: calc(50vw - 250px);
      top: calc(50vh - 150px);
    }
  }

  .login-inner-box {
    width: 100%;
    background: transparent;
    position: relative;
  }

  .login-main-Bg-box {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: url("../../assets/images/guestBg.jpg") no-repeat fixed;
    background-size: cover;
    line-height: 100%;
  }

  #demo-canvas {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
