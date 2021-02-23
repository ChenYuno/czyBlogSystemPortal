window.onscroll = function (e) {
  // console.log(window.pageYOffset)
  var rectiveWidth = window.innerWidth;
  var headBar = window.document.querySelector('.site-nav');

  var qingtianwawa = document.querySelector('.qingtianwawa');
  if (window.pageYOffset <= 700 && rectiveWidth > 660) {

    qingtianwawa.style.setProperty('transform', 'translateY(-900px)');
    qingtianwawa.style.setProperty('transition-duration', '1.5s');
    // setTimeout(function () {
    //
    //   qingtianwawa.style.display = 'none';
    // },1500)
  }
  if (rectiveWidth < 660) {
    qingtianwawa.style.setProperty('transform', 'translateY(-900px)');
    qingtianwawa.style.setProperty('transition-duration', '1.5s');
    // qingtianwawa.style.animation = 'fadeOutUpBig';
    // qingtianwawa.style.animationDuration = '1.5s';
    // qingtianwawa.style['animation-fill-mode']= 'forwards';
    // setTimeout(function () {
    //
    //   qingtianwawa.style.display = 'none';
    // },1500)
  }

  if (window.pageYOffset > 700&&rectiveWidth>660) {
    qingtianwawa.style.setProperty('transform', 'translateY(900px)');
    qingtianwawa.style.setProperty('transition-duration', '1.5s');
    // qingtianwawa.style.animation = 'fadeInDownBig';
    // qingtianwawa.style.animationDuration = '1.5s';
    // setTimeout(function () {
    //
    //   qingtianwawa.style.display = 'unset';
    // },1500);

    headBar.style.setProperty('transform', 'translateY(-64px)');
    headBar.style.setProperty('transition-duration', '1.5s');
  }
  if (window.pageYOffset < 600&&rectiveWidth>660) {
    headBar.style.setProperty('transform', 'translateY(0)');
    headBar.style.setProperty('transition-duration', '1.5s');
  }



  //首页文章列表sidebar的定位转换
  var articlesMain = document.querySelector('.articles-main');
  if (articlesMain) {
    var totalHeight = articlesMain.clientHeight;
    var calHeight = totalHeight * 0.9 ;
    var homePageWebSideBar = document.querySelector('.sidebar-inner');
    if (window.pageYOffset >= 925||window.pageYOffset < calHeight) {
      homePageWebSideBar.style['position'] = 'fixed';
      homePageWebSideBar.style['right'] = '0';
      homePageWebSideBar.style['overflow'] = 'auto';
      homePageWebSideBar.style['top'] = '0';
      homePageWebSideBar.style['bottom'] = '0';
      homePageWebSideBar.style['overflow-x'] = 'hidden';
    }
    if (window.pageYOffset < 925||window.pageYOffset >= calHeight) {
      homePageWebSideBar.style['position'] = 'sticky';

    }
  }


  //文章sidebar的定位转换
  var articleContentBox = document.querySelector('.article-content-box');
  var articleInner = document.querySelector('.article-inner');
  var articleContentCatalogBox = document.querySelector('.article-content-catalog-box');
  if (articleContentBox && articleInner && articleContentCatalogBox) {
    if (window.pageYOffset >= 860) {
      articleContentCatalogBox.style['position'] = 'fixed';
      articleContentCatalogBox.style['bottom'] = '0';
      articleContentCatalogBox.style['top'] = '0';
    }
    if (window.pageYOffset < 860) {
      articleContentCatalogBox.style['position'] = 'static';
      articleContentCatalogBox.style['bottom'] = '';
      articleContentCatalogBox.style['top'] = '';
    }
  }

};


