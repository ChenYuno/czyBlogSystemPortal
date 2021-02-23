window.onload =function () {
  // var contentWrap = window.document.querySelector('.content-wrap');
  // if (contentWrap) {
  //   contentWrap.onclick = function (event) {
  //     var selectImg = null;
  //     let flag = false;
  //     if (event.target.className.startsWith('content-article-list')) {
  //       flag = true;
  //       selectImg = event.target.firstChild;
  //       console.log(event.target.id)
  //     } else if (event.target.className === 'article-list-cover') {
  //       selectImg = event.target;
  //     }
  //     if (selectImg !== null) {
  //       var position;
  //       position = selectImg.getBoundingClientRect();
  //       var x = event.offsetX;
  //       var y = event.offsetY;
  //       var imgParentNode = selectImg.parentNode;
  //       var position2 = imgParentNode.getBoundingClientRect();
  //       if (flag) {
  //         x = x - (position.x - position2.x);
  //         y = y - (position.y - position2.y);
  //       }
  //       console.log(x);
  //       console.log(y)
  //
  //
  //       var ripple = document.createElement('canvas');
  //
  //       imgParentNode.style.setProperty('position', 'relative')
  //       // ripple.style
  //       ripple.setAttribute('width', selectImg.width);
  //       ripple.setAttribute('height', selectImg.height);
  //
  //       ripple.style.cssText ="position:absolute;border-radius:35px;" +
  //         "top:" + (position.y - position2.y) + "px;left:" + (position.x - position2.x) + "px;";
  //       var ctx = ripple.getContext('2d');
  //       imgParentNode.appendChild(ripple)
  //
  //       var opacity = .06;
  //       var count = 1;
  //       var radius = 20;
  //       var wave = setInterval(function () {
  //         if (count >= 30) {
  //           clearInterval(wave);
  //           imgParentNode.removeChild(ripple);
  //         }
  //         ctx.beginPath();
  //         ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  //         ctx.fillStyle = `rgba(255,255,255,${opacity})`;
  //         ctx.closePath();
  //         ctx.fill();
  //
  //
  //
  //         radius +=60;
  //         //opacity -= 0.03;
  //         count++;
  //       }, 10);
  //
  //
  //     };
  //
  //   }
  // }








  function changeArticleTagColor() {
    let articleTagsDiv = window.document.querySelectorAll('.article-tags');
    let articleTagsDivChild = [];
    articleTagsDiv.forEach(n=>{
      n.childNodes.forEach(c=>{
        articleTagsDivChild.push(c)
      })
    })

    articleTagsDivChild.forEach(n=>{
      n.style['height'] = '25px';
      n.style['font-size'] = '20px';
      n.style['transition'] = 'all 1s';
      n.style['width'] = '40px';
      n.style['border-radius'] = '4px';
      n.style['padding'] = '4px';
      n.style['margin'] = '0 8px';
      n.style['background'] = 'rgba(' + Math.random() * 254 + 1 + ',' +
        Math.random() * 254 + 1 + ',' + Math.random() * 254 + 1 + ',1)';
      n.style['line-height'] = '40px';
      n.style['color'] = 'rgba(' + Math.random() * 254 + 1 + ',' +
        Math.random() * 254 + 1 + ',' + Math.random() * 254 + 1 + ',1)';
      n.style['text-shadow'] = '0 0 10px #dddddd,0 0 3px #dddddd,0 0 6px #dddddd,0 0 8px #dddddd;';
    })
  }

  setInterval(changeArticleTagColor, 1000);







  var qingtianwawa = document.querySelector('.qingtianwawa');

  qingtianwawa.onclick = function () {
    var y = window.pageYOffset;
    var step = 100;
    var interId = setInterval(function () {
      step+=10;
      y = y - step;
      if (y <= 0) {
        y = 0;
        clearInterval(interId);
      }
      scrollTo(0, y);
    },10)
  };




  if (document.querySelector(".timeDate")&&document.querySelector(".times")){

    setInterval("createtime()", 250);
  }



  // var categoriesBox = document.querySelector('.size-over-view-top');
  // if (categoriesBox) {
  //   setInterval(categoriesBoxdoudon, 250);
  // }
}

// function categoriesBoxdoudon() {
//   var categoriesBox = document.querySelector('.size-over-view-top');
//   categoriesBox.addEventListener('mouseover',function (e) {
//     if (e.target.className!=='size-over-view-top'){
//       e.target.style['animation'] = 'common-animation 1.5s infinite alternate';
//       e.target.style['color'] = 'cyan';
//       e.target.style['box-shadow'] = '0 0 10px rgba(255, 78, 106, 0.85)';
//     }
//   })
//   categoriesBox.addEventListener('mouseout',(e)=>{
//     if (e.target.className!=='size-over-view-top'){
//       e.target.style['animation'] = '';
//       e.target.style['color'] = '#fff';
//       e.target.style['box-shadow'] = '0 0 0';
//     }
//   })
// }
