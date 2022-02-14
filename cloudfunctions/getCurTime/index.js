// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "sgrzsbgl-7gyn4rque41a73ad" //编写云开发环境
})
//获取d当前时间多少天后的日期和对应星期
function getDates(days, todate = getCurrentMonthFirst()) { //todate默认参数是当前日期，可以传入对应时间
  var dateArry = [];
  for (var i = 0; i < days; i++) {
    var dateObj = dateLater(todate, i);
    dateArry.push(dateObj)
  }
  return dateArry;
}
//传入时间后几天
//param：传入时间：dates:"2021-04-02",later:往后多少天
function dateLater(dates, later) {
  let dateObj = {};
  let show_day = new Array(7, 1, 2, 3, 4, 5, 6);
  let date = new Date(dates);
  date.setDate(date.getDate());
  let day = date.getDay();
  dateObj.year = date.getFullYear();
  dateObj.month = ((date.getMonth() + 1) < 10 ? (+(date.getMonth() + 1)) : date.getMonth() + 1);
  dateObj.day = (date.getDate() < 10 ? (+date.getDate()) : date.getDate());
  dateObj.week = show_day[day];
  return dateObj;
}
//获取当前时间
function getCurrentMonthFirst() {
  var date = new Date();
  var todate = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
  return todate;
}
// 云函数入口函数
exports.main = async (event, context) => {
  const date = getDates(7, )
  const days = [
    [date[0].month + '月' + date[0].day + '日', date[0].week],
    [date[1].month + '月' + date[1].day + '日', date[1].week],
    [date[2].month + '月' + date[2].day + '日', date[2].week],
    [date[3].month + '月' + date[3].day + '日', date[3].week],
    [date[4].month + '月' + date[4].day + '日', date[4].week],
    [date[5].month + '月' + date[5].day + '日', date[5].week],
    [date[6].month + '月' + date[6].day + '日', date[6].week],
  ]
  return {
    date,
    days
  }
}