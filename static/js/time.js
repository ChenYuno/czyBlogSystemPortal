var now = new Date();
function createtime() {
  var grt = new Date("02/17/2021 10:38:00"); //在此处修改你的建站时间
  now.setTime(now.getTime() + 250);
  days = (now - grt) / 1000 / 60 / 60 / 24;
  dnum = Math.floor(days);
  hours = (now - grt) / 1000 / 60 / 60 - (24 * dnum);
  hnum = Math.floor(hours);
  if(String(hnum).length == 1) {
    hnum = "0" + hnum;
  }
  minutes = (now - grt) / 1000 / 60 - (24 * 60 * dnum) - (60 * hnum);
  mnum = Math.floor(minutes);
  if(String(mnum).length == 1) {
    mnum = "0" + mnum;
  }
  seconds = (now - grt) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum);
  snum = Math.round(seconds);
  if(String(snum).length == 1) {
    snum = "0" + snum;
  }
  var timeDate = document.querySelector(".timeDate");
  if (timeDate)timeDate.innerHTML = "勉强运行" + dnum + " 天";
  var times = document.querySelector(".times");
  if (times)times.innerHTML = hnum + "h" + mnum + "m" + snum + "s";
}

