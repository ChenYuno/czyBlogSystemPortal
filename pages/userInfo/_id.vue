<template>
  <div>
    <div class="userInfo-head-bg-box">
      <img :src="userInfoHeadBg" class="userInfo-head-bg">
    </div>
    <div class="userInfo-main-box">
      <div class="userInfo-innerMain">
        <div class="userInfo-avatar-show-box">
          <img :src="userInfo.avatar" class="userInfo-avatar">
        </div>
        <div style="width: 100%;height: 170px"></div>
        <div class="userInfo-main-content">
          <div class="userInfo-sidebar">
            <vs-sidebar
              relative
              v-model="active"
              open
            >
              <template #logo>
                <div class="userInfo-sidebar-logo">
                  <span>Czy | blog</span>
                </div>
              </template>
              <vs-sidebar-item id="userinfocontent" @click="changeContentShow('userinfocontent')">
                <template #icon>
                  <i class="fa fa-address-card" aria-hidden="true"></i>
                </template>
                用户信息
              </vs-sidebar-item>
              <vs-sidebar-item
                v-if="showEditorBtn"
                id="editoruserinfo"
                @click="changeContentShow('editoruserinfo')">
                <template #icon>
                  <i class="fa fa-pencil-square" aria-hidden="true"></i>
                </template>
                修改用户信息
              </vs-sidebar-item>
            </vs-sidebar>
          </div>

          <div class="userInfo-content">

            <div class="userInfo-content-inner" v-if="active === 'userinfocontent'">
              <div class="userInfo-content-item">
                <div><pan-thumb :image="userInfo.avatar"/></div>

                <div class="userInfo-content-item-show-list">

                  <div>用户名称：{{userInfo.userName}}</div>
                  <div>用户角色：{{userInfo.roles === 'role_admin'?'管理员':'普通用户'}}</div>
                  <div class="userInfo-content-item-email">上次修改：{{userInfo.updateTime}}</div>
                  <div class="userInfo-content-item-email">邮箱：{{userInfo.email}}</div>
                  <div class="userInfo-content-item-sign">签名：{{userInfo.sign === '' || userInfo.sign ===null?'这个人很懒，什么也没留下':userInfo.sign }}</div>
                </div>
              </div>


            </div>

            <div class="userInfo-content-inner" v-if="active === 'editoruserinfo'">
              <div class="userInfo-editavatar">
                <div v-if="toCommitUserInfo.avatar === ''">
                  <pan-thumb :image="userInfo.avatar"/>
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="/admin/image/avatar"
                    :file-list="fileList"
                    :on-success="uploadSccess"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传图片文件Σ(⊙▽⊙"a</div>
                  </el-upload>

                </div>
                <div v-else>
                  <pan-thumb :image="toCommitUserInfo.avatar"/>
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="/admin/image/avatar"
                    :on-success="uploadSccess"
                    :file-list="fileList"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传图片文件Σ(⊙▽⊙"a</div>
                  </el-upload>
                </div>
                <el-form label-width="50px" class="demo-ruleForm">
                  <el-form-item label="昵称">
                    <el-input type="text" v-model="toCommitUserInfo.userName" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-button v-if="!boleanIsResetPassword" style="margin-bottom: 20px" type="warning" @click="preResetPassword">{{isResetPassword}}</el-button>
                  <div class="resetpasswordaction" v-else>
                    <el-form-item label="密码">
                      <el-input type="password" v-model="toCommitUserInfo.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="commitChangePassword">确认提交</el-button>
                    <el-button v-if="boleanIsResetPassword" type="warning" @click="preResetPassword">{{isResetPassword}}</el-button>
                  </div>
                  <el-button v-if="!boleanIsResetEmail" type="warning" @click="preResetEmail">{{isResetEmail}}</el-button>
                  <div class="resetemailaction" v-else>
                    <el-form-item label="邮箱">
                      <div style="display: flex;justify-content: flex-start">
                        <el-input v-model="toCommitUserInfo.email"></el-input>
                        <el-button class="countBtn" style="margin-left: 20px" type="primary" plain
                                   @click="sendEmail">{{sendEmailSecond}}
                        </el-button>
                        <el-button v-if="boleanIsResetEmail" type="warning" @click="preResetEmail">
                          {{isResetEmail}}
                        </el-button>

                      </div>
                    </el-form-item>
                    <el-form-item label="人类验证码" label-width="90px">
                      <div style="display: flex">
                        <el-input v-model="captchaNum"></el-input>
                        <img :src="captchaImagePath"
                             @click="changeCaptcha"
                             style="height: 40px;width: 170px;border-radius: 4px">
                      </div>


                    </el-form-item>
                    <el-form-item label="邮箱验证码" label-width="90px">
                      <el-input v-model="emailCaptcha"></el-input>
                      <el-button type="primary" @click="commitChangeEmail">确认提交</el-button>
                    </el-form-item>
                  </div>

                  <el-form-item label="签名">
                    <el-input type="textarea"
                              rows="3"
                              maxlength="60"
                              show-word-limit
                              v-model.number="toCommitUserInfo.sign"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitUserInfoForm">提交</el-button>
                    <el-button @click="resetForm">重置</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>


          </div>

        </div>
      </div>
    </div>


    <!-- 底部的裙子和时间还有备案信息 -->
    <div class="dress-bottom-about-userInfo-box">
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
  import userApi from "../../api/userApi";
  import panThumb from '@/components/PanThumb';
  import {hex_md5} from '../../utils/md5';
    export default {
        name: "userInfo",
      head() {
        return {
          title: '陈展云的博客-'+this.userInfo.userName+'用户信息',
          meta: [
            {
              hid: 'description',
              name: 'description',
              content: '陈展云的博客,用户信息中心'
            },
            {
              hid: 'keywords',
              name: 'keywords',
              content: '陈展云,博客,java,spring,spring-boot,开发,毕业设计,博客系统,程序员,docker,linux,电脑硬件,电脑软件,kubernetes,vue,nuxtjs,vuejs,js,javascript,html,css,less,rabbitmq,源码'
            }
          ]
        }
        },

      async asyncData(context) {
        console.log(context.params.id);
        let userInfo = await userApi.getUserInfo(context.params.id)
        let currLoginUserId = userInfo.data.data.user? userInfo.data.data.user.id : '';
        return{
          userInfo: userInfo.data.data.user ? userInfo.data.data.user : {},
          currLoginUserId: currLoginUserId
        }
      },
      components: {panThumb},
      data() {
          return{
            userInfo: {},
            currLoginUserId: '',
            showEditorBtn: false,
            userInfoHeadBg:require('../../assets/images/userInfoHeadBg.jpg'),
            active: 'userinfocontent',
            btnToShow:'',
            toCommitUserInfo:{
              id:'',
              userName: '',
              password: '',
              sign: '',
              email: '',
              avatar: ''
            },
            fileList: [],
            sendEmailSecond:'发送邮件',
            isResetPassword:'重新设置密码',
            boleanIsResetPassword: false,
            isResetEmail: '重新设置邮箱',
            boleanIsResetEmail:false,
            emailCaptcha: '',
            captcharandom: '',
            captchaNum: '',
            captchaImagePath: ''
          }
      },
      methods: {
        changeCaptcha() {
          this.captchaImagePath = this.baseUrl + `/user/captcha?captcha_key=${new Date().getTime()}&random=${this.captcharandom}`;
        },
        commitChangeEmail() {
          if (this.captchaNum === '') {
            this.$message.error('请输入人类验证码');
            return;
          }
          if (this.emailCaptcha === '') {
            this.$message.error('请输入邮箱验证码');
            return;
          }
          let reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
          if (this.toCommitUserInfo.email === '' || !reg.test(this.toCommitUserInfo.email)) {
            this.$message.error('请输入正确格式的邮箱号码');
            return;
          }
          userApi.checkEmail(this.toCommitUserInfo.email)
            .then(res => {
              if (res.data.code === 20000) {
                this.$message.error('该邮箱已经被注册');
                return;
              }else if (res.data.code === 40000) {
                userApi.checkEmailCode(this.toCommitUserInfo.email,
                  this.emailCaptcha,
                  this.captchaNum,
                  this.captcharandom).then(res => {
                  if (res.data.code === 20000) {
                    //到了这里可以真正的去修改邮箱了
                    userApi.updateUserInfoEmail(this.toCommitUserInfo.email, this.emailCaptcha)
                      .then(res => {
                        if (res.data.code === 20000) {
                          this.$message.success(res.data.message);
                          this.preResetEmail();
                          this.location.reload();
                        }
                      });
                  }
                });
              }
            });
        },
        preResetEmail() {
          this.boleanIsResetEmail = !this.boleanIsResetEmail
          if (this.boleanIsResetEmail) {
            this.isResetEmail = '不想重新设置邮箱了';
          } else {
            this.isResetEmail = '重新设置邮箱';
          }
          if (this.captcharandom === '') {
            let timeStamp = new Date().getTime();
            this.captcharandom = timeStamp;
            this.captchaImagePath = this.baseUrl + `/user/captcha?captcha_key=${new Date().getTime()}&random=${this.captcharandom}`;
          }
        },
        commitChangePassword() {
          if (this.toCommitUserInfo.password === '') {
            this.$message.error('重置的密码不能为空')
            return;
          }
          console.log(this.toCommitUserInfo.id);
          let md5_data = hex_md5(this.toCommitUserInfo.password);
          console.log(md5_data);
          userApi.changeUserInfoPassword(this.toCommitUserInfo.id, md5_data)
            .then(res => {
              if (res.data.code === 20000) {
                this.$message.success(res.data.message);
                this.preResetPassword();
              }
            });
        },
        preResetPassword() {
          this.boleanIsResetPassword = !this.boleanIsResetPassword
          if (this.boleanIsResetPassword) {
            this.isResetPassword = '不想重新设置密码了';
          } else {
            this.isResetPassword = '重新设置密码';
          }

        },
        sendEmail() {
          if (this.toCommitUserInfo.email === '') {
            this.$message.error('请先输入邮箱');
            return;
          }
          if (this.captchaNum === '') {
            this.$message.error('请先输入人类验证码');
            return;
          }
          userApi.sendEmailVerifyCode(this.captchaNum, this.captcharandom,
            this.toCommitUserInfo.email, 'update')
            .then(res => {
              if (res.data.code === 20000) {
                this.$message.success(res.data.message);
                this.countDownSendEmailSecond();
              } else {
                this.$message.error(res.data.message);
              }
            });
        },
        countDownSendEmailSecond() {

          let countBtn = document.querySelector('.countBtn');
          if (!countBtn) {
            return;
          }
          countBtn.setAttribute('disabled','disabled')
          let countNum = 60;
          this.sendEmailSecond = countNum;
          let countDown = setInterval(() => {
            countNum--;
            this.sendEmailSecond = countNum;
            if (countNum <= 0) {
              clearInterval(countDown);
              this.sendEmailSecond = '发送邮件';
              countBtn.removeAttribute('disabled');
            }
          }, 1000);
        },
        submitUserInfoForm() {
          console.log(this.currLoginUserId);
          userApi.updateUserInfoCommon(this.currLoginUserId, this.toCommitUserInfo)
            .then(res => {
              if (res.data.code === 20000) {
                location.reload();
              }else {
                this.$message.error(res.data.message)
              }
            });

        },
        resetForm() {
          this.toCommitUserInfo.userName = '';
          this.toCommitUserInfo.password = '';
          this.toCommitUserInfo.sign = '';
          this.toCommitUserInfo.email = '';
        },
        changeContentShow(sidebarkey) {
          this.active = sidebarkey
          if (sidebarkey === 'editoruserinfo') {
            this.toCommitUserInfo.userName = this.userInfo.userName;
            this.toCommitUserInfo.sign = this.userInfo.sign
            console.log(this.toCommitUserInfo);
          }

        },
        submitUpload() {
          this.$refs.upload.submit();
        },
        uploadSccess(response) {
          console.log(response)
          if (response.code === 20000) {
            //todo:上线的时候记得改造
            //看来得走oss
            this.toCommitUserInfo.avatar = this.baseUrl + '/portal/image/' + response.data.id;
            this.$message.success(response.message);
          } else {
            this.$message.error(response.message);
          }

        },
      },
      computed: {
        currLoginUserid() {
          return this.$store.getters.getLoginUserId;
        }
      },
      watch: {
        currLoginUserid:{
          deep: true,
          immediate: true,
          handler(newVal, oldVal) {
            console.log(newVal + " --- old:  " + oldVal);
            if (newVal === this.currLoginUserId) {
              this.showEditorBtn = true;
              console.log('和登录的用户id一样，显示编辑按钮');
              this.toCommitUserInfo.id = newVal
              console.log('toCommitUserInfo.id:'+this.toCommitUserInfo.id);
            }
          }
        },
        active:{
          deep: true,
          immediate: true,
          handler(newVal, oldVal) {
            console.log(newVal);
            if (newVal   === 'editoruserinfo') {
              this.toCommitUserInfo.userName = this.userInfo.userName;
              this.toCommitUserInfo.avatar = this.userInfo.avatar;
              this.toCommitUserInfo.sign = this.userInfo.sign
              console.log(this.toCommitUserInfo);
            }
          }
        }
      },
      mounted() {
        console.log(this.userInfo);
        console.log(this.$store.state.loginUser);
        console.log(this.currLoginUserid);
      },

    }
</script>

<style lang="less">
  .resetemailaction .el-form-item__content{
    height: 40px;
  }
  .resetpasswordaction{
    display: flex;
  }
  .resetpasswordaction .el-button {
    height: 40px;
    margin-left: 20px;
  }
  .userInfo-content-inner .el-input__inner,.userInfo-content-inner .el-input{
    max-width: 350px;
  }



  .userInfo-content-item-show-list {
    font-size: 16px;
    display: flex;
    flex-direction: column;
    font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    >div{
      border-radius: 6px;
      width: 200px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      box-shadow:  0 0 10px #f54c6e;
      margin: 10px;
    }
    .userInfo-content-item-email{
      width: 250px;
    }
    .userInfo-content-item-sign {
      width: 300px;
      height: 100px;
    }
  }
  .userInfo-content-item {
    width: 100%;
    min-height: 100px;
  }
  .userInfo-content-inner{
    padding: 20px;
  }

  .userInfo-sidebar-logo{
    span {
      color: #f54c6e;
      font-family: titlefont, 'pao', 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
      font-size: 30px;
    }
  }
  .userInfo-content {
    float: right;
    width: 70%;
  }
  .userInfo-sidebar{
    position: sticky;
    height: 100%;
    float: left;
    top: 0;
    width: 30%;
    .vs-sidebar-content{
      margin: 0;
      max-width: 100%;
      .vs-sidebar__item{
        display: flex;
        justify-content: center;
      }

    }
  }
  .userInfo-sidebar:after,.userInfo-content:after ,.userInfo-main-content:after{
    content: "";
    display: block;
    clear: both;
  }
  .clear-float {
    clear: both;
  }
  .userInfo-avatar {
    height: 100px;
    width: 100px;
    position: absolute;
    top: 120px;
    border: 2px dashed #fff;
    left: calc(50% - 50px);
    border-radius: 50%;
  }
  .userInfo-head-bg-box {
    width: 100%;
    height: 600px;
    .userInfo-head-bg{
      width: 100%;
      height: 600px;
    }
  }
  .userInfo-main-box {
    width: 100%;
    min-height: 700px;
    background-color: #fff;


  }
  .dress-bottom-about-userInfo-box {
    width: 100%;
    height: 200px;
    position: relative;
    background-color: transparent;
  }
  .userInfo-innerMain {
    margin: 0 auto;
    position: relative;
    background-color: #fff;
    width: 80%;
    min-height: 700px;
  }
  .userInfo-avatar-show-box {
    position: absolute;
    width: 600px;
    height: 350px;
    background-color: rgba(156, 255, 196, .8);
    border-radius: 30px;
    top: -176px;
    left: calc(50% - 300px);
  }
  @media screen and (max-width: 660px){
    .userInfo-innerMain{
      background-color: #fff;
      width: 100%;
    }
    .userInfo-avatar-show-box{
      width: 400px;
      left: calc(50% - 200px);
      height: 310px;
    }
    .userInfo-head-bg-box {
      width: 100%;
      height: 400px;
      .userInfo-head-bg{
        width: 100%;
        height: 400px;
      }
    }
  }
</style>
