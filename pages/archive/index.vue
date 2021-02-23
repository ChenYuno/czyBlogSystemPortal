<template>
    <div>
      <div class="archive-head-bg">
        <img src="../../assets/images/archiveBg.jpg"/>
      </div>

      <div class="archive-main-box">

        <div id="waves">
          <svg class="archive-page-waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
               viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
            </defs>
            <g class="archive-parallax">
              <use xlink:href="#gentle-wave" x="48" y="0"></use>
              <use xlink:href="#gentle-wave" x="48" y="3"></use>
              <use xlink:href="#gentle-wave" x="48" y="5"></use>
              <use xlink:href="#gentle-wave" x="48" y="7"></use>
            </g>
          </svg>
        </div>
        <div class="archive-main">
          <div class="archive-page-title">
            文章归档
          </div>
          <div class="select-watch-archive">

            <el-collapse v-model="archiveYear" accordion>
              <el-collapse-item
                v-for="(itemY,index) in archiveArticlesData" :key="index"
                :title="itemY.year"
                :name="itemY.year">
                <div style="padding: 20px">
                  <el-collapse v-model="archiveMonth" accordion v-for="(itemM,index) in itemY.months" :key="index" @click="changeArchiveMonth(itemM.month)">
                    <el-collapse-item :title="itemM.month" :name="itemM.month">
                      <el-row>
                        <el-col :span="8" v-for="(o, index) in itemM.articles" :key="o" :offset="index > 0 ? 2 : 0">
                          <el-card :body-style="{ padding: '0px' }">
                            <img :src="baseUrl+'/portal/image/'+o.cover" class="image">
                            <div style="padding: 14px;">
                              <span style="color: #f54c6e">文章标题：{{o.title}}</span>
                              <div class="article-date-box">&nbsp;
                                <i class="iconfont icon-icon">创建:</i>
                                <span>{{o.createTime}}</span>
                                <i class="iconfont icon-icon"> 最近更新:</i>
                                <span>{{o.updateTime}}</span>
                                <i class="fa fa-eye" aria-hidden="true">浏览数:</i>
                                <span>{{o.viewCount}}</span>
                              </div>
                              <p>文章摘要：{{o.summary}}</p>
                              <div class="archive-items-tags-cloud bottom clearfix">
                                <a class="time"
                                   v-for="(l,index) in o.label" :key="index"
                                @click="articlesListTagSearch(l)">{{'#'+ l }}</a>
                                <el-button type="text" class="button" @click="readArticle(o.id)">阅读</el-button>
                              </div>
                            </div>
                          </el-card>
                        </el-col>
                      </el-row>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </el-collapse-item>

            </el-collapse>





          </div>
        </div>
      </div>








      <!-- 底部的裙子和时间还有备案信息 -->
      <div class="dress-bottom-archive-links-box">
        <div class="list-bottom-image-archive-links"></div>
      </div>
      <div class="archive-links-footer">

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

    export default {
        name: "index",
      head() {
        return {
          title: '陈展云的博客-文章归档',
          meta: [
            {
              hid: 'description',
              name: 'description',
              content: '陈展云的博客-文章归档'
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
        let archiveOriginalData = await articleApi.getArchiveArticles();
        let archivePreDuleData = archiveOriginalData.data.data.data;
        let duleDataY = [];
        for (let yearData in archivePreDuleData) {
          let tempDataY = {
            year:yearData,
            months: []
          };
          for (let monthData in archivePreDuleData[yearData]) {
            let tempDataM = {
              month:monthData,
              articles:archivePreDuleData[yearData][monthData]
            };
            console.log(tempDataM.month);
            console.log(tempDataM.articles);
            tempDataY.months.push(tempDataM);
          }
          duleDataY.push(tempDataY);
        }
        return {
          archiveArticlesData: duleDataY
        }
      },
      data() {
          return{
            archiveYear: '1',
            archiveMonth: '',
            archiveArticlesData: [],
          }
      },
      methods:{
        changeArchiveMonth(month) {
          this.archiveMonth = month;
        },
        articlesListTagSearch(label){
          // location.href = `/search?keyword=${label}`;
          window.open(`/search?keyword=${label}`);
        },
        readArticle(articleId) {
          location.href = '/article/' + articleId;
        }
      },
      mounted() {
        this.$store.commit('setCurrentActiveTab', 'archive');
        this.archiveYear = this.archiveArticlesData.length > 0 ?
          this.archiveArticlesData[0].year : '';
      }
    }
</script>

<style lang="less">

  .archive-items-tags-cloud{
    padding: 10px;
    padding-bottom: 5px;
    a{
      border-radius: 10px;
      padding: 5px 10px;
      color: #fff;
      font-size: 12px !important;
      display: inline-block;
      margin-bottom: 5px;
    }
    & a:hover{
      transition: all .3s;
      box-shadow:  0 5px 6px #282727;
    }
    & a:nth-child(7n+1) {
      background-color: rgba(255, 78, 106, 0.15);
      color: rgba(255, 78, 106, 0.8);
    }
    & a:nth-child(7n+2) {
      background-color: rgba(255, 170, 115, 0.15);
      color: #ffaa73;
    }
    & a:nth-child(7n+3) {
      background-color: rgba(254, 212, 102, 0.15);
      color: #fed466;
    }
    & a:nth-child(7n+4) {
      background-color: rgba(60, 220, 130, 0.15);
      color: #3cdc82;
    }
    & a:nth-child(7n+5) {
      background-color: rgba(100, 220, 240, 0.15);
      color: #64dcf0;
    }
    & a:nth-child(7n+6) {
      background-color: rgba(100, 185, 255, 0.15);
      color: #64b9ff;
    }
    & a:nth-child(7n+7) {
      background-color: rgba(180, 180, 255, 0.15);
      color: #b4b4ff;
    }
  }
  //========================================
  .time {
    font-size: 13px;
    color: #999;
    margin-left: 4px;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  //========================================


  .select-watch-archive .el-collapse-item__header{
    font-size: 24px;
  }
  .archive-page-title {
    font-size: 30px;
    padding: 20px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-family: 'Droid Sans Mono', monospace;
    font-weight: 900;
    color: #f54c6e;
  }
  .archive-links-footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100px;
    color: white;
    background-color: #282727;
    text-align: center;
  }
  .list-bottom-image-archive-links {
    background: url(https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@master/img/webp/footer.webp) no-repeat 50%;
    height: 368px;
    z-index: 1;
    width: 100%;
    position: absolute;
    pointer-events: none;
    left: 0;
    bottom: -76px;
  }
  .dress-bottom-archive-links-box {
    width: 100%;
    height: 200px;
    position: relative;
    background-color: #fff;
  }
  .archive-main-box{
    background-color: #fff;
  }
  .archive-main {
    width: 74%;
    margin: 0 auto;
    border-radius: 26px;
    box-shadow: 0 0 12px #0a001f;
    min-height: 700px;
  }
  .archive-page-waves {
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
    .archive-page-waves {
      height: 10vh;
      left: 0;
      top: -10vh;
    }
  }

  .archive-parallax > use:nth-child(1) {
    -webkit-animation-delay: -2s;
    animation-delay: -2s;
    -webkit-animation-duration: 7s;
    animation-duration: 7s;
    fill: rgba(255, 255, 255, .7);
  }

  .archive-parallax > use:nth-child(2) {
    -webkit-animation-delay: -3s;
    animation-delay: -3s;
    -webkit-animation-duration: 10s;
    animation-duration: 10s;
    fill: rgba(255, 255, 255, .5);
  }

  .archive-parallax > use:nth-child(3) {
    -webkit-animation-delay: -4s;
    animation-delay: -4s;
    -webkit-animation-duration: 13s;
    animation-duration: 13s;
    fill: rgba(255, 255, 255, .3);
  }

  .archive-parallax > use:nth-child(4) {
    -webkit-animation-delay: -5s;
    animation-delay: -5s;
    -webkit-animation-duration: 20s;
    animation-duration: 20s;
    fill: #fff;
  }

  @-webkit-keyframes waveArchivePage {
    0% {
      transform: translate3d(-90px, 0, 0);
    }

    100% {
      transform: translate3d(85px, 0, 0);
    }
  }



  .archive-parallax > use {
    -webkit-animation: waveArchivePage 25s cubic-bezier(.55, .5, .45, .5) infinite;
    animation: waveArchivePage 25s cubic-bezier(.55, .5, .45, .5) infinite;
  }

  .archive-head-bg {
    position: sticky;
    top: 0;
    z-index: -1;

    img {
      width: 100%;
      height: 700px;
    }
  }
  @media screen and (max-width: 660px) {
    .archive-head-bg img {
      height: 18rem;

    }
    .archive-main {
      width: 100%;
    }
  }
</style>
