<template>
  <div style="width: 100%;background-color: #22262c;">
    <div class="home-first-big-bg-box">
      <img
        class="home-first-big-bg"
        :src="homePageHeadImageUrl">
      <div class="typed-content">
        <vue-typed-js
          :showCursor="true"
          :backDelay="2000"
          :backSpeed="60"
          :typeSpeed="100"
          :loop="true"
          :startDelay="1000"
          :strings="['Live a good life, write some good code !!!',
                            '愿自己的努力终将获得回报','花开不是为了花落，而是为了开的更加灿烂。',
                            '没有伞的孩子必须努力奔跑！','欲望以提升热忱，毅力以磨平高山。',
                            '如果放弃太早，你永远都不知道自己会错过什么。',
                            '没有礁石，就没有美丽的浪花；没有挫折，就没有壮丽的人生。']">
          <span class="typing"></span>
        </vue-typed-js>
      </div>

      <div class="home-web-individual-show">
        <div class="package-action-circle">
          <img :src="$store.state.masterInfo.avatar?$store.state.masterInfo.avatar:'https://my-avatar-guli.oss-cn-shenzhen.aliyuncs.com/2020/06/14/9569d64c02114e07aa82648e4dfdf53001.gif'"
               class="home-web-individual-avatar">


          <div class="home-package-action-icon">
            <i class="fa fa-quote-left fa-2x shan" aria-hidden="true"></i>
            <a href="https://github.com/blackAndWhiteLotus" target="_blank"><i style="color: white;background-color: #282727;padding: 3px;border-radius: 12px"
                           class="fa fa-github fa-2x hovericon"></i></a>
            <el-popover
              placement="top"
              width="200"
              trigger="hover">
              <div><img style="height: 200px;width: 200px" src="../assets/images/mywechat.jpg"/></div>
              <i slot="reference" style="color: white;background-color: #64e864;padding: 3px;border-radius: 12px"
                              class="fa fa-weixin fa-2x hovericon"></i>
            </el-popover>

            <el-popover style="margin-left: 10px"
              placement="top"
              width="200"
              trigger="hover">
              <div><img style="height: 200px;width: 200px" src="../assets/images/QQ.jpg"/></div>
              <i slot="reference" style="color: white;background-color: #6face2;padding: 3px;border-radius: 12px"
                 class="fa fa-qq fa-2x hovericon"></i>
            </el-popover>

<!--            <a href="#"> <i style="color: white;background-color: #6face2;padding: 3px;border-radius: 12px"-->
<!--                            class="fa fa-qq fa-2x hovericon"></i></a>-->
            <i class="fa fa-quote-right fa-2x shan" aria-hidden="true"></i>
          </div>
          <div class="home-package-action-search">
            （°▽°）つ搜索:
            <vs-input class="home-search-input" @keydown.enter.native="doSearch"
                      label-placeholder="搜索点什么" :loading="loading"
                      v-model="search" dark state="primary"
            ></vs-input>
          </div>


        </div>
      </div>
    </div>


    <div class="articles-main">
      <div id="waves"><svg class="home-page-waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto"><defs><path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path></defs><g class="home-parallax"><use xlink:href="#gentle-wave" x="48" y="0"></use><use xlink:href="#gentle-wave" x="48" y="3"></use><use xlink:href="#gentle-wave" x="48" y="5"></use><use xlink:href="#gentle-wave" x="48" y="7"></use></g></svg></div>


      <div class="home-second-description"><span class="doudon-second-description">{{hitokoto}}<span class="my-face">∠(´д｀)</span></span>
      </div>
      <div class="tip-box mdui-ripple" v-if="articleListData">
        <div>当前页文章数:{{pagination.currentPage
          ===1&&currCategoryId===''?articleListData.records.length+topArticles.length:articleListData.records.length}}
        </div>
        <div v-if="currCategoryId">当前查询的分类:{{showSelectCategoryName}}</div>
      </div>

      <!-- 文章列表 -->
      <div class="articles-main-inner">


        <div class="content-wrap">


            <!-- 置顶文章-->

            <div :id="`articles_list_${index}_top`" class="content-article-list"
                 v-if="pagination.currentPage === 1 && currCategoryId===''" v-for="(topItem,index) in topArticles"
                 :key="index">
              <a :href="`/article/${topItem.id}`">
              <div class="article-list-cover-box mdui-ripple">
              <img class="article-list-cover" :src="baseUrl+'/portal/image/'+topItem.cover">
              </div>

              <div class="colorful-circle-box">
                <div class="colorful-circle-inner"><span>top</span></div>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>


              <div class="post-title">
                <h2 class="title-content">
                  {{topItem.title}}
                </h2>

              </div>
              </a>


              <div class="article-tags" style="display: inline-block">
              <span @click="articlesListTagSearch(l)"
                v-for="(l,index) in item.labels.indexOf('-') === -1 ? new Array(item.labels) : item.labels.split('-')"
                :key="index">
              {{l}}
              </span>
              </div>

              <div class="article-date-box">&nbsp;
                <i class="iconfont icon-icon">创建:</i>
                <span>{{topItem.createTime}}</span>
                <i class="iconfont icon-icon"> 最近更新:</i>
                <span>{{topItem.updateTime}}</span>
                <i class="fa fa-eye" aria-hidden="true">浏览数:</i>
                <span>{{topItem.viewCount}}</span>
              </div>


              <div class="article-summary-box">
                <div class="summary-content-box">
                  &emsp;✐ ᵕ̈ 摘要 (っ'-')╮=͟͟͞͞ &nbsp; ：{{topItem.summary}}
                </div>
              </div>


            </div>
          <!-- oooo-->


            <div :id="`articles_list_index_${index}`" class="content-article-list"
                 v-for="(item,index) in articleListData.records" :key="index">
              <a :href="`/article/${item.id}`">
              <div class="mdui-ripple article-list-cover-box">
                <img class="article-list-cover" :src="baseUrl+'/portal/image/'+item.cover">
              </div>

              <div class="post-title">
                <h2 class="title-content">
                  {{item.title}}
                </h2>
              </div>
              </a>


              <div class="article-tags" style="display: inline-block">
              <span @click="articlesListTagSearch(l)"
                v-for="(l,index) in item.labels.indexOf('-') === -1 ? new Array(item.labels) : item.labels.split('-')"
                    :key="index">
              {{l}}</span>
              </div>

              <div class="article-date-box">&nbsp;
                <i class="iconfont icon-icon">创建:</i>
                <span>{{item.createTime}}</span>
                <i class="iconfont icon-icon"> 最近更新:</i>
                <span>{{item.updateTime}}</span>
                <i class="fa fa-eye" aria-hidden="true">浏览数:</i>
                <span>{{item.viewCount}}</span>
              </div>


              <div class="article-summary-box">
                <div class="summary-content-box">
                  &emsp;✐ ᵕ̈ 摘要 (っ'-')╮=͟͟͞͞ &nbsp; ：{{item.summary}}
                </div>
              </div>
            </div>
          <div class="center con-pagination">
            <vs-pagination progress circle :color="'rgba(255,78,106,0.85)'" :dotted-number="5"
                           @input="changePagination"
                           v-model="pagination.currentPage"
                           :length="pagination.totalPage"/>
          </div>

          <div class="wrap-bottom-dress-image-box">
            <div class="list-bottom-image"></div>
          </div>
          <div class="home-bottom-hitokoto">
            <div>[ [ 埋骨何须桑梓地<span class="my-face"> ❤️</span>人生无处不青山 ] ]</div>
            <div>
              本站已
              <span class="timeDate"></span>
              <span class="times"></span>
              <span class="my-face"> ღゝ◡╹)ノ♡</span>
            </div>
            <div>Copyright © 2020-2021 czyBlog Powered by czystudy.com Core on NUXTJS</div>

            <div >
              <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44190002005367" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;color: black">
                <img src="../assets/images/beian.png"/>粤公网安备 44190002005367号&nbsp;&nbsp;粤ICP备2021019933号-1
              </a>
            </div>

          </div>
        </div>


      </div>


      <!-- 旁边的滑动东西 -->
      <!--      <div class="sidebar-toggle"></div>-->

      <div class="sidebar-inner">


        <div class="size-over-view mdui-ripple">

          <img :src="sidebarBgUrl" class="size-over-view-smallBg">
          <div class="websize-sidebar-number-msg">
            <div class="blog-name">{{webSizeTitle}}</div>
            <div class="my-name">{{$store.state.masterInfo.userName}}</div>
            <div class="my-sign">{{$store.state.masterInfo.sign}}</div>
            <div class="blog-msg-title">
              <div>文章:</div>
              <div>访问量:</div>
            </div>
            <div class="blog-msg-data">
              <div>{{publishArticlesTotalCount}}</div>
              <div>{{webSizeViewCount}}</div>
            </div>
          </div>

        </div>
        <div class="size-over-view-top">
          <span
            style="position: relative;height: 30px;width: 40px;float: left;padding-bottom: 10px">&emsp;&emsp;分类:</span>
          <div class="home-categories-select-box" :id="`category_${category.id}`"
               v-for="(category,index) in categories" :key="index"
               @click="listArticleByCategoryId(category)">
            {{category.name}}
          </div>
        </div>

        <div class="sidebar-plugin">
          &emsp;&emsp;热门标签🏷:
          <wordcloud
            :rotate="{from: -45, to: 45, numOfOrientation: 10 }"
            :margin="margin"
            :fontsize="fontsize"
            :data="hotLabels"
            nameKey="name"
            valueKey="count"
            :showTooltip="false"
            :wordClick="wordClickHandler">
          </wordcloud>

        </div>
        <div class="size-over-view-advice">
          <div class="home-page-advice">文章通知:</div>
          <div class="home-page-advice-content">{{advice}}</div>
        </div>

        <div class="clumsy-girl-box">
          <img src="~/assets/images/kawayi.gif" class="clumsy-girl">
        </div>


      </div>

    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import homeApi from "../api/homeApi";


  export default {
    head() {
      return {
        title: '陈展云的博客',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: '陈展云的博客,生活、杂谈和技术博客，主要包括系统定制(AOSP)，JavaWeb开始，前端，后端，运维，计算机硬件和计算机软件的研究，生活百味，面试，程序员，学习，习惯，爱好，运动'
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: '陈展云,博客,java,spring,spring-boot,开发,毕业设计,博客系统,程序员,docker,linux,电脑硬件,电脑软件,kubernetes,vue,nuxtjs,vuejs,js,javascript,html,css,less,rabbitmq,源码'
          }
        ]
      }
    },
    async asyncData({param}) {
      // let masterInfo;
      // homeApi.getMasterInfo()
      //   .then(res => {
      //     masterInfo = res.data.data.user
      //   })

      let articleListData;
      await homeApi.getArticles(1, 10, '')
        .then(res => {
          if (res.data.code === 20000) {//item.labels.indexOf('-')===-1?new Array(item.labels):item.labels.split('-')

            articleListData = res.data.data.data

          }
        });


      let categories;
      await homeApi.getCategories().then(res => {
        if (res.data.code === 20000) {
          categories = res.data.data.data
        }
      });
      let previousAlltoCategoriesDule =
        {
          id: '',
          name: '全部分类'
        };
      categories.unshift(previousAlltoCategoriesDule);
      let webSizeTitle = await homeApi.getWebSizeTitle();
      let webSizeViewCount = await homeApi.getWebSizeViewCount();
      let description = '';
      let keywords = [];
      await homeApi.getWebSizeSeo().then(res => {
        if (res.data.code === 20000) {
          description = res.data.data.web_size_description ? res.data.data.web_size_description : '网站的主人还没设置网站的描述呢。。。';
          keywords = res.data.data.web_size_keywords ? res.data.data.web_size_keywords.split(',') : ['关键词待定'];
          console.log('description============');
          console.log(description);
          console.log('keywords============');
          console.log(keywords);
        }
      });
      let hotLabels = await homeApi.getHotLabels(10);
      let topArticles = await homeApi.getTopArticles();

      let publishArticlesTotalCount = await homeApi.getTotalArticlesPublishCount();
      const {data} = await axios.get('https://v1.hitokoto.cn?c=c&encode=utf-8')
      // if (process.client) {
      //   console.log('客户端在请求。。。');
      // }

      let advice = await homeApi.getBlogAdvice();

      console.log(data);
      return {
        advice: advice.data.data.data,
        publishArticlesTotalCount: publishArticlesTotalCount.data.data.data,
        hotLabels: hotLabels.data.data.data?hotLabels.data.data.data:[],
        topArticles: topArticles.data.data.data?topArticles.data.data.data:[],
        webSizeSeo: {
          web_size_description: description,
          web_size_keywords: keywords
        },
        webSizeViewCount: webSizeViewCount.data.data.data,
        webSizeTitle: webSizeTitle.data.data.web_size_title,
        hitokoto: data.hitokoto,
        articleListData: articleListData,
        categories: categories,
        pagination: {
          currentPage: articleListData.currentPage,
          totalCount: articleListData.totalCount,
          pageSize: articleListData.pageSize,
          totalPage: articleListData.totalPage,
          hasPrevious: articleListData.hasPrevious,
          hasNext: articleListData.hasNext
        },
      };
    },
    data() {
      return {
        advice: '',
        selectingCategory: {},
        publishArticlesTotalCount: 0,
        showSelectCategoryName: '',
        currCategoryId: '',
        hotLabels: [],
        fontsize: [20, 30],
        margin: {top: 0, right: 0, bottom: 0, left: 0},
        topArticles: [],
        pagination: {
          currentPage: 1,
          totalCount: 0,
          pageSize: 10,
          totalPage: 0,
          hasPrevious: false,
          hasNext: false
        },
        webSizeSeo: {
          web_size_description: '',
          web_size_keywords: []
        },
        webSizeViewCount: 0,
        webSizeTitle: '',
        categories: '',
        articleListData: {},
        hitokoto: '',
        active: 0,
        loading: false,
        search: '',
        sidebarBgUrl: require('../assets/images/sidebarBgUrl.jpg'),
        homePageHeadImageUrl: require('../assets/images/homeHeadBg.jpg'),
        articleCover: require('../assets/images/defaultArticleCover.jpg'),

      }
    },
    methods: {
      articlesListTagSearch(label){
        // location.href = `/search?keyword=${label}`;
        window.open(`/search?keyword=${label}`);
      },
      listArticleByCategoryId(category) {
        if (this.currCategoryId === category.id) {
          return;
        }
        //this.pagination.currentPage = 1;
        let docCategoryId = `category_${category.id}`;
        if (docCategoryId !== this.selectingCategory.id) {
          this.selectingCategory.className = 'home-categories-select-box';
          this.selectingCategory = document.getElementById(docCategoryId);
          this.selectingCategory.className = 'home-categories-select-box category-selecting';
        }


        this.currCategoryId = category.id;
        this.showSelectCategoryName = category.name
        homeApi.getArticles(1, 10, this.currCategoryId).then(res => {
          this.articleListData = res.data.data.data;
          this.pagination = {
            currentPage: res.data.data.data.currentPage,
            totalCount: res.data.data.data.totalCount,
            pageSize: res.data.data.data.pageSize,
            totalPage: res.data.data.data.totalPage,
            hasPrevious: res.data.data.data.hasPrevious,
            hasNext: res.data.data.data.hasNext
          }

          let sidebar = document.querySelector('.sidebar-inner');
          console.log(this.articleListData.records.length)
          if (this.articleListData.records.length === 0) {
            sidebar.style['position'] = 'fixed';
            sidebar.style['overflow'] = 'hidden auto';
            sidebar.style['top'] = '270px';
            sidebar.style['right'] = '0';
            sidebar.style['bottom'] = '0';
          } else {
            sidebar.style.position = 'sticky';
            sidebar.style.right = '0';
          }
        })
      },
      wordClickHandler(name, value, vm) {
        console.log('wordClickHandler', name, value, vm);
        location.href = "/search?keyword=" + encodeURIComponent(name);
      },
      changePagination(page) {
        console.log(page)
        var size = 10;
        homeApi.getArticles(page, size, this.currCategoryId).then(res => {
          this.articleListData = res.data.data.data;
          this.pagination = {
            currentPage: res.data.data.data.currentPage,
            totalCount: res.data.data.data.totalCount,
            pageSize: res.data.data.data.pageSize,
            totalPage: res.data.data.data.totalPage,
            hasPrevious: res.data.data.data.hasPrevious,
            hasNext: res.data.data.data.hasNext
          }
          let paginationToTop = document.querySelector('.home-second-description');
          if (paginationToTop) {
            paginationToTop.scrollIntoView({
              block: 'start',
              behavior: 'smooth'
            })
          }
        });
      },
      doSearch() {
        window.location.href = `/search?categoryId=&keyword=${encodeURIComponent(this.search)}&page=1&size=5&sort=`
        // this.$router.push({
        //   path:'/search',
        //   query:{
        //     categoryId: '',
        //     keyword: encodeURIComponent(this.search),
        //     page:1,
        //     size:10,
        //     sort: ''
        //   }
        // })

        // this.loading = true;
        // let that = this;
        // setInterval(function () {
        //   that.loading = false;
        // }, 2000);


        // const loading = this.$vs.loading({
        //   type: 'square'
        // })
        // setTimeout(() => {
        //   loading.close()
        // }, 3000)

      },
    },
      mounted() {
        this.currwindow = window;

        // console.log(this.topArticles);
        // let categoriesSelect = document.getElementById('category_');
        // this.selectingCategory = categoriesSelect;
        // this.selectingCategory.className = 'home-categories-select-box category-selecting';
        this.$store.commit('setCurrentActiveTab', 'index');




      },
  }
</script>

<style lang="less">
  .home-package-action-search {
    background-color: #fff;
    margin: 30px;
  }

  .home-categories-select-box {
    box-shadow: 2px 2px 0 #8c8c8c,
    4px 4px 0 #8c8c8c,
    1px 1px 0 #8c8c8c,
    3px 3px 0 #8c8c8c,
    5px 5px 0 #8c8c8c;
    background-color: #fff;
    font-size: 20px;
    font-weight: 600;
    width: 200px;
    border-radius: 15px;
    line-height: 50px;
    height: 50px;
    color: #282727;
    margin-bottom: 20px;

    &:hover {
      /*box-shadow: none;*/
      /*transition: all .5s;*/
      animation: backgroundColorLeftToRight forwards;
      animation-duration: 1s;
    }
  }
  @keyframes backgroundColorLeftToRight {
    from {
      background-position: -100% 0;
      /*background-image: url('https://cdn.jsdelivr.net/gh/XiaoLFeng/Blog_Things@master/static/Image/smilies/xiaoren%20(15).JPG');*/
    }
    to{
      background-position: center;
      background-image :url('https://cdn.jsdelivr.net/gh/XiaoLFeng/Blog_Things@master/static/Image/smilies/xiaoren%20(15).JPG');
    }
  }

  .category-selecting {
    background-color: lightpink;
    transition: all 1s;
    box-shadow: none;
  }

  .wordCloud .text {
    cursor: pointer;
  }

  .colorful-circle-box {
    position: absolute;
    left: -80px;
    top: -65px;
    height: 220px;
    width: 220px;
    border-radius: 50%;
    background: linear-gradient(#14ffe9, #ffeb3b, #ff00e0);
    animation: frotate 1.5s infinite linear;

    & > span {
      position: absolute;
      height: 220px;
      width: 220px;
      border-radius: 50%;
      background: linear-gradient(#14ffe9, #ffeb3b, #ff00e0);

      &:nth-child(1) {
        filter: blur(5px);
      }

      &:nth-child(2) {
        filter: blur(10px);
      }

      &:nth-child(3) {
        filter: blur(25px);
      }

      &:nth-child(4) {
        filter: blur(150px);
      }
    }

  }

  @keyframes frotate {
    from {
      filter: hue-rotate(0deg);
    }
    to {
      filter: hue-rotate(360deg);
    }
  }

  .colorful-circle-inner {
    z-index: 10;
    position: absolute;

    top: 10px;
    left: 10px;
    transform: rotate(-45deg);

    & > span {
      display: inline-block;
      text-shadow: 0 0 50px #fff;

      &:hover {
        animation: common-animation 1.5s infinite alternate;
      }
    }

    background-color: #282727;

    color: red;
    font-weight: 900;
    font-size: 45px;
    line-height: 200px;
    text-align: center;
    height: 200px;
    width: 200px;
    border-radius: 50%;
  }

  @media screen and(max-width: 660px) {
    .colorful-circle-box {
      height: 170px;
      width: 170px;
      left: -60px;
      top: -45px;
    }

    .colorful-circle-box > span {
      height: 170px;
      width: 170px;
    }

    .colorful-circle-inner {
      line-height: 150px;
      height: 150px;
      width: 150px;
    }
  }

  .blog-msg-title {
    color: rgba(255, 78, 106, 0.85)
  }

  .blog-msg-data {
    color: cyan;
  }

  .blog-msg-title, .blog-msg-data {
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .my-sign, .my-name {
    font-size: 20px;
    color: white;
    text-align: center;
    width: 100%;
  }

  .blog-name {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    font-size: 24px;
    font-weight: 300;
    color: white;
    text-shadow: 1px 1px 1px #d3d3d3,
    2px 2px 1px #d4d4d4,
    3px 3px 1px #d5d5d5;
  }

  .summary-content-box {
    padding: 35px;
    padding-top: 9px;
  }

  .article-summary-box {
    width: 100%;
    height: 144px;
    border-bottom-right-radius: 35px;
    border-bottom-left-radius: 35px;

    background-color: rgba(221, 221, 221, .5);
  }

  .article-date-box {
    margin: 5px;
    padding: 5px;

    span {
      margin: 0 5px;
    }
  }

  .article-tags {
    padding-left: 10px;
    span:hover{
      box-shadow: 10px 0 10px #282727;
      transition: all .6s;
    }
    span:before {
      content: '#';

    }
  }


  .clumsy-girl-box {
    width: 100%;
    height: 200px;
    padding: 10px;

    .clumsy-girl {
      width: 100%;
      height: 200px;
      border-radius: 35px;
      box-shadow: 0 0 10px #dddddd;

    }
  }

  .websize-sidebar-number-msg {
    width: 100%;
    height: 160px;
  }

  .doudon-second-description:hover {
    animation: common-animation 1.5s infinite alternate;
    display: inline-block;
  }

  .home-second-description {
    position: absolute;
    height: 100px;
    color: white;
    background: transparent;
    top: -34px;
    left: 0;
    right: 0;
    line-height: 100px;
    text-align: center;
    margin: 0 auto;
  }

  .tip-box {
    position: absolute;
    background: rgba(255, 255, 255, .9);
    border-radius: 12px;
    animation: frotate 1.5s linear infinite;
    height: 80px;
    width: 250px;
    color: #000;
    top: 30px;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }


  .wrap-bottom-dress-image-box {
    width: 100%;
    background: transparent;
    height: 278px;
    position: relative;
  }

  .list-bottom-image {
    background: url(https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@master/img/webp/footer.webp) no-repeat 50%;
    height: 368px;
    z-index: 1;
    width: 100%;
    position: absolute;
    pointer-events: none;
  }

  .size-over-view-smallBg {
    width: 100%;
    height: 100%;
    border-radius: 35px;
    box-shadow: 0 0 10px #dddddd;
    display: block;
  }

  .home-bottom-hitokoto {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #fff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    width: 100%;
    height: 100px;
    font-family: 'pao', 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    box-shadow: 0 0 12px rgba(200, 200, 200, .8);
    text-align: center;
    color: #343434;
    text-shadow: 0 0 10px rgba(250, 200, 200, .8);
    bottom: -15px;
    position: relative;
  }

  .post-title {
    left: 20px;
    position: relative;
    color: rgba(255, 78, 106, 0.85);
    font-size: 20px;
  }

  .post-title .title-content:before {
    content: "";
    width: calc(100% - 40px);
    border-bottom: 1px solid #d9d9d9;
    box-shadow: 0 0 3px #d4d4d4;
    position: absolute;
    bottom: -1px;

  }

  .post-title .title-content:after {
    transition: all 0.35s;
    content: "";
    position: absolute;
    background: rgba(255, 78, 106, 0.85);
    width: 1em;
    height: 5px;
    bottom: -3px;
    left: 0;
    border-radius: 6px;
    box-shadow: 0 2px 12px rgba(255, 78, 106, 0.85);
  }

  .post-title .title-content:hover:after {
    width: 2em;
  }

  .article-list-cover-box{
    position: relative;
    width: 90%;
    height: 60%;
    border-radius:35px;
    margin: 10px auto;
  }
  .article-list-cover {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;

    display: block;
    border-radius: 35px 35px;
  }

  .articles-main {
    position: sticky;
    background: #22262c;
    top: 0;
    z-index: 190;
    width: 100%;
    min-height: 800px;
    display: table;
    margin: 0;
    padding: 0;
  }

  .articles-main-inner {
    padding: 0;
    width: 80%;
    margin: 0 auto;
    clear: both;
  }

  .articles-main-inner:after {
    content: '';
    clear: both;
  }

  .home-page-box-shadow() {
    box-shadow: 3px 3px 1px rgba(24, 24, 24, .8),
    5px 5px 2px rgba(0, 0, 0, .8),
    7px 7px 3px rgba(0, 0, 0, .8),
    9px 9px 4px rgba(0, 0, 0, .8),
    11px 11px 5px rgba(0, 0, 0, .8),
    13px 13px 6px rgba(0, 0, 0, .8);
  }

  .content-wrap {
    display: table-cell;
    background-color: rgba(12, 12, 12, .6);
    border-radius: 5px;
    padding: 18px;
    .home-page-box-shadow;
    width: calc(100% - 330px);
    float: left;
    box-sizing: border-box;
    min-height: 700px;
    a{
      text-decoration: none;
      cursor: url(https://cdn.lixingyong.com/img/Sakura/cursor/No_Disponible.cur), auto;
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

  @media screen and (max-width: 660px) {
    .content-wrap {
      padding: 0;
      padding-top: 40px;
      box-shadow: none;
      background-color: #23272c;

    }
  }

  .content-article-list {
    position: relative;
    padding-top: 10px;
    width: 100%;
    border-radius: 35px;
    margin-bottom: 30px;
    height: 700px;
    display: block;
    background-color: rgba(255, 230, 200, 1);
    box-shadow: 0 0 12px #dddddd;
    overflow: visible;
  }

  .sidebar-inner {
    width: 300px;
    position: sticky;
    float: right;
    margin-right: 10%;
    box-sizing: border-box;

    padding: 10px;

    & > div {
      .home-page-box-shadow;
      background-color: rgba(12, 12, 12, .3);
      border-radius: 35px;
      margin-bottom: 30px;
    }

    background-color: transparent;
    box-shadow: none;
    border-radius: 35px;
  }


  .size-over-view {
    width: 100%;
    min-height: 200px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }
  .size-over-view-advice {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 30px;
    min-height: 200px;
  }
  .home-page-advice{
    color: #f54c6e;
    font-size: 16px;
  }
  .home-page-advice-content {
    margin: 10px;
    border-radius: 6px;
    color: #0a001f;
    background-color: #fff;
    min-height: 100px;
  }

  .size-over-view-top {
    margin-top: 20px;

    color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    & > div {
      text-align: center;
    }

    background-color: #343434;
    border-radius: 35px;
    box-shadow: 0 0 10px #d4d4d4;
  }

  .sidebar-plugin {
    color: #dddddd;
    width: 100%;
    background-color: transparent;

  }

  @media screen and (max-width: 1560px) {
    .content-article-list {
      height: 550px;
    }

    .article-summary-box {
      height: 85px;
    }
  }

  @media screen and (max-width: 1200px) {


    .sidebar-inner {
      display: none;
    }

    .content-wrap {
      width: 100%;
    }


  }

  @media screen and (max-width: 770px) {
    .article-summary-box {
      height: 66px;
    }
  }

  @media screen and (max-width: 660px) {
    .article-summary-box {
      height: 84px;
    }

    .content-article-list {
      height: 550px;
    }

    .articles-main-inner {
      width: 100%;
    }

    .content-wrap {
      width: 100%;
    }

    .content-article-list {
      box-shadow: 0 0 12px #dddddd;
    }

    .home-first-big-bg-box {
      background-color: rgba(2350, 230, 200, .45);
    }
  }

  @media screen and (max-width: 582px) {
    .article-summary-box {
      height: 68px;
    }
  }

  .shan {
    animation: alternate infinite shan .7s;
  }

  @keyframes shan {
    from {
      color: #282727;
    }
    to {
      color: transparent;
    }
  }

  @media screen and (min-width: 660px) {

    .live2d-widget-container {
      display: unset;
    }
  }

  .tooltip {
    display: none;
  }



  .home-page-waves {
    width: 100%;
    height: 15vh;
    margin-bottom: -.6875rem;
    min-height: 3.125rem;
    max-height: 9.375rem;
    position: relative;
    left: 0;
    top: -14vh;
  }

  @media (max-width:767px) {
    .home-page-waves {
      height: 10vh;
      left: 0;
      top: -10vh;
    }

  }


  .home-parallax>use:nth-child(1) {
    -webkit-animation-delay: -2s;
    animation-delay: -2s;
    -webkit-animation-duration: 7s;
    animation-duration: 7s;
    fill: rgba(34, 38, 44, .7);
  }

  .home-parallax>use:nth-child(2) {
    -webkit-animation-delay: -3s;
    animation-delay: -3s;
    -webkit-animation-duration: 10s;
    animation-duration: 10s;
    fill: rgba(34, 38, 44, .5);
  }

  .home-parallax>use:nth-child(3) {
    -webkit-animation-delay: -4s;
    animation-delay: -4s;
    -webkit-animation-duration: 13s;
    animation-duration: 13s;
    fill: rgba(34, 38, 44, .3);
  }

  .home-parallax>use:nth-child(4) {
    -webkit-animation-delay: -5s;
    animation-delay: -5s;
    -webkit-animation-duration: 20s;
    animation-duration: 20s;
    fill: rgba(34,38,44,1);
  }

  @-webkit-keyframes waveHomePage {
    0% {
      transform: translate3d(-90px,0,0);
    }

    100% {
      transform: translate3d(85px,0,0);
    }
  }


  @keyframes waveHomePage {
    0% {
      transform: translate3d(-90px,0,0);
    }

    100% {
      transform: translate3d(85px,0,0);
    }
  }
  .home-parallax>use {
    -webkit-animation: waveHomePage 25s cubic-bezier(.55,.5,.45,.5) infinite;
    animation: waveHomePage 25s cubic-bezier(.55,.5,.45,.5) infinite;
  }

</style>
