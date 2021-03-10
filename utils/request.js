import axios from 'axios'
import {Notification} from 'vuesax'
// 创建一个axios实例
const service = axios.create({
  // headers: {
  //   'content-type': 'application/json;charset=UTF-8',
  //   'token': 'one'
  // },
  baseURL: process.client?'':'http://localhost:8231',//TODO:For your configuration
  withCredentials: true,
  timeout: 5000
})

// 添加请求拦截器
service.interceptors.request.use(config => {
  // 在发送请求之前做某事，比如说 设置token
  // config.headers['token'] = 'token';
  //config.headers['X-Token'] = 'xxxxxxxxxxxxxxxxxxx';
  return config;
}, error => {
  // 请求错误时做些事
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(response => {
  const res = response.data;
  // 如果返回的状态不是20000 就主动报错
  if(res.code === 20000){

    // Notification({
    //   duration:1000,
    //   width:'100%',
    //   position: 'top-center',
    //   color:'success',
    //   title: 'czy提示：请求成功Σ(⊙▽⊙"a',
    //   text: '你需要的信息获取成功了(test)!!!'
    // })
  }
  else if (res.code===20020) {

  }else{

    // Notification({
    //   duration:1000,
    //   width:'100%',
    //   position: 'top-center',
    //   color:'danger',
    //   title: 'czy提示：系统错误Σ(⊙▽⊙"a',
    //   text: '系统繁忙，麻烦稍后再试...'
    // })
  }
  return response;
}, error => {

  return Promise.reject(error); // 返回接口返回的错误信息
})

export default service
