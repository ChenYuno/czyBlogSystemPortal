<template>
    <div class="register-total-box">
      <div class="register-bg-box"></div>

      <div class="register-main-box">
        <div class="register-inner-box">

          <div class="register-action-box">
            <div class="register-page-sign">
              <span>Czy</span>

              <a href="/">blog</a>
              |
              <span>register</span>
            </div>

            <div class="register-msg-input-data-box">
              <div class="register-msg-input-data-item register-relative-div">
                <label for="username">用户名:</label>
                <input placeholder="独一无二的称呼" @blur="verifyUserName" v-model="userMsgData.userName" style="float: right" class="input-comment-style register-input-hover" id="username">
                <div class="register-exist-tips verifyUserName">hahaha</div>
                <div class="register-exist-error-icon verifyUserName-error-icon"><img src="../../assets/images/error.svg"> </img></div>
                <div class="register-exist-success-icon verifyUserName-success-icon"><img src="../../assets/images/success.svg"> </img></div>
              </div>
              <div class="register-msg-input-data-item register-relative-div">
                <label for="password">密码:</label>
                <input placeholder="请输入暗号" @blur="verifyPassword" v-model="originalPassword" style="float: right" type="password" class="input-comment-style register-input-hover"
                       id="password">
                <div class="register-exist-tips verifyPassword">hahaha</div>
                <div class="register-exist-error-icon verifyPassword-error-icon"><img src="../../assets/images/error.svg"> </img></div>
              </div>
              <div class="register-msg-input-data-item register-relative-div">
                <label for="email">邮箱:</label>
                <input placeholder="请输入邮箱" @blur="verifyEmail" id="email" v-model="userMsgData.email" style="float: right" type="text" class="input-comment-style register-input-hover">
                <vs-button class="register-get-email-verify-code-btn"
                  color="#FFB6C0"
                  border
                  flat
                  @click="sendEmail"
                >
                  {{emailVerifyCodeCount}}
                </vs-button>
                <div class="register-exist-tips verifyEmail">hahaha</div>
                <div class="register-exist-error-icon verifyEmail-error-icon"><img src="../../assets/images/error.svg"> </img></div>
                <div class="register-exist-success-icon verifyEmail-success-icon"><img src="../../assets/images/success.svg"> </img></div>
              </div>

              <div class="register-msg-input-data-item register-relative-div">
                <label for="emailCode">邮箱验证码:</label>
                <input placeholder="邮箱验证码" @blur="verifyEmailCode" v-model="emailCode" style="float: right" class="input-comment-style register-input-hover" id="emailCode">
                <div class="register-exist-tips verifyEmailCode">hahaha</div>
                <div class="register-exist-error-icon verifyEmailCode-error-icon"><img src="../../assets/images/error.svg"> </img></div>
              </div>

              <div class="register-temp-captcha-span">
                <span>C a p t c h a:</span><img class="captcha-img-show" :src="captchaPath" @click="flushCaptchaCode">
              </div>
              <div class="register-msg-input-data-item register-relative-div">
                <label for="captcha">验证码:</label>
                <input placeholder="证明你是人类" @blur="verifyCaptcha" @keydown.enter="doRegister" v-model="captchaCode" id="captcha" style="float: right" type="text"
                       class="input-comment-style register-input-hover">
                <div class="register-exist-tips verifyCaptcha">hahaha</div>
                <div class="register-exist-error-icon verifyCaptcha-error-icon"><img src="../../assets/images/error.svg"> </img></div>
              </div>
            </div>
            <div class="register-submit-action-box">
              <button @click="doRegister" class="login-btn mdui-btn mdui-btn-block mdui-color-theme-accent mdui-ripple">
                register
              </button>
            </div>

          </div>

        </div>
      </div>



      <div class="register-footer">
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
  import userApi from "../../api/userApi";
  import {hex_md5} from "../../utils/md5";
    export default {
      head() {
        return {
          title: '陈展云的博客-注册',
          meta: [
            {
              hid: 'description',
              name: 'description',
              content: '陈展云的博客-注册'
            },
            {
              hid: 'keywords',
              name: 'keywords',
              content: '陈展云,博客,java,spring,spring-boot,开发,毕业设计,博客系统,程序员,docker,linux,电脑硬件,电脑软件,kubernetes,vue,nuxtjs,vuejs,js,javascript,html,css,less,rabbitmq,源码'
            }
          ]
        }
      },
      data(){
        return{
          random: '',
          captchaPath: require('../../assets/images/staticCaptcha.png'),
          originalPassword: '',
          emailCode: '',
          captchaCode: '',
          captchaKey: '',
          userMsgData: {
            userName: '',
            password: '',
            email: '',
          },
          emailVerifyCodeCount: '获取验证码'
        }
      },
      methods:{
        sendEmail() {
          if (this.userMsgData.email === '') {
            this.verifyEmail();
            return;
          }
          let reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
          if (!reg.test(this.userMsgData.email)) {
            this.registTipsHappen('verifyEmail', '格式有误');
            let errorIcon = document.querySelector(`.verifyEmail-error-icon`);
            errorIcon.style['opacity'] = '1';
            return;
          }else if (reg.test(this.userMsgData.email)) {
            let errorIcon = document.querySelector(`.verifyEmail-error-icon`);
            errorIcon.style['opacity'] = '0';
          }
          userApi.sendEmailVerifyCode(this.captchaCode, this.random, this.userMsgData.email, 'register')
          .then(res=>{
            if (res.data.code === 20000) {
              let successIconShow = document.querySelector('.verifyEmail-success-icon');
              successIconShow.style['opacity'] = '1';
              setTimeout(() => {
                successIconShow.style['opacity'] = '0';
              }, 10000);
              this.emailReciprocalStart();
            }else{
              this.toast(res.data.message);
            }
          });
        },
        emailReciprocalStart() {
          let countBtn = document.querySelector('.register-get-email-verify-code-btn');
          countBtn.setAttribute('disabled', 'disabled');
          this.emailVerifyCodeCount = 60;
          let startEmailReciprocal = setInterval(() => {
            this.emailVerifyCodeCount--;
            if (this.emailVerifyCodeCount <= 0) {
              countBtn.removeAttribute('disabled');
              this.emailVerifyCodeCount = '获取验证码';
              clearInterval(startEmailReciprocal);
            }
          }, 1000);
        },
        flushCaptchaCode() {
          this.captchaPath = this.baseUrl + `/user/captcha?captcha_key=${(new Date().getTime())}&random=${this.random}`;
          let captchaImage = document.querySelector('.captcha-img-show');
          captchaImage.style['animation'] = `registerCaptchaPress .8s linear`;
          setTimeout(()=>{
            captchaImage.style['animation'] = 'none';
          },800)
        },
        //点击执行注册
        doRegister() {
          if (this.userMsgData.userName === '') {
            this.toast('怎么称呼呢?');
            return;
          }
          if (this.originalPassword === '') {
            this.toast('你没有填写密码');
            return;
          }
          if (this.captchaCode === '') {
            this.toast('验证码不能为空！！！o(╥﹏╥)o');
            return;
          }
          if (this.userMsgData.email === '') {
            this.toast('邮箱还没填写呢...');
            return;
          }
          let reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
          if (!reg.test(this.userMsgData.email)) {
            this.toast('邮箱格式不正确');
            return;
          }
          this.userMsgData.password = hex_md5(this.originalPassword);
          userApi.register(this.captchaCode, this.random, this.emailCode, this.userMsgData)
          .then(res=>{
            if (res.data.code === 20002) {
              this.toast(res.data.message);
              this.$router.push({
                path: '/login'
              })
            } else {
              this.toast(res.data.message);
            }
          })
        },
        judgeEmptyError(judgeData,divClassName,tipsMessage) {
          if (judgeData === '') {
            this.registTipsHappen(divClassName,tipsMessage);
            let errorIcon = document.querySelector(`.${divClassName}-error-icon`);
            errorIcon.style['opacity'] = '1';
            return;
          }else {
            let errorIcon = document.querySelector(`.${divClassName}-error-icon`);
            errorIcon.style['opacity'] = '0';
          }
        },
        verifyCaptcha() {
          this.judgeEmptyError(this.captchaCode,'verifyCaptcha', '验证码为空');
        },
        verifyEmail() {
          this.judgeEmptyError(this.userMsgData.email,'verifyEmail', '邮箱为空');
        },
        verifyEmailCode() {
          this.judgeEmptyError(this.emailCode,'verifyEmailCode', '验证码为空');
        },
        verifyPassword() {
          this.judgeEmptyError(this.originalPassword,'verifyPassword', '密码为空');
        },
        verifyUserName() {
          if (this.userMsgData.userName === '') {
            this.registTipsHappen('verifyUserName','用户名为空');
            let successIcon = document.querySelector('.verifyUserName-success-icon');
            successIcon.style['opacity'] = '0';
            let errorIcon = document.querySelector('.verifyUserName-error-icon');
            errorIcon.style['opacity'] = '1';
            return;
          }
          userApi.checkUserNameExistOrNot(this.userMsgData.userName).then(res=>{
            if (res.data.code === 40000) {
              this.registTipsHappen('verifyUserName','名字已存在');
              let successIcon = document.querySelector('.verifyUserName-success-icon');
              successIcon.style['opacity'] = '0';
              let errorIcon = document.querySelector('.verifyUserName-error-icon');
              errorIcon.style['opacity'] = '1';
            }else if (res.data.code === 20000) {
              let errorIcon = document.querySelector('.verifyUserName-error-icon');
              errorIcon.style['opacity'] = '0';
              let successIcon = document.querySelector('.verifyUserName-success-icon');
              successIcon.style['opacity'] = '1';
            }
          });

        },
        registTipsHappen(divClassName,showMsg) {
          let userNameTips = document.querySelector(`.${divClassName}`);
          userNameTips.className  = `register-exist-tips ${divClassName} register-tips-happen-animate`;
          userNameTips.innerHTML = `${showMsg}`;
          setTimeout(() => {
            userNameTips.style['opacity'] = '0';
            userNameTips.style['transition'] = 'all .4s';

          }, 4000);
          setTimeout(() => {
            userNameTips.className = `register-exist-tips ${divClassName}`;
            userNameTips.style['opacity'] = '1';
          }, 4400);
        },
        toast(msg) {
          this.$vs.notification({
            progress: 'auto',
            color: 'rgba(255, 70, 99, 0.8)',
            position: 'top-center',
            // duration: 1000,
            sticky: true,
            flat: true,
            clickClose: true,
            width: 'auto',
            title: '®️注册页面提示:',
            text: `${msg}`
          })
        }
      },
      mounted() {
        this.captchaPath = this.baseUrl+ `/user/captcha?captcha_key=${(this.random = new Date().getTime())}`;
      }
    }
</script>

<style lang="less">
  .register-exist-error-icon {
    opacity: 0;
    position: absolute;
    transition: all 1s;
    height: 40px;
    width: 40px;
    top: 0px;
    left: 260px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .register-exist-success-icon {
    transition: all 1s;
    opacity: 0;
    position: absolute;
    height: 40px;
    width: 40px;
    top: 0px;
    left: 260px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .register-tips-happen-animate{
    animation: registerTipsHappen 1s cubic-bezier(0.57, 0.49, 0, 1.51) forwards;
  }
  @keyframes registerTipsHappen {
    from{
      left: 300px;
      display: none;
      visibility: visible;
    }
    to{
      left: -100px;
      display: block;
      visibility: visible;
    }
  }
  .register-exist-tips {
    visibility: hidden;
    border: 1px solid lightpink;
    border-radius: 4px;
    position: absolute;
    width: 88px;
    height: 30px;
    top: 4px;
    left: -100px;
    background-color: rgba(232, 166, 166, 0.4);
    line-height: 30px;
    color: red;
    text-align: center;
    &:after {
      content: '';
      background-color: lightpink;
      width: 10px;
      border-top-right-radius: 14px;
      border-bottom-right-radius: 14px;
      height: 28px;
      position: absolute;
      top: 1px;
      right: -10px;
    }
  }
  .register-input-hover:hover {
    box-shadow: 3px 3px 12px #ffffff;
    transition: all .4s;
  }


  .register-submit-action-box {
    width: 300px;
    height: 36px;
    margin: 0 auto;
    background-color: wheat;
    border-radius: 14px;
    font-family: titlefont, 'pao', 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    color: red;
    button{
      font-size: 24px;
    }

  }
  .register-get-email-verify-code-btn{
    top: 0;
    position: absolute;
    left: 300px;
  }
  .register-relative-div{
    position: relative;
  }
  .register-action-box {
    width: 100%;
    height: 100%;
  }
  .register-temp-captcha-span{
    width: 286px !important;
    height: 40px;
    line-height: 40px;

    margin: 0 auto;
    padding-left: 14px;
    background: none !important;
    font-size: 25px;
    font-family: 'titlefont', 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif !important;
    color: pink;

    .captcha-img-show {
      border-radius: 12px;
      display: block;
      float: right;
    }
  }
  @keyframes registerCaptchaPress {
    0%,100%{
      box-shadow: 1px 1px 0 #8c8c8c,2px 2px 0 #8c8c8c,3px 3px 0 #8c8c8c,4px 4px 0 #8c8c8c,5px 5px 10px #fff;
    }
    50%{
      box-shadow: none;
    }
  }
  .register-msg-input-data-box {
    color: white;
    .register-msg-input-data-item {
      margin: 10px auto;
      height: 40px;
      width: 300px;
      line-height: 40px;
      clear: both;
      background: rgba(255, 70, 99, 0.8);
      border-radius: 12px;
      input:focus{
        box-shadow: 3px 3px 12px #ffffff;
        transition: all .4s;
      }

    }
    .captcha-img-show{
      box-shadow: 1px 1px 0 #8c8c8c,2px 2px 0 #8c8c8c,3px 3px 0 #8c8c8c,4px 4px 0 #8c8c8c,5px 5px 10px #fff;
    }
    input{
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

    label {
      font-size: 15px;
      font-weight: 300;

      padding-left: 14px;
    }
  }



  .register-page-sign {
    font-family: titlefont, 'pao', 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    height: 100px;
    margin: 10px auto;
    line-height: 100px;
    font-size: 60px;
    text-align: center;
    color: lightpink;

    a {
      text-decoration: none;

      &:visited {
        color: lightpink;
      }

      &:link {
        color: lightpink;
      }
    }

    &::selection {
      color: wheat;
    }
  }
  .register-inner-box {
    width: 700px;
    height: 500px;
    border-radius: 35px;
    background-color: rgba(0,0,0,.8);
  }


  .register-footer {
    width: 100%;
    background-color: #282727;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100px;
    color: white;
    background-color: #282727;
    text-align: center;
    bottom: 0;
    left: 0;
    position: fixed;
  }
  .register-main-box {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .register-total-box {
    position: relative;
  }
  .register-bg-box {
    position: absolute;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background: url("../../assets/images/registerBg.jpg") no-repeat fixed;
    background-size: cover;
  }
</style>
