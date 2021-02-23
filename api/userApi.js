import request from '../utils/request';
export default {
  checkToken(){
    return request({
      url: '/user/check-token',
      method: 'get'
    })
  },doLogin(captcha,captcha_key,from,blogUser){
    return request({
      url: `/user/login/${captcha}/${captcha_key}?from=${from}`,
      method:'post',
      data:blogUser
    })
  },doLogout() {
    return request({
      url: '/user/logout',
      method: 'get'
    })
  },
  checkUserNameExistOrNot(userName) {
    return request({
      url: `/user/user_name?userName=${userName}`,
      method: 'get'
    })
  },
  sendEmailVerifyCode(captchaCode,captcheKey,email,type) {
    return request({
      url: `/user/verify_code?captcha_code=${captchaCode}&captcha_key=${captcheKey}&email=${email}&type=${type}`,
      method: 'get'
    })
  },
  register(captchaCode,captchaKey,emailCode,userRegisterMsg) {
    return request({
      url: `/user/join_in?captcha_code=${captchaCode}&captcha_key=${captchaKey}&email_code=${emailCode}`,
      method: 'post',
      data: userRegisterMsg
    })
  },
  checkEmailCode(email, verifyCode, captchaCode, captchaKey) {
    return request({
      url: `/user/check_email_code?captcha_code=${captchaCode}&captcha_key=${captchaKey}&email=${email}&verify_code=${verifyCode}`,
      method: 'get'
    })
  },
  resetPassword( verifyCode,user) {
    return request({
      url: `/user/password/${verifyCode}`,
      method: 'put',
      data: user
    })
  },
  getUserInfo(userId) {
    return request({
      url: `/user/user_info/${userId}`,
      method: 'get'
    })
  },
  changeUserInfoPassword(userId, password) {
    return request({
      url: `/user/reset-password/${userId}?password=${password}`,
      method: 'put'
    })
  },
  checkEmail(email) {
    return request({
      url: `/user/email?email=${email}`,
      method:'get'
    })
  },
  updateUserInfoEmail(email,verify_code) {
    return request({
      url: `/user/email?email=${email}&verify_code=${verify_code}`,
      method:'put'
    })
  },
  updateUserInfoCommon(userId, userInfo) {
    return request({
      url: `/user/user_info/${userId}`,
      method: 'put',
      data: userInfo
    })
  }
}
