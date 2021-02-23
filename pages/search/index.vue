<template>
  <div>
    <div class="search-total-box">
      <div class="search-want-to-add-title"></div>
    <div class="do-search-top-box">
      <div style="display: flex;justify-content: center">
        <div class="do-search-input-box">
        <div class="search-input-leftside-icon-box"><i class="fa fa-search" style="z-index: 10" aria-hidden="true"></i></div>
      <input
        @keydown.enter="doSearchFromSearchPage"
        class="do-search-input-component" v-model="keyword"/>
        </div>
      <vs-button
        color="rgb(59,222,200)"
        gradient
        @click="doSearchFromSearchPage"
      >
        <i class='iconfont icon-search'></i>搜索
      </vs-button>
      </div>

      <div class="current-search-total-count">当前搜索到的总记录数:{{searchData.totalCount?searchData.totalCount:0}}</div>

      <div class="search-page-select-action-box">
        <div class="comprehensive-sort-select">

          <span :class="sort ===''?'search-selecting-active-item':''" @click="doSearchBySort('')">综合排序</span>
          <span :class="sort ==='1'||sort ==='2'?'search-selecting-active-item':''" @click="doSearchBySort('2')">时间</span>
          <span :class="sort ==='3'||sort ==='4'?'search-selecting-active-item':''" @click="doSearchBySort('4')">浏览量</span>
        </div>
        <div class="categories-select-to-search">
          <span
            @click="doSearchByCategoryId('')"
            :class="categoryId ===''?'search-category-items search-selecting-active-item':'search-category-items'">
            全部分类
          </span>
          <span
            @click="doSearchByCategoryId(category.id)"
            :class="categoryId ===category.id?'search-category-items search-selecting-active-item':'search-category-items'"
            v-for="(category,index) in categories" :key="category.id">{{category.name}}</span>
        </div>
      </div>

      <div class="iloli-image-box">
        <img src="@/assets/images/iloli.gif" class="iloli-image">
      </div>
    </div>

    <div class="search-page-main-box">

      <div class="search-page-inner">
        <div class="search-items mdui-ripple" v-for="(item,index) in searchData.records" :key="index">
          <a class="search-nuxt-link-style" :href="`/article/${item.id}`">
          <img :style="index%2===0?'left:-30px;':'right:-30px'" :src="baseUrl+'/portal/image/'+item.cover" class="search-items-img">
          <div :style="index%2===0?'float:right;':'float:left'" class="search-items-content">

            <div class="post-title" style="color: skyblue">
              <h2 class="title-content search-items-title" v-html="item.title">
              </h2>
            </div>
            <div class="search-items-message">
              <div class="search-items-tags-cloud">
                <a class="search-items-tags" v-for="(l,index) in item.label" :key="index" v-html="l"></a>
              </div>

              发表日期<span><i class="iconfont icon-icon"></i>{{item.createTime}}</span>
              <br>
              更新日期<span><i class="iconfont icon-icon"></i>{{item.updateTime}}</span>
              <br>
       浏览量<span><i class="iconfont icon-view"></i>{{item.viewCount}}</span>


            </div>
            <br>
            <div class="search-items-summary" v-html="item.summary"></div>
            <br>
            <div class="search-items-post" v-text="item.content"></div>
          </div>
          </a>
        </div>


        <div class="search-no-data-box" v-if="searchData.records.length === 0"></div>


        <div class="search-has-more-button" v-if="searchData.totalCount === size" @click="loadingMoreSearch">加载更多</div>
        <div class="search-has-more-button" v-else @click="loadingMoreSearch">没有更多了...</div>
      </div>





    </div>



    <div class="dress-bottom-search-page-box">
      <div class="search-page-box-bottom-image"></div>
    </div>
    <div class="friends-links-footer">

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
  </div>
</template>

<script>
  import searchApi from "../../api/searchApi";
  import homeApi from "../../api/homeApi";

  export default {
    transition: 'search',
    head() {
      return {
        title: '陈展云的博客-搜索',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: '陈展云的博客-搜索页面'
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: '陈展云,博客,java,spring,spring-boot,开发,毕业设计,博客系统,程序员,docker,linux,电脑硬件,电脑软件,kubernetes,vue,nuxtjs,vuejs,js,javascript,html,css,less,rabbitmq,源码'
          }
        ]
      }
    },
    async asyncData({query}) {
      console.log(query)
      let categoryId = query.categoryId ? query.categoryId : '';
      let sort = query.sort ? query.sort : '';
      let keyword = query.keyword ? query.keyword : '';
      let page = query.page ? query.page : 1;
      let size = query.size ? query.size : 5;
      console.log(categoryId);
      console.log(sort)
      console.log(keyword)
      console.log(page)
      console.log(size)
      let searchData = await searchApi.doSearch(categoryId, encodeURIComponent(keyword), page, size, sort)


        for (let item of searchData.data.data.data.records) {
          // console.log(item.labels + "看看标签字符串...")
          if (item.labels.indexOf('-') !== -1) {
            let dataLabelsToLabel = item.labels.split('-');
            item.label = dataLabelsToLabel;
          } else {
            if (item.labels !== '') {
              item.label.push(item.labels)
            }
          }
        }

      let categories = await homeApi.getCategories();


        return {
          categories: categories.data.data.data,
          searchData: searchData.data.data.data,
          categoryId: categoryId,
          sort: sort,
          keyword: keyword,
          page: searchData.data.data.data.currentPage,
          size: searchData.data.data.data.pageSize,
          oldSort: sort,
          oldKeyword: keyword,
          oldCategoryId: categoryId
        }
    },
    methods: {
      inputLeftIconHover() {
        let icon = document.querySelector('.search-input-leftside-icon-box');
        if (icon) {
          icon.style['box-shadow'] = '12px 12px 12px #282727';
          icon.style['color'] = '#ff874d';
        }
      },
      inputLeftIconUnHover() {
        let icon = document.querySelector('.search-input-leftside-icon-box');
        if (icon) {
          icon.style['box-shadow'] = 'none';
          icon.style['color'] = '#282727';
        }
      },
      doSearchByCategoryId(categoryId) {
        this.categoryId = categoryId;
        this.doSearchFromSearchPage();
      },
      doSearchBySort(sort) {
        if (this.sort === '') {
          this.sort = sort;
        }else if (sort === '2' && this.sort === '2') {
          sort = '1';
          this.sort = sort;
        } else if (sort === '2' && this.sort === '1') {
          this.sort = '2';
        }else if (sort === '4' && this.sort === '4') {
          sort = '3';
          this.sort = '3';

        }else if (sort === '4' && this.sort === '3') {
          this.sort = '4';

        }else if (sort === '4' && (this.sort === ''||this.sort === '1'||this.sort === '2')) {
          this.sort = sort;

        }else if (sort === '2' && (this.sort === ''||this.sort === '3'||this.sort === '4')) {
          this.sort = sort;

        } else {
          this.sort = '';
        }
        location.href = `/search?keyword=${encodeURIComponent(this.keyword)}&categoryId=${this.categoryId}&sort=${sort}`;
      },
      doSearchFromSearchPage() {
        location.href = `/search?keyword=${encodeURIComponent(this.keyword)}&categoryId=${this.categoryId}&sort=${this.sort}`;
      },
      loadingMoreSearch() {
       // console.log(this.oldKeyword+" =??? "+this.keyword)
        if (this.oldSort ===  this.sort &&
        this.oldKeyword ===  this.keyword &&
        this.oldCategoryId ===  this.categoryId){

          if (this.size !== this.searchData.totalCount) {
            //console.log(this.searchData.records)
            return;
          }
          this.size += 5;
          //console.log("size "+this.size)
        }else {
          this.size = 5;
          this.oldSort =  this.sort;
          this.oldKeyword =  this.keyword;
          this.oldCategoryId =  this.categoryId;
        }


        searchApi.doSearch(this.categoryId,encodeURIComponent(this.keyword),this.page,this.size,this.sort)
        .then(resolve=>{

          for (let item of resolve.data.data.data.records) {
            console.log(item.labels + "看看标签字符串...")
            if (item.labels.indexOf('-') !== -1) {
              let dataLabelsToLabel = item.labels.split('-');
              item.label = dataLabelsToLabel;
            }else {
              if (item.labels !== '') {
                item.label.push(item.labels)
              }
            }
          }
          console.log(resolve.data.data.data)
          this.searchData = resolve.data.data.data;
        })
      }
    },
    data() {
      return {
        categories: [],
        oldSort: '',
        oldKeyword: '',
        oldCategoryId: '',
        searchData: {},
        keyword: '',
        categoryId: '',
        sort: '',
        page: 1,
        size: 10
      }
    },
    mounted() {
      console.log(this.$route.params.keywords);
      let input = document.querySelector('.do-search-input-component');
      if (input) {
        input.addEventListener('focusin', this.inputLeftIconHover);
        input.addEventListener('focusout', this.inputLeftIconUnHover);
      }
    },
    beforeDestroy() {
      let input = document.querySelector('.do-search-input-component');
      if (input) {
        input.removeEventListener('focusin',this.inputLeftIconHover);
        input.removeEventListener('focusout',this.inputLeftIconUnHover);
      }
    }
  };
</script>

<style lang="less">
  .search-nuxt-link-style {
    text-decoration: none;

    &:link {
      color: black;
    }

    &:visited{
     color: black;
    }
  }
  .search-want-to-add-title {
    width: 100%;
    height: 400px;
  }
  .search-no-data-box {
    width: 260px;
    height: 200px;
    background-image: url("../../assets/images/no-data.png");
    background-repeat: no-repeat;
    background-position: center;
    margin: 20px auto;
  }

  .search-category-items {
    line-height: 40px;
    height: 40px;
    width: 50px;
    font-size: 20px;
    font-weight: 400;
    border-radius: 3px;
    padding: 8px 8px;
    cursor: pointer;
    margin: 0 8px;
  }
  .categories-select-to-search{
    padding: 10px 0;
    height: 40px;
    & span:hover{
      transition: all .3s;
      box-shadow:  0 5px 6px #282727;
    }

  }
  .comprehensive-sort-select{
    height: 40px;
    padding: 10px 0;
    & span:hover{
      transition: all .3s;
      box-shadow:  0 5px 6px #282727;
    }
    span{

      line-height: 40px;
      height: 40px;
      width: 50px;
      font-size: 20px;
      font-weight: 400;
      border-radius: 3px;
      padding: 8px 8px;
      margin: 0 8px;
      cursor: pointer;

    }
  }
  .search-selecting-active-item{
    height: 40px;
    background: rgba(221, 74, 104, 0.75);
    color: white;


  }
  .search-page-select-action-box {
    padding: 20px;
    width: 600px;
    margin: 10px auto;
    height: 130px;
    position: relative;
    &:before {
      box-shadow:  0 0 2px #dddddd;
      height: 2px;
      border-top: #8c8c8c solid 2px;
      content: '';
      width: 90%;
      position: absolute;
      top: -1px;
    }
    &:after {
      box-shadow:  0 0 2px #dddddd;
      height: 2px;
      border-top: #8c8c8c solid 2px;
      content: '';
      width: 90%;
      position: absolute;
      bottom: -1px;
    }


  }
  @media screen and (max-width: 660px){
    .search-page-select-action-box {
      width: 500px;
    }
    .search-page-select-action-box:before {
      width: 85%;
    }
    .search-page-select-action-box:after {
      width: 85%;
    }
  }
  .search-items-post{
    color: #8c8c8c;
  }
  .current-search-total-count {
    color: darkgray;
    font-weight: 700;
    font-size: 20px;
    margin: 5px auto;
    text-align: center;


  }
  .search-has-more-button {
    text-align: center;
    line-height: 70px;
    height: 70px;
    width: 150px;
    margin: 20px auto;
    border: #6face2 dashed 3px;
    border-radius: 35px;
    font-size: 24px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      transition: all .6s;
      box-shadow: 0 12px 12px #282727;
    }
  }


  /*.search-items-title{*/

  /*  &:before{*/
  /*    position: absolute;*/
  /*    top: auto;*/
  /*    bottom: 1px;*/
  /*    left: 0;*/
  /*    width: 100%;*/
  /*    height: 1px;*/
  /*    background-color: #ff4081;*/
  /*    -webkit-transform: scaleX(0);*/
  /*    transform: scaleX(0);*/
  /*    -webkit-backface-visibility: visible;*/
  /*    backface-visibility: visible;*/
  /*    -webkit-transition: all .2s;*/
  /*    transition: all .2s;*/
  /*    content: ' ';*/
  /*  }*/
  /*}*/

  .search-items-tags-cloud{
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
  .search-items-content {
    width: 350px;
    padding: 15px;
    border-radius: 35px;
    &:after {
      content: '';
      clear: both;
    }
  }
  @keyframes searchColorBgTransform {
    0%,100%{
      background-color: rgba(255, 78, 106, 0.15);
    }
    14.2%{
      background-color: rgba(255, 170, 115, 0.15);
    }
    28.4%{
      background-color: rgba(254, 212, 102, 0.15);
    }
    46.6%{
      background-color: rgba(60, 220, 130, 0.15);
    }
    60.8%{
      background-color: rgba(100, 220, 240, 0.15);
    }
    75%{
      background-color: rgba(100, 185, 255, 0.15);
    }
    89.2%{
      background-color: rgba(180, 180, 255, 0.15);
    }
  }
  .search-total-box{
    animation: searchColorBgTransform 28s infinite;
  }

  .search-page-inner {
    width: 80%;
    min-height: 700px;
    border-radius: 35px;
    margin: 40px auto;
    .search-items {
      overflow: hidden;
      position: relative;
      width: 680px;
      height: 300px;
      border-radius: 35px;
      margin: 20px auto;
      box-shadow: 0 0 12px #282727;
      .search-items-img {
        width: 300px;
        height: 300px;
        position: absolute;
        top: 0;
        border-radius: 15px;
        &:hover {
          transform: scale(1.2);
          transition: all .8s;
        }
      }
    }
  }

  .iloli-image-box {
    position: fixed;
    top: 160px;
    width: 388px;
    right: 5%;
    z-index: -100;
    .iloli-image{
      display: block;
      margin: 0 auto;

    }
  }
  @media screen and (max-width: 850px){
    .search-page-inner{
      width: 100%;
    }
    .iloli-image-box {
      position: fixed;
      left: -100px;
      top: calc(100vh - 388px);


    }
  }
  .dress-bottom-search-page-box {
    position: relative;
    width: 100%;
    height: 200px;
  }
  .search-page-box-bottom-image{
    background: url(https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@master/img/webp/footer.webp) no-repeat 50%;
    height: 368px;
    z-index: 1;
    width: 100%;
    position: absolute;
    pointer-events: none;
    left: 0;
    bottom: -76px;
  }
  .search-page-main-box {
    position: relative;
    width: 100%;
    min-height: 700px;
  }


  .do-search-input-box {
    display: flex;
    align-items: center;
    height: 60px;
    line-height: 60px;
    font-size: 24px;
  }

  .do-search-input-component {
    display: block;
    border-radius: 16px;
    border: 3px #8c8c8c solid;
    height: 54px;
    width: 400px;
    line-height: 54px;
    font-size: 24px;
  }
  .search-input-leftside-icon-box {
    margin-right: 10px;
    height: 60px;
    width: 60px;
    border-radius: 12px;
    text-align: center;
    transition: all 1s;
  }


  @media screen and (max-width: 660px){
    .search-want-to-add-title{
      height: 100px;
    }
    .do-search-input-component{
      width: 250px;
    }
    .do-search-top-box {
      margin-top: 50px;
      .vs-input-content {
        width: 240px;
      }

    }
    .search-page-inner .search-items{
      width: 500px;
      .search-items-img{
        width: 200px;
      }
    }
.search-items-content{
  width: 300px;
}

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
  .friends-links-footer{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100px;
    color: white;
    background-color: #282727;
    text-align: center;
  }

</style>
