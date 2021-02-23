<template>
  <div class="forget-total-box">
    <div class="forget-bg-box"></div>

    <div class="forget-main-box">
      <div class="forget-inner-box">

        <div class="forget-action-box">
          <div class="forget-page-sign">
            <span>Czy</span>

            <a href="/">blog</a>
            |
            <span>forget</span>
          </div>

          <div class="forget-msg-input-data-box" v-if="!isCheckOutPass">

            <div class="forget-temp-captcha-span">
              <span>C a p t c h a:</span><img class="forget-captcha-img-show" :src="forgetCaptchaPath" @click="flushCaptchaCodeforgetpage">
            </div>
            <div class="forget-msg-input-data-item forget-relative-div">
              <label for="captcha">人类验证码:</label>
              <input placeholder="证明你是人类" @blur="verifyCaptcha" v-model="captchaCode" id="captcha" style="float: right" type="text"
                     class="input-comment-style register-input-hover">
              <div class="forget-exist-tips verifyCaptcha">hahaha</div>
              <div class="forget-exist-error-icon verifyCaptcha-error-icon"><img src="../../assets/images/error.svg"> </img></div>
            </div>


            <div class="forget-msg-input-data-item forget-relative-div">
              <label for="email">邮箱:</label>
              <input placeholder="请输入邮箱" @blur="verifyEmail" id="email" v-model="forgetPageEmail" style="float: right" type="text" class="input-comment-style register-input-hover">
              <vs-button class="forget-get-email-verify-code-btn"
                         color="#FFB6C0"
                         border
                         flat
                         @click="sendEmail"
              >
                {{emailVerifyCodeCount}}
              </vs-button>
              <div class="forget-exist-tips verifyEmail">hahaha</div>
              <div class="forget-exist-error-icon verifyEmail-error-icon"><img src="../../assets/images/error.svg"> </img></div>
              <div class="forget-exist-success-icon verifyEmail-success-icon"><img src="../../assets/images/success.svg"> </img></div>
            </div>

            <div class="forget-msg-input-data-item forget-relative-div">
              <label for="emailCode">邮箱验证码:</label>
              <input placeholder="邮箱验证码" @blur="verifyEmailCode" v-model="emailCode" style="float: right" class="input-comment-style forget-input-hover" id="emailCode">
              <div class="forget-exist-tips verifyEmailCode">hahaha</div>
              <div class="forget-exist-error-icon verifyEmailCode-error-icon"><img src="../../assets/images/error.svg"> </img></div>
            </div>

          </div>
          <div class="forget-msg-input-data-box" v-else>
            <div class="forget-msg-input-data-item forget-relative-div">
              <label for="resetPassword">重置密码:</label>
              <input placeholder="重置密码" @blur="verifyResetPassword" v-model="resetPassword" id="resetPassword" style="float: right" type="password"
                     class="input-comment-style register-input-hover">
              <div class="forget-exist-tips verifyResetPassword">hahaha</div>
              <div class="forget-exist-error-icon verifyResetPassword-error-icon"><img src="../../assets/images/error.svg"> </img></div>
            </div>
          </div>

          <div class="forget-submit-action-box" v-if="!isCheckOutPass">
            <button @click="doFindingPassword" class="login-btn mdui-btn mdui-btn-block mdui-color-theme-accent mdui-ripple">
              find password
            </button>
          </div>
          <div class="forget-submit-action-box" v-else>
            <button @click="doResetPassword" class="login-btn mdui-btn mdui-btn-block mdui-color-theme-accent mdui-ripple">
              reset password
            </button>
          </div>
        </div>

      </div>
    </div>

    <div class="forget-footer">
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
          title: '陈展云的博客-找回密码',
          meta: [
            {
              hid: 'description',
              name: 'description',
              content: '陈展云的博客-找回密码'
            },
            {
              hid: 'keywords',
              name: 'keywords',
              content: '陈展云,博客,java,spring,spring-boot,开发,毕业设计,博客系统,程序员,docker,linux,电脑硬件,电脑软件,kubernetes,vue,nuxtjs,vuejs,js,javascript,html,css,less,rabbitmq,源码'
            }
          ]
        }
      },
      asyncData(){
        let random = new Date().getTime();
        return{
          forgetRandom: random
        }
      },
      data(){
        return{
          emailVerifyCodeCount: '获取验证码',
          captchaCode: '',
          forgetCaptchaPath: '',
          forgetRandom: '',
          forgetPageEmail: '',
          emailCode: '',
          user:{
            email: '',
            password: ''
          },
          isCheckOutPass: false,
          resetPassword: ''
        }
      },
      mounted() {
        this.forgetCaptchaPath = this.baseUrl + `/user/captcha?captcha_key=${this.forgetRandom}`;
      },

      methods:{
        doResetPassword() {
          if (this.resetPassword === '') {
            this.verifyResetPassword();
            return;
          }
          this.user.password = hex_md5(this.resetPassword);
          this.user.email = this.forgetPageEmail;
          userApi.resetPassword(this.emailCode, this.user)
          .then(res=>{
            if (res.data.code === 20000) {
              this.toast('重置密码成功！！');
              this.$router.push({
                path: '/'
              })
            }else {
              this.toast(res.data.message);
            }
          })
        },
        doFindingPassword() {
          if (this.captchaCode === '') {
            this.toast('请填写人类验证码');
            return;
          }
          if (this.forgetPageEmail === '') {
            this.toast('请填写邮箱');
            return;
          }
          let reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
          if (!reg.test(this.forgetPageEmail)) {
            this.forgetTipsHappen('verifyEmail', '格式有误');
            let errorIcon = document.querySelector(`.verifyEmail-error-icon`);
            errorIcon.style['opacity'] = '1';
            return;
          }else if (reg.test(this.forgetPageEmail)) {
            let errorIcon = document.querySelector(`.verifyEmail-error-icon`);
            errorIcon.style['opacity'] = '0';
          }
          if (this.emailCode === '') {
            this.toast('请填写邮箱验证码');
            return;
          }

          userApi.checkEmailCode(this.forgetPageEmail,this.emailCode,this.captchaCode,this.forgetRandom)
          .then(res=>{
            if (res.data.code === 20000) {
              this.toast(res.data.message);
              this.isCheckOutPass = true;
            } else {
              this.toast(res.data.message);
              this.flushCaptchaCodeforgetpage();
            }
          })
        },
        sendEmail() {
          if (this.forgetPageEmail === '') {
            this.verifyEmail();
            return;
          }
          let reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
          if (!reg.test(this.forgetPageEmail)) {
            this.forgetTipsHappen('verifyEmail', '格式有误');
            let errorIcon = document.querySelector(`.verifyEmail-error-icon`);
            errorIcon.style['opacity'] = '1';
            return;
          }else if (reg.test(this.forgetPageEmail)) {
            let errorIcon = document.querySelector(`.verifyEmail-error-icon`);
            errorIcon.style['opacity'] = '0';
          }
          userApi.sendEmailVerifyCode(this.captchaCode, this.random, this.forgetPageEmail, 'forget')
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
          let countBtn = document.querySelector('.forget-get-email-verify-code-btn');
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
        verifyCaptcha(){
          this.judgeEmptyError(this.captchaCode,'verifyCaptcha', '验证码为空');
        },
        verifyResetPassword(){
          this.judgeEmptyError(this.resetPassword,'verifyResetPassword', '密码为空');
        },
        verifyEmail() {
          this.judgeEmptyError(this.forgetPageEmail,'verifyEmail', '邮箱为空');
        },
        verifyEmailCode() {
          this.judgeEmptyError(this.emailCode,'verifyEmailCode', '验证码为空');
        },
        flushCaptchaCodeforgetpage() {
          this.forgetCaptchaPath = this.baseUrl + `/user/captcha?captcha_key=${new Date().getTime()}&random=${this.forgetRandom}`;
          let captchaImage = document.querySelector('.forget-captcha-img-show');
          captchaImage.style['animation'] = `forgetCaptchaPress .8s linear`;
          setTimeout(()=>{
            captchaImage.style['animation'] = 'none';
          },800)
        },
        judgeEmptyError(judgeData,divClassName,tipsMessage) {
          if (judgeData === '') {
            this.forgetTipsHappen(divClassName,tipsMessage);
            let errorIcon = document.querySelector(`.${divClassName}-error-icon`);
            errorIcon.style['opacity'] = '1';
            return;
          }else {
            let errorIcon = document.querySelector(`.${divClassName}-error-icon`);
            errorIcon.style['opacity'] = '0';
          }
        },
        forgetTipsHappen(divClassName,showMsg) {
          let userNameTips = document.querySelector(`.${divClassName}`);
          userNameTips.className  = `forget-exist-tips ${divClassName} forget-tips-happen-animate`;
          userNameTips.innerHTML = `${showMsg}`;
          setTimeout(() => {
            userNameTips.style['opacity'] = '0';
            userNameTips.style['transition'] = 'all .4s';

          }, 4000);
          setTimeout(() => {
            userNameTips.className = `forget-exist-tips ${divClassName}`;
            userNameTips.style['opacity'] = '1';
          }, 4400);
        },
        toast(msg) {
          this.$vs.notification({
            progress: 'auto',
            color: 'rgba(70,255,227,0.8)',
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

    }
</script>

<style lang="less">

  .forget-submit-action-box {
    width: 298px;
    height: 34px;
    border: 1px solid lime;
    margin: 0 auto;
    background-color: rgba(159, 232, 159, 0.6);
    border-radius: 14px;
    font-family: titlefont, 'pao', 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    color: rgba(14, 9, 9, 0.75);
    button{
      font-size: 24px;
    }

  }
  .forget-get-email-verify-code-btn{
    top: 0;
    position: absolute;
    left: 300px;
  }
  .forget-temp-captcha-span{
    width: 286px !important;
    height: 40px;
    line-height: 40px;

    margin: 0 auto;
    padding-left: 14px;
    background: none !important;
    font-size: 25px;
    font-family: 'titlefont', 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif !important;
    color: pink;

    .forget-captcha-img-show {
      border-radius: 12px;
      display: block;
      float: right;
      box-shadow: 1px 1px 0 #8c8c8c,2px 2px 0 #8c8c8c,3px 3px 0 #8c8c8c,4px 4px 0 #8c8c8c,5px 5px 10px #fff;
    }
  }

  .forget-exist-error-icon {
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
  .forget-exist-success-icon {
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
  .forget-tips-happen-animate{
    animation: forgetTipsHappen 1s cubic-bezier(0.57, 0.49, 0, 1.51) forwards;
  }
  @keyframes forgetTipsHappen {
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
  .forget-exist-tips {
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
  .forget-input-hover:hover {
    box-shadow: 3px 3px 12px #ffffff;
    transition: all .4s;
  }
  @keyframes forgetCaptchaPress {
    0%,100%{
      box-shadow: 1px 1px 0 #8c8c8c,2px 2px 0 #8c8c8c,3px 3px 0 #8c8c8c,4px 4px 0 #8c8c8c,5px 5px 10px #fff;
    }
    50%{
      box-shadow: none;
    }
  }

  .forget-relative-div{
    position: relative;
  }
  .forget-msg-input-data-box {
    color: white;
    .forget-msg-input-data-item {
      margin: 10px auto;
      height: 40px;
      width: 300px;
      line-height: 40px;
      clear: both;
      background: rgba(70, 255, 203, 0.8);
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




  .forget-action-box {
    width: 100%;
    height: 100%;
  }
  .forget-inner-box {
    width: 700px;
    height: 500px;
    border-radius: 35px;
    background-color: rgba(0,0,0,.8);
  }

  .forget-main-box {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .forget-total-box {
    position: relative;
  }
  .forget-bg-box {
    position: absolute;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background: url("../../assets/images/forgetBg.jpg") no-repeat fixed;
    background-size: 100% 100%;
  }
  .forget-footer {
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
  .forget-page-sign {
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
</style>
