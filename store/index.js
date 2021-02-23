export const state = () => ({
  masterInfo: {},
  waveShow: false,
  currentActiveTab: 'index',
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
})
export const getters = {
  getLoginUserId:(state)=>{
    return state.loginUser.id;
  }
}
export const mutations = {
  setLoginUser(state,loginUser) {
    state.loginUser = loginUser;
  },
  setCurrentActiveTab(state, currentActiveTab) {
    state.currentActiveTab = currentActiveTab;
  },

  setMasterInfo(state,master) {

    function sparateObj(id,
                        userName,
                        roles,
                        avatar,
                        email,
                        sign,
                        state,
                        createTime,
                        updateTime,
                        regIp,
                        loginIp) {
      this.id = id;
      this.userName = userName;
      this.roles = roles;
      this.avatar = avatar;
      this.email = email;
      this.sign = sign;
      this.state = state;
      this.createTime = createTime;
      this.updateTime = updateTime;
      this.regIp = regIp;
      this.loginIp = loginIp;
    }
    state.masterInfo = new sparateObj(
      master.id,
      master.userName,
      master.roles,
      master.avatar,
      master.email,
      master.sign,
      master.state,
      master.createTime,
      master.updateTime,
      master.regIp,
      master.loginIp);
    console.log(state.masterInfo)
  }


}

